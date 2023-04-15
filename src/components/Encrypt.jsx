import React, { useState } from 'react';
import CryptoJs from 'crypto-js';

const Encrypt = () => {

  const secretPass = 'hello';
  const [encData, setEncData] = useState();

    const encryptHandler = () => {
        const obj = { name: 'hello', field: 'name' }
        const data = CryptoJs.AES.encrypt(JSON.stringify(obj), secretPass).toString();
        setEncData(data);
        console.log('encrypted');
    };

    const decryptHandler = () => {
        const bytes = CryptoJs.AES.decrypt(encData, secretPass)
        const data = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
        console.log(data);
    };

  return (
    <div>
        <p>This is a sample text</p>
        <button onClick={encryptHandler}>encrypt</button>
        <button onClick={decryptHandler}>decrypt</button>
    </div>
  )
}

export default Encrypt;