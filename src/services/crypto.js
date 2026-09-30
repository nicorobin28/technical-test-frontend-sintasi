import { JSEncrypt } from "jsencrypt";
const publicKey = (import.meta.env.VITE_RSA_PUBLIC_KEY || "").replace(
  /\\n/g,
  "\n",
);
export function encrypt(value) {
  const crypt = new JSEncrypt();
  crypt.setPublicKey(publicKey);
  const result = crypt.encrypt(String(value));
  if (!result)
    throw new Error("RSA encryption failed. Check VITE_RSA_PUBLIC_KEY.");
  return result;
}
export const encryptFields = (data, fields) =>
  Object.fromEntries(
    Object.entries(data).map(([k, v]) => [
      k,
      fields.includes(k) ? encrypt(v) : v,
    ]),
  );
