import { PutItemCommand, GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});


function buildPutItemCommand(username, password, secret_token) {
  const command = new PutItemCommand({
    TableName: "Users",
    Item: {
        username: { S: username },
        password: { S: password },
      secret_token: { S: secret_token }
    }
  });

  return command;
}

export const registerUser = async (username, password, secret_token) => {
    if(!(await availableUsername(username))) {
        throw new Error("Username is already taken")
    }

  let command = buildPutItemCommand(username, password, secret_token)
  
  const response = await client.send(command);
  
  return response;
};


async function availableUsername(username) {
    console.log(username)
    const command = new GetItemCommand({
        TableName: "Users",
        Key: {
            username: { S: username }
        }
    })

    const response = await client.send(command)

    if(response.Item) {
        return false
    } else {
        return true
    }
}