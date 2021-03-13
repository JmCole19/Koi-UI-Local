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

const exportNFT = async (ownerAddress, content, imageUrl = '', imageBlob, wallet = {}) => {
  try {

    // var wallet = await window.arweaveWallet.connect()
    const contractSrc = process.env.REACT_APP_CONTRACT_SRC
    let nftData 
    if (imageUrl){
      console.log({imageUrl})
      nftData = await getDataBlob(imageUrl)
    }else{
      console.log({imageBlob})
      nftData = imageBlob
    }
  
    console.log("image buffer blob : ", nftData)
  
    let metadata = {
      // owner: 'l2Fe-SdzRD-fPvlkrxlrnu0IC3uQlVeXIkHWde8Z0Qg', // This is Al's test wallet for Koi server
      owner: ownerAddress, // my test wallet
      name: 'koi nft',
      description: 'first koi nft',
      ticker: 'KOINFT'
    }
    metadata.title = content.title
    metadata.name = content.owner
    metadata.owner = ownerAddress
    metadata.description = content.description
    metadata.ticker = 'KOINFT'
    
    const balances = {};
    balances[metadata.owner] = 0;
  
    const initialState = {
      "owner": metadata.owner,
      "name": metadata.name,
      "description": metadata.description,
      "ticker": metadata.ticker,
      "balances": balances
    }
    if(wallet === {}) {
      wallet = {
        "d": "S0lHD8Y8w9H0u2MxhWPSWxW6jwUm3qpIZKkVFBGz_yWrZjWwgEh5KNOdZ2i5swohsuxe4pYsVWbTt1qtbJmRGnH8cjrBDmnna0UusJkcGiAmzZHgP58-nvqUplK1X8TPxIVpHKAe9ji2QT5HalBDtDNg1C1rgZlRjXH3EQt4ZYJFhlTrMA_1cPFMlPq6b057JJo-nraV9KfYGRww5fVbcebHKQzODX3bI6OA6U8NI7ofrJdKNYvt-ZYAzO5c0PofZzuqE9TpqP3P1KU_hiHF1MVACNTsG1gjjuZTNq31B1nmuJmSR3YADV0I4BlyFoI8HSWeTIMokmPJ9oKlIn_q-Q",
        "dp": "cjG9L5WkWevNL-AGYOIHtDFuzauLxC7JE0YIeVDVWbCh7XRF8UHVrEvBQYMGUToP8JtNB4rsh9UJWMaTPCiFQA_-ttES3wVYLo3iAMrowXAE0-kG2uNFg65l-oHSxmLBZWDJASzZUPs07TEzhzBNMN1NAshokNKI30UIzZmzJuc",
        "dq": "URnFZGPLG080kCbTxQJxdlptyZ8fiVxXASTLvmcxCR9mJr9Xi33XSsAIyjOK213hPAA9EsCpVj5PJucIW6eDuc87fHAvWgA9LMPbWge8bRfgb5NIkohg52dBw1eAFnNcuzLf79CE70ZmQi8_mfeWv--yqLeyKw8veJo__ywS7eM",
        "e": "AQAB",
        "ext": true,
        "kty": "RSA",
        "n": "hEXMUNqZ01PTyOBsU_vTWy5dAt3ge_q5C0dtY4t-7aj36ifu6UNVwQgEd8k21T4yWn6ljbLhih31FteqSoYx9kagGWoqCVOPwifYgmTOn37fvhDeJhJocPG1eZ61nAI_cydj-qDA-TQXu0rS6i__z5-7-MuwVCUU0EWl87EPHm1I-Cp2HQyNoYBqXeXutBVJTprLnXKpnX-Wg1JLwOn-XCxGqBZ611BPd9womjyU5u34kAYrcb2RtseG0uJTpa2Gii0CHQU5X5a2vOFF07zUAYg2vXf4mSQb7F8DwFtzyiPvlr2CNHVlwUuJiYz1dksL6HR9-rXZ7h_KvtNg5ygeWQ",
        "p": "__mwsxFqSR06g4I2jtlzzOjmzRG53KFm8fTOvdwSMxmbqBvWwUdTdHEAWkJ07iHca94caXUK33M2oJE-vk0nJz8lgllg-U2z6MMW1Tefgvh_l5v-zvVmZIA84T0DtKQ55WIdWZBq3-Vu830fBqlutnHltxMgT8_kRtXgGT1BSA8",
        "q": "hEkPAYE-Dxb0pfXreFOvpdsCDu2GEMgeNdZ57rN0q5mEMLALyuVnbp-0bEQ1B4EB4PrxBuYMrBq32cJvGP6ZxyWegFue4xCA1n8PmmG3Tn4GZ_5erdvEpE8XID3Mv1hSncStCo96WbGNIDRpFhj30oXutd64kvXq1SMhPIKuCxc",
        "qi": "dgbL6khNtnS974k3n2lMd7uFv2LRpt00IPNjAFRW2XHx3bWRbmXdbch6jkK-N_99gbjlSK-ipjeHZFU55mCufhRk--0TOuE-afjYZUm6O7OonjcwvVER7koOAbSucATTQnn232orT86oDzYxbARbAUvvCi59FtZvCGENjMGDzz8"
      }
    }else{
      console.log("current wallet")
    }
    // console.log({wallet})
    let tx
    try {
      tx = await arweave.createTransaction({
        // eslint-disable-next-line no-undef
        // data: nftData.data
        data: JSON.stringify(metadata)
      });
    }catch(err) {
      console.log("create transaction error")
      console.log("err-transaction", err)
      return false
    }
  
    tx.addTag('Content-Type', 'image/png')
    tx.addTag('Network', 'Koi')
    tx.addTag('Action', 'marketplace/Create')
    tx.addTag('App-Name', 'SmartWeaveContract')
    tx.addTag('App-Version', '0.3.0')
    tx.addTag('Contract-Src', contractSrc)
    tx.addTag('Init-State', JSON.stringify(initialState))
  
    try{
      await arweave.transactions.sign(tx);
    }catch(err) {
      console.log("transaction sign error")
      console.log("err-sign", err)
      return false
    }
    console.log(tx);
    // console.log(" wallet : ", wallet);
  
    let uploader = await arweave.transactions.getUploader(tx)
  
    while (!uploader.isComplete) {
      await uploader.uploadChunk()
      console.log(
        uploader.pctComplete + '% complete',
        uploader.uploadedChunks + '/' + uploader.totalChunks
      )
    }
    console.log(tx.id);
    return tx.id
  }catch(err) {
    console.log("err-last", err)
    return false
  }

  // const status = await arweave.transactions.getStatus(tx.id)
  // console.log(`Transaction ${tx.id} status code is ${status.status}`)

  // call sdk api here fot registration 
  // I will add it in 30 min we need to find a good solution for that
  // like how to connect arconnect with koi sdk
}

export {
  getArWalletAddressFromJson,
  exportNFT
}