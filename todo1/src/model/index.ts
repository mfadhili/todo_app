import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export  const dynamoDBClient = () : DocumentClient =>{
    if (process.env.IS_OFFLINE) {
        return new AWS.DynamoDB.DocumentClient({
            region: "us-east-1",
            endpoint: "dynamodb.us-east-1.amazonaws.com"
        });
    }
    return new AWS.DynamoDB.DocumentClient();
};