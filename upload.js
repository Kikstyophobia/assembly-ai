import 'dotenv/config';
import fetch from 'node-fetch';
import axios from 'axios';

const url = 'https://api.assemblyai.com/v2/transcript';
// node upload.js [LINK]
// upload_url: 'https://cdn.assemblyai.com/upload/85a5ebbc-d533-4532-b78f-bf27a8a119cd'
// 85a5ebbc-d533-4532-b78f-bf27a8a119cd

let args = process.argv.slice(2);
let audioUrl = args[0];
const data = {
  "audio_url": audioUrl
};

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.ASSEMBLYAI_API_KEY,
    "content-type": "application/json",
  },
});
assembly
  .post("/transcript", {
    audio_url: audioUrl,
    summarization: true,
    summary_model: "informative",
    summary_type: "bullets",
    iab_categories: true,
    speaker_labels: true
  })
  .then((data) => {
    console.log('Success:', data)
    console.log('ID:', data.id);
  })
  .catch((err) => {
    console.error('Error:', err)
  });