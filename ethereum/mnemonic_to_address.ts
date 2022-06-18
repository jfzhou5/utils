import {generateMnemonic, mnemonicToSeed, wordlists} from 'bip39';
import {hdkey} from 'ethereumjs-wallet';

export type AddressInfoWithMnemonic = {
  mnemonic: string;
  addressToPrivateKey: Map<string, string>;
}

export async function generateMnemonicCode() {
  return generateMnemonic(256, undefined, wordlists.english);
}

export async function mnemonicToAddressAndPrivateKey(mnemonic: string, number: number): Promise<AddressInfoWithMnemonic> {
  const seed = await mnemonicToSeed(mnemonic);
  const hdWallet = hdkey.fromMasterSeed(seed);
  const addressInfo = {
    addressToPrivateKey: new Map<string, string>(),
    mnemonic: mnemonic
  };

  for (let i = 0; i < number; i++) {
    const path = `m/44'/60'/0'/0/${i}`
    const wallet = hdWallet.derivePath(path)
    addressInfo.addressToPrivateKey.set(wallet.getWallet().getChecksumAddressString(), wallet.getWallet().getPrivateKeyString());
  }
  return addressInfo;
}
