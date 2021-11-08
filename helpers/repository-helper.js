const { DynamoDB } = require('aws-sdk');

const putValues = async (params) => {
    const dynamoClient = new DynamoDB.DocumentClient();
    return dynamoClient.put(params).promise();
}

const updateValues = async (params) => {
    const dynamoClient = new DynamoDB.DocumentClient();
    return dynamoClient.update(params).promise();
}

const getByKey = async (params) => {
    const dynamoClient = new DynamoDB.DocumentClient();
    return dynamoClient.get(params).promise();
}

const keySanitization = (string) => {
    return string.replace(/[^\w\s]/gi, '');
}

module.exports = {
    putValues,
    getByKey,
    updateValues,
    keySanitization
};