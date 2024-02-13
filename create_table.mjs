import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "local",
  endpoint: "http://localhost:8000",
});

const createUsersTableCommand = new CreateTableCommand({
  TableName: "Users",
  AttributeDefinitions: [
    {
      AttributeName: "username",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "username",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1000,
    WriteCapacityUnits: 1000,
  },
});

const createFormsTableCommand = new CreateTableCommand({
  TableName: "Forms",
  AttributeDefinitions: [
    {
      AttributeName: "form_id",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "form_id",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10000,
    WriteCapacityUnits: 10000,
  },
});

const createPermissionsTableCommand = new CreateTableCommand({
  TableName: "Permissions",
  AttributeDefinitions: [
    {
      AttributeName: "form_id",
      AttributeType: "S",
    },
    {
      AttributeName: "secret_token",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "form_id",
      KeyType: "HASH",
    },
    {
      AttributeName: "secret_token",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10000,
    WriteCapacityUnits: 10000,
  },
});

const createResponsesTableCommand = new CreateTableCommand({
  TableName: "Responses",
  AttributeDefinitions: [
    {
      AttributeName: "response_id",
      AttributeType: "S",
    },
    {
      AttributeName: "form_id",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "form_id",
      KeyType: "HASH",
    },
    {
      AttributeName: "response_id",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10000,
    WriteCapacityUnits: 10000,
  },
});

let response = await client.send(createResponsesTableCommand);
console.log(response);