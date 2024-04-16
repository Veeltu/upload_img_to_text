import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

    const inText = event.extracted_text ;
    const id = event.noteid


    const command = new UpdateCommand({
        TableName: "notes",
        Key: {
            noteid: id,
        },
        UpdateExpression: "set extracted_content = :extracted_text ",
        ExpressionAttributeValues: {
            ":extracted_text": `${inText}`,
        },
        ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
}


