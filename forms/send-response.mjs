import { PutItemCommand, GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { checkFormPermissions } from "../permissions/check-permission.mjs";
import { validateAllPlugins, runAllPlugins, checkForValidPlugins } from "../plugins/plugin.mjs";

const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
});


function buildPutItemCommand(response, response_id, form_id) {
  let formattedResponse = {}
  for (const [key, value] of Object.entries(response)) {
    formattedResponse[key] = { S: value }
  }
  const command = new PutItemCommand({
    TableName: "Responses",
    Item: {
      response_id: { S: response_id },
      form_id: { S: form_id },
      response: { M: formattedResponse }
    }
  });

  return command;
}

export const sendResponse = async (response, response_id, form_id, secret_token) => {
  if(!(await checkFormPermissions(secret_token, form_id))) {
    throw new Error("You don't have permission to send a response to this form")
  }

  const plugins = await fetchAllPlugins(form_id)

  try {
    validateAllPlugins(plugins, form_id, response)
  }
  catch(error) {  
    throw new Error("Validation failed: " + error)
  }

  let command = buildPutItemCommand(response, response_id, form_id)
  
  const databaseResponse = await client.send(command);
  console.log(databaseResponse);

  runAllPlugins(plugins, form_id, response, databaseResponse)
};


async function fetchAllPlugins(form_id) {
  const command = new GetItemCommand({
      TableName: "Forms",
      Key: {
          form_id: { S: form_id }
      }
  })

  const response = await client.send(command)

  const plugins = response.Item.plugins.SS

  return plugins
}