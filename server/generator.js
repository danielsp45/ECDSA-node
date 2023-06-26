const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const slicedpublickey = publicKey.slice(1);
const wallet = keccak256(slicedpublickey).slice(-20);

console.log('wallet:', toHex(wallet));
