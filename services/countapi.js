const axios = require("axios");

const get = async (namespace) => {
    const { data: { value: visits } } = await axios(`https://api.countapi.xyz/get/${namespace}/count`);
    return visits;
}

const hit = async (namespace) => {
    const { data: { value: visits } } = await axios(`https://api.countapi.xyz/hit/${namespace}/count`);
    return visits;
}

module.exports = {
    get,
    hit
};