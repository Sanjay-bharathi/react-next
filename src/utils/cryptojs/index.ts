var CryptoJS = require("crypto-js");

export const encrypt = (data: any) =>
  process.env.ALLOW_CRYPTION === "true"
    ? CryptoJS.AES.encrypt(JSON.stringify(data), "sanjay").toString()
    : data;

export const decrypt = (data: any) => {
  console.log("1->called", data, process.env.ALLOW_CRYPTION);

  return process.env.ALLOW_CRYPTION === "true"
    ? JSON.parse(
        CryptoJS.AES.decrypt(data, "sanjay").toString(CryptoJS.enc.Utf8),
      )
    : data;
};
