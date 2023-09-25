var CryptoJS = require("crypto-js");

const ALLOW_CRYPTION = process.env.ALLOW_CRYPTION || "true";

export const encrypt = (data: any) =>
  ALLOW_CRYPTION === "true"
    ? CryptoJS.AES.encrypt(JSON.stringify(data), "sanjay").toString()
    : data;

export const decrypt = (data: any) => {
  return ALLOW_CRYPTION === "true"
    ? JSON.parse(
        CryptoJS.AES.decrypt(data, "sanjay").toString(CryptoJS.enc.Utf8),
      )
    : data;
};
