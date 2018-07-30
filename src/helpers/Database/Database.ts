import Amplify from 'aws-amplify';
import aws_exports from 'aws-exports';
import { AWSError, DynamoDB } from 'aws-sdk';
Amplify.configure(aws_exports);

export class Database {
    private table: string;
    private db: DynamoDB;
    private userId: { S: string };

    constructor(credentials: any, table = aws_exports.aws_dynamodb_table_schemas[0].tableName, region = aws_exports.aws_dynamodb_all_tables_region) {
        this.table = table;
        this.db = new DynamoDB({ region, credentials });
        this.userId = { S: credentials.identityId };
        this.getLastNDays = this.getLastNDays.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    public getLastNDays(days: number, callback: (err: AWSError, data: DynamoDB.QueryOutput) => void) {
        const period = days * 24 * 60 * 60 * 1000;
        const params = {
            ExpressionAttributeValues: {
                ':from': { N: `${Date.now() - period}` },
                ':userId': this.userId,
            },
            KeyConditionExpression: 'userId = :userId AND CreationDate > :from',
            TableName: this.table,
        };
        this.db.query(params, callback);
    }

    public addItem(item: any, callback: (err: AWSError, data: DynamoDB.PutItemOutput) => void) {
        this.db.putItem(
            {
                Item: {
                    CreationDate: { N: Date.now().toString() },
                    Item: { S: JSON.stringify(item) },
                    userId: this.userId,
                },
                TableName: this.table,
            },
            callback,
        );
    }
}
