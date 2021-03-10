import { config } from 'node-config-ts';
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = config.application.secret;
const iv = crypto.randomBytes(16);

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  });
};

export const decrypt = (hash: { iv: string; content: string }): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export const encryptAny = (object: any): string =>
  encrypt(JSON.stringify(object));

export const decryptAny = (hashJson: string): any =>
  JSON.parse(decrypt(JSON.parse(hashJson)));

export const mongoCipherType = {
  type: String,
  set: encryptAny,
  get: decryptAny,
};
