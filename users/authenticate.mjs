import { PutItemCommand, GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});

export async function checkAuthenticity(username, secret_token) {
    const command = new GetItemCommand({
        TableName: "Users",
        Key: {
            username: { S: username }
        }
    })

    const response = await client.send(command)

    if(response.Item && response.Item.secret_token.S == secret_token) {
        return true
    } else {
        return false
    }
}