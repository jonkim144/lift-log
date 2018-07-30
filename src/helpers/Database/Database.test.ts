import { DynamoDB } from 'aws-sdk';
import { Database } from './Database';

jest.mock('aws-amplify', () => ({ configure: jest.fn() }));
const mockQuery = jest.fn();
const mockPutItem = jest.fn();
jest.mock('aws-sdk', () => ({
    DynamoDB: jest.fn().mockImplementation(() => ({ query: mockQuery, putItem: mockPutItem })),
}));

describe('Database', () => {
    it('constructor() sets provided credentials and region', () => {
        const credentials = { identityId: 'foo-bar' };
        const region = 'my-region';
        const _ = new Database(credentials, 'MyTable', region);
        expect(DynamoDB).toHaveBeenCalledWith({ region, credentials });
    });

    it('getLastNDays()', () => {
        const identityId = 'foo-bar';
        const credentials = { identityId };
        const days = 15;
        const callback = () => undefined;
        const TableName = 'MyTable';
        Date.now = jest.fn(() => 1234567890);
        new Database(credentials, TableName, 'my-region').getLastNDays(days, callback);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(
            {
                ExpressionAttributeValues: {
                    ':from': { N: `${1234567890 - days * 24 * 60 * 60 * 1000}` },
                    ':userId': { S: identityId },
                },
                KeyConditionExpression: 'userId = :userId AND CreationDate > :from',
                TableName,
            },
            callback,
        );
    });

    it('addItem()', () => {
        const identityId = 'foo-bar';
        const credentials = { identityId };
        const callback = () => undefined;
        const TableName = 'MyTable';
        Date.now = jest.fn(() => 1234567890);
        const item = { type: 'Squat', weight: 315, reps: 5 };
        new Database(credentials, TableName, 'my-region').addItem(item, callback);
        expect(mockPutItem).toHaveBeenCalledTimes(1);
        expect(mockPutItem).toHaveBeenCalledWith(
            {
                Item: {
                    CreationDate: { N: '1234567890' },
                    Item: { S: JSON.stringify(item) },
                    userId: { S: identityId },
                },
                TableName,
            },
            callback,
        );
    });
});
