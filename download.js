import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';

let args = process.argv.slice(2);
let id = args[0];
const url = `https://api.assemblyai.com/v2/transcript/${id}`;

const params = {
  headers: {
    "authorization": process.env.ASSEMBLYAI_API_KEY,
    "content-type": "application/json",
  },
  method: 'GET'
};

function newTextFile(data) {
  fs.writeFile('output.js', `const text = ${data}`, (err => {
    if (err) throw err;
  }))
}

// node download.js rbzkkhivmn-45db-4854-9c15-1809ee75d9a3

function print(data) {
  switch (data.status) {
    case 'queued':
    case 'processing':
      console.log('AssemblyAI is still transcribing your audio, please try again in a few minutes!');
      break;
    case 'completed':
      console.log(`Text: ${data.text}`);
      console.log(data)
      newTextFile(JSON.stringify(data, null, 2));
      break;
    default:
      console.log(`Something went wrong :-( : ${data.status}`);
      break;
  }
}

fetch(url, params)
  .then(response => response.json())
  .then(data => {
    print(data);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });