const axios = require("axios");
  
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
    },
});
assembly
    .post("/transcript", {
        audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));