import { DynamoDB } from 'aws-sdk';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

class Database {
  constructor(credentials, table = aws_exports.aws_dynamodb_table_schemas[0].tableName, region = aws_exports.aws_dynamodb_all_tables_region) {
    this.table = table;
    this.db = new DynamoDB({ region, credentials });
    this.userId = { S: credentials.identityId };
    this.getLastNDays = this.getLastNDays.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  getLastNDays(days, callback) {
    const period = days * 24 * 60 * 60 * 1000;
    const params = {
      TableName: this.table,
      KeyConditionExpression: 'userId = :userId AND CreationDate > :from',
      ExpressionAttributeValues: {
        ':userId': this.userId,
        ':from': { N: `${Date.now() - period}` }
      }
    };
    this.db.query(params, callback);
  }

  addItem(item, callback) {
    this.db.putItem(
      {
        TableName: this.table,
        Item: {
          userId: this.userId,
          CreationDate: { N: Date.now().toString() },
          Item: { S: JSON.stringify(item) }
        }
      },
      callback
    );
  }
}

export { Database };
