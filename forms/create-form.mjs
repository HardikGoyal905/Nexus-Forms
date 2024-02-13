import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createPermissions } from "../permissions/create-permission.mjs";
import { checkAuthenticity } from "../users/authenticate.mjs";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});


function buildPutItemCommand(form_id, plugins) {
  const command = new PutItemCommand({
    TableName: "Forms",
    Item: {
      form_id: { S: form_id },
      plugins: { SS: plugins },
    }
  });

  return command;
}

export const createForm = async (form_id, plugins, username, secret_token) => {
  if(!(await checkAuthenticity(username, secret_token))) {
    throw new Error("Invalid username/secret_token")
  }

  checkForValidPlugins(plugins)

  createPermissions(secret_token, form_id)

  let command = buildPutItemCommand(form_id, plugins)

  const response = await client.send(command);
  return response;
};