import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});


function buildPutItemCommand(secret_token, form_id) {
  const command = new PutItemCommand({
    TableName: "Permissions",
    Item: {
      secret_token: { S: secret_token },
      form_id: { S: form_id },
    }
  });

  return command;
}

export const createPermissions = async (secret_token, form_id) => {
  let command = buildPutItemCommand(secret_token, form_id)
  
  const response = await client.send(command);

  return response;
};