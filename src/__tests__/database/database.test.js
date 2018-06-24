import { Database } from 'database';
import { DynamoDB } from 'aws-sdk';

jest.mock('aws-amplify', () => ({ configure: jest.fn() }));
const mockQuery = jest.fn();
const mockPutItem = jest.fn();
jest.mock('aws-sdk', () => ({ DynamoDB: jest.fn().mockImplementation(() => ({ query: mockQuery, putItem: mockPutItem })) }));

describe('Database', () => {
    it('constructor() sets provided credentials and region', () => {
        const credentials = { identityId: 'foo-bar' };
        const region = 'my-region';
        new Database(credentials, 'MyTable', region);
        expect(DynamoDB).toHaveBeenCalledWith({ region, credentials });
    });

    it('getLastNDays()', () => {
        const identityId = 'foo-bar';
        const credentials = { identityId };
        const days = 15;
        const callback = () => {};
        const TableName = 'MyTable';
        Date.now = jest.fn(() => 1234567890);
        new Database(credentials, TableName, 'my-region').getLastNDays(days, callback);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(
            {
                TableName,
                KeyConditionExpression: 'userId = :userId AND CreationDate > :from',
                ExpressionAttributeValues: { ':userId': { S: identityId }, ':from': { N: `${1234567890 - days * 24 * 60 * 60 * 1000}` } }
            },
            callback
        );
    });

    it('addItem()', () => {
        const identityId = 'foo-bar';
        const credentials = { identityId };
        const callback = () => {};
        const TableName = 'MyTable';
        Date.now = jest.fn(() => 1234567890);
        const item = { type: 'Squat', weight: 315, reps: 5 };
        new Database(credentials, TableName, 'my-region').addItem(item, callback);
        expect(mockPutItem).toHaveBeenCalledTimes(1);
        expect(mockPutItem).toHaveBeenCalledWith(
            {
                TableName,
                Item: {
                    userId: { S: identityId },
                    CreationDate: { N: '1234567890' },
                    Item: { S: JSON.stringify(item) }
                }
            },
            callback
        );
    });
});
