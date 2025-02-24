import CryptoJS from 'crypto-js';  // ES6 风格的模块导入
import fs from 'fs';  // ES6 风格的模块导入
import readline from 'readline';  // ES6 风格的模块导入
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts'
 
const mnemonic = generateMnemonic(english)
const account = mnemonicToAccount(mnemonic)

// 创建 readline 接口来从用户输入读取密码
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// 提示用户输入密码
rl.question('请输入密码以加密私钥: ', (password) => {
  // 使用用户输入的密码加密私钥
  const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, password).toString();
  const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, password).toString();

    // 保存加密后的助记词
    fs.writeFileSync('encrypted_mnemonic.txt', encryptedMnemonic);

    console.log('Encrypted mnemonic saved to encrypted_mnemonic.txt');

  // 将加密后的私钥保存到文件
  fs.writeFileSync('encryptedPrivateKey.json', JSON.stringify({
    address,
    encryptedPrivateKey
  }));

  console.log('私钥已加密并保存。');

  // 关闭 readline 接口
  rl.close();
});