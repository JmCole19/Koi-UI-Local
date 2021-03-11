import Arweave from "arweave";

const arweave = Arweave.init()

const getArWalletAddressFromJson = async (keyData) => {
  let addressResult = await arweave.wallets.jwkToAddress(keyData);
  return addressResult
}

async function getDataBlob(imageUrl) {

  var res = await fetch(imageUrl);
  var blob = await res.blob();
  var obj = {};
  obj.contentType = blob.type;

  // var uri = await parseURI(blob);
  console.log(blob);
  var buffer = await blob.arrayBuffer();
  obj.data = buffer;
  console.log(buffer);

  return obj;
}

const exportNFT = async (ownerAddress, wallet) => {
  const contractSrc = process.env.REACT_APP_CONTRACT_SRC
  const nftData = await getDataBlob()

  const metadata = {
    // owner: 'l2Fe-SdzRD-fPvlkrxlrnu0IC3uQlVeXIkHWde8Z0Qg', // This is Al's test wallet for Koi server
    owner: ownerAddress, // my test wallet
    name: 'koi nft',
    description: 'first koi nft',
    ticker: 'KOINFT'

  }
  const balances = {};
  balances[metadata.owner] = 0;

  const initialState = {
    "owner": metadata.owner,
    "name": metadata.name,
    "description": metadata.description,
    "ticker": metadata.ticker,
    "balances": balances
  }

  const tx = await arweave.createTransaction({
    // eslint-disable-next-line no-undef
    data: nftData.data
  }, wallet);

  tx.addTag('Content-Type', 'image/png')
  tx.addTag('Network', 'Koi')
  tx.addTag('Action', 'marketplace/Create')
  tx.addTag('App-Name', 'SmartWeaveContract')
  tx.addTag('App-Version', '0.3.0')
  tx.addTag('Contract-Src', contractSrc)
  tx.addTag('Init-State', JSON.stringify(initialState))

  await arweave.transactions.sign(tx, wallet);
  console.log(tx);
  console.log(tx.id);

  let uploader = await arweave.transactions.getUploader(tx)

  while (!uploader.isComplete) {
    await uploader.uploadChunk()
    console.log(
      uploader.pctComplete + '% complete',
      uploader.uploadedChunks + '/' + uploader.totalChunks
    )
  }

  const status = await arweave.transactions.getStatus(tx.id)
  console.log(`Transaction ${tx.id} status code is ${status.status}`)

  // call sdk api here fot registration 
  // I will add it in 30 min we need to find a good solution for that
  // like how to connect arconnect with koi sdk
}

export {
  getArWalletAddressFromJson,
  exportNFT
}