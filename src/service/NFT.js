// import Arweave from "arweave";
// const arweave = Arweave.init()
import { koi_tools } from "koi_tools"

const getArWalletAddressFromJson = async (arweave, keyData) => {
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

const exportNFT = async (arweave, ownerAddress, content, imageUrl = '', imageBlob, wallet = {}) => {
  try {

    // var wallet = await window.arweaveWallet.connect()
   // const contractSrc = process.env.REACT_APP_CONTRACT_SRC i have hard coded, it is constant 
   // console.log({contractSrc})
    let nftData
    let imgContentBuffer
    let imgContentType
    if (imageUrl) {
      console.log({ imageUrl })
      nftData = await getDataBlob(imageUrl)
      imgContentBuffer = nftData.data
      imgContentType = nftData.contentType
    } else {
      console.log({ imageBlob })
      nftData = imageBlob
      imgContentBuffer = nftData.data
      imgContentType = nftData.type
    }

    console.log("image buffer blob : ", nftData)
    console.log("image type : ", imgContentType)

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

    let d = new Date()
    let createdAt = Math.floor(d.getTime()/1000).toString()
    const initialState = {
      "owner": metadata.owner,
      "title": metadata.title,
      "name": metadata.name,
      "description": metadata.description,
      "ticker": metadata.ticker,
      "balances": balances,
      "createdAt": createdAt
    }
    if (wallet === {}) {
      wallet = { "kty": "RSA", "e": "AQAB", "n": "pyK_z1Jmluzr775_gwQgkRVhq5LbZ8RDpqwyV6CYIufphPMOSemd60BceRdrM-KmKExLpakWLOs6zBj6mcUgMhwqKuS_as8R1IqX6VFwEj4oW2VyPO4oKdgz9HVP3BSwiHSznc1O6DkTtaqQnHHP_61AGMMMfJsubuOEMS-VJwF9yyAeuwtdiryYpe_Y0nOvfySSe7OUzncdRsfEznSyBEpSCUB-vRpHe-6E7USGo9vu1DyTv1Svw5Ly5VqsRNeAWF2uKdKEf4muUiyPLnijgqzzQ0N-q2GDAPJi-xjHpDwjxBSPPVpLn2IB8-YQSE3SmeTzTi6nitkzcPwpQxbmYb40K7V3xyQGoq_QBSbvOdYy5epMco1GeCq5AFeQB5k5C-a9e66Hc4GhBjArycc-DXStokZ7_c7F95dtC0ynLW6rGipp1PDLAEOXwD-0sxnvh43MvinIUjQL4MICYDdP15GNVqoqNTs7gZU7oP15OgTEem-4Uf3WkvJcS6uRGZPmDtF3eKOIMXLytf-QSECU9WE7qoWEd8TdO17Gns688LGKpJwuPGZ7bwGqU5iteBWQMKcoArPJdTCQCT_T7fOE6COO4oEYoHp7WRtM3HUO2MUTbM7rb4h9InZ5OPZ600jYWmMYnFhO_tquR5_-GmtL7m7KmPrfCOGB2XI42baWdwM", "d": "FdYl7l3rNmvU9ZlTipgW8y2yeZqx3NBZMGUOHMHILsNTEMI6yzBhKBPcIRwMrxY9NEWnmojJc2v2XiUjVMTbDID-h2Uklz1frH_BEkRIGrIRTsOl1c0d5T2wqA9NtEjluaZZs1PYK-INL66Nv0rlbJfDqJiPQJZ7zhQeuNhpKdP5jfjv2utEuPQkE4YPM4vW0YtDMjNHzWPlqNI_5eN8QLA_IKNTC7zruwbySheqaa05-nPBr_1OC4TfBFVA7aukQqdWsnMlSY6A_o6A1IcBgfi7vb2LRrPyTETe5sSZjN0opR00i8UI3VWOQMH9vZyhV-cAXOYekLcJEAl6EKBk0AkaucrU4D5GIW8vrvdQlGQEkFIOQzzjri73-DOu0MZAEFl0H5nv6NKYHuZVuTm12f8ordBaeIoxNvgu0AbfbmT-W-YUhlA2iXT4-J2TuyGmXCJoa-uyG_uwWCWC72JIOGsojudHgOhrQ8Jnrjq5pBQXAtbG0MqgTaY-MSQtQLyH4GbMcyzQi08vuBfCFigItqgSKJXANoXe1L-PpVsXVEd2j6lfpzbw4DMjHgqURxgLePJTrQJ3KrKCO-DdJ1SsJiDosKhRu_XmbLrKX6dARWt9XZ89E9DZonJWqCp1C6zsIxuWT9A89fOqzYqePY5zNfDOWkiYkaOkRvvJ28aoPEk", "p": "5Hg3zT9CRxcOvjLyuTtkvqL4fbFEqYta9oKJu3vhB21IMi8GsZv5oUpXvB6shqYFNOpRLNpuRiUDw0dlbIWP_6HPB5pNGHnoOqB8YdGPHNx7jwdEvrGJULxETaViNoQpAP3ZdD2sV-KAdlOp-tWz9T5-BeIKf8MsOPNZHL3kwRsL_rRbffXqV_uWs8MA0_0xObOlYHFJCaC7FHXjwtj--T05-IxlKaA2zyya0TnqheVipHlyEEzpS7KNyFltQDXhZY5nKnN4RFn_JeMFzH7I2zlaTcZV97p-FQkcksSMgPseauaU57G-Wmjpwo2wy5ANxnij5ZikgC67d1TWN3MBqw", "q": "u0aEap1zpwEEXXORu8OoOjrnJGKxij_MYr5-Rh86pNh_elx3WRwB5XPr9FbLrZlXbuBsUjRFvbRlad3qta174C1PAnLV7lN3NuQc6JC8aUKH8Yo40hI0ezJvkTomQQcoV5Ny3vBmoKP3wfSjNaX3WfswAiloeLTPsa-k8nZvn7ljZyZBesneeJbnGpWvw5HH7ZCkFZQ2m2Jz7kcyG33VBjS3nPDMWiN2n5vPAJOZJuNqnwdhnr4QCX32UFs1d8C70QmJ8XlkrP4Rb2Diw2nJsNAwDiq75dYFn8G_KirYFcS_PnzSR7Sze_VDocysCUe2gEc4qywLjCfhkc36H4o4CQ", "dp": "seWB3clB_ETR7_uPz_eVTHNtdcGQK0wdOhEO2fNtlvDa5GiFl8pRp-tRQWPJBtdC-p7xMjGq5-dudKGlMckWBQCjSdI18bcKwouwDiK0gs6TTx1jw_BNcZYGwUbjoHtryh_fMInNJmlxibE_i9bW10Efs8j8T9tTFc02OBEMi-hZgKxDCWNwY628_J_8hxSBPeLKBLxxGJQU16ur-04nyz6HYyc-phjgVJTwv7WPDU89bcA6tsKMbarMh5JKZVMO_JrTbdSXcvF4oLGTFFYsY7bWv_SNf-WwwwRjQUzV8qCWYLrGe1qFU7SZQCo_3WF_uGi7hc1DWaQJyLNAUdC1HQ", "dq": "Gt9XiOTm_4PJ2I8IzmSY8yIYoMP4rdnRvimPfQhmJdlbEXfLOGIoc4Baz0jVGSfzv9k8Md-GUl5cXwCU-VTXfaeCuts3j2cyqBG7hDOglYoSb7phxOMP3M2z7KbnblVUmJxz00GzuEFO_-nWsZALGkJM9UJz1z46v0hw5snP4p97gAWhR7lHzw34Q3xPKET250PmB6Ko40sRT5OvwPohYy6VWlPDPvvvvZ9h6LdFNqtTVVZ9z4V-T55fhdBQr8pcKPaxcJD2vUwHvG-umlPHuTNmceH37Fb1n6Lxh192ekktGA5ZLijjyFm9Rq5T0VEVAvs1SnqbfZULbRydU4FF4Q", "qi": "L4qZnvGtcr-OAPuWyJb8vJ-UBwhIVO7FtwG3cMwTpUX1OM0AVb3UajoEyuwwJoZkbC4Hn3go-sg01gB9FsERGhxTLP3R6tCy6X1qlvURbvG2JQtYI6UmtHV_NIf0MIsUrYeG2n6-lpiadz6-tXaJ3W6e8tBC-XNuPF2VVQ4TTGOV28bNoqF0s_mzG4_ZlJcmgTm4H5i0n178vqGWP8Z9MbEGJngBGopOpnTDumGr-ZHZglB7_abyWSCZZSA_3YD4JnZ9feja00DK4rGuWcYZJVxCi7R0PF0KtmMSHCf6ygJXYxBs1adbYDD71L7wbZdcAhLgeslWvO_3ZVOWJvFhbw" }
    } else {
      console.log("current wallet")
      console.log({wallet})
    }
    let tx
    try {
      tx = await arweave.createTransaction({
        // eslint-disable-next-line no-undef
        data: imgContentBuffer
        // data: JSON.stringify(metadata)
      }, wallet);
    } catch (err) {
      console.log("create transaction error")
      console.log("err-transaction", err)
      return false
    }

    tx.addTag('Content-Type', imgContentType)
    tx.addTag('Network', 'Koi')
    tx.addTag('Action', 'marketplace/Create')
    tx.addTag('App-Name', 'SmartWeaveContract')
    tx.addTag('App-Version', '0.3.0')
    tx.addTag('Contract-Src', 'I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ')
    tx.addTag('Init-State', JSON.stringify(initialState))

    try {
      await arweave.transactions.sign(tx, wallet);
    } catch (err) {
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

    /**/
    // pay via KOI
    try{
      let ktools = new koi_tools();
      let resAddress = await ktools.loadWallet(wallet)
      console.log({resAddress})
      let resTx = await ktools.registerData(tx.id, ownerAddress, wallet, arweave);
      console.log({resTx})
    }catch(err){
      console.log("err-koi_tools", err)
      return false
    }
    // end koi

    console.log(tx.id);
    return tx.id
  } catch (err) {
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