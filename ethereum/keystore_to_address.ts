const keythereum = require("keythereum");
const fs = require("fs");
const path = require("path");
const utils = require("ethereumjs-util");

export type AddressInfoWithKeyStore = {
  address: string;
  privateKey: string;
  keyObject: any;
}

/**
 * @param filepath
 * @param password
 * @returns
 */
export async function keystoreToPrivate(filepath: string, password: string): Promise<AddressInfoWithKeyStore> {
  const abfilepath = path.resolve(__dirname, filepath);
  const keyObject = JSON.parse(fs.readFileSync(abfilepath));
  const privateKey = keythereum.recover(password, keyObject);
  return {
    address: utils.toChecksumAddress(`0x${keyObject.address}`),
    privateKey: `0x${privateKey.toString("hex")}`,
    keyObject: keyObject,
  }
}