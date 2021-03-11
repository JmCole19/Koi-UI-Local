import Arweave from "arweave";

const arweave = Arweave.init()

const getArWalletAddressFromJson = async (keyData) => {
  let addressResult = await arweave.wallets.jwkToAddress(keyData);
  return addressResult
}

const exportNFT = async () => {

}

export {
  getArWalletAddressFromJson,
  exportNFT
}