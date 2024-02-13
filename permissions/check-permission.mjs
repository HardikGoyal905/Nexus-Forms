import { PutItemCommand, GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});

export async function checkFormPermissions(secret_token, form_id) {
    const command = new GetItemCommand({
        TableName: "Permissions",
        Key: {
            secret_token: { S: secret_token },
            form_id: { S: form_id}
        }
    })

    const response = await client.send(command)

    if(response.Item) {
        return true
    } else {
        return false
    }
}