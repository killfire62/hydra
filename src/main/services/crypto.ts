// src/main/services/crypto.ts

import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// ⚠️ Change ça par une clé sécurisée (32 bytes pour aes-256-cbc)
const key = Buffer.from("W9/5C9aJYMtbm9HQ9GZVs3GRj9lpPr6ay91fSxSMVq6ihwahXiehgNtrMGxqQ0bF", "base64");
const iv = Buffer.alloc(16, 0); // IV statique (mieux d'utiliser randomBytes(16) en prod)

export function encrypt(text: string): string {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf-8"), cipher.final()]);
  return encrypted.toString("hex");
}

export function decrypt(encryptedText: string): string {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf-8");
}
