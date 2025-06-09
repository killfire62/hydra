// src/main/services/crypto.ts

import * as crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync("secret-password", "salt", 32);
const iv = Buffer.alloc(16, 0); // Initialisation vector

export class Crypto {
  static encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  static decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
