import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv'

// node uploadfile.js [file path]
// node uploadfile.js //Users/calvin/Downloads/joe-rogan.m4a

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
      authorization: process.env.ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
  },
});

let args = process.argv.slice(2);
let audioPath = args[0];

fs.readFile(audioPath, (err, data) => {
  if (err) return console.error(err);

  assembly
      .post("/upload", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
});

