const express = require('express');
const axios = require("axios");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/visitors', async (req, res) => {
    const response = await axios('https://api.countapi.xyz/get/henrique/test');
    const value = response.data.value;
    res.send({ value });
});
app.post('/visitors', async (req, res) => {
    const response = await axios('https://api.countapi.xyz/hit/henrique/test');
    const value = response.data.value;
    res.send({ value });
});

app.listen(3000, () => console.log(`Listening on: 3000`));
// module.exports.handler = serverless(app);