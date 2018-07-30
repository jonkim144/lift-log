import { Auth } from 'aws-amplify';
import { AWSError, DynamoDB } from 'aws-sdk';
import Expo from 'expo';
import { Database } from 'helpers';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

interface IProps {
    onLoggedIn: (isFirstTimeUser: boolean) => void;
}
interface IState {
    status: string;
}

export class GoogleLoginButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { status: '' };
        this.handlePressGoogleSignIn = this.handlePressGoogleSignIn.bind(this);
    }

    public async handlePressGoogleSignIn() {
        this.setState({ status: '' });
        let loginResponse: Expo.Google.LogInResult;
        try {
            loginResponse = await Expo.Google.logInAsync({
                iosClientId: '821903562672-26mdl7ql1psrmgbu4g3spiqo64fjbo26.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                webClientId: '821903562672-0nrmuvsi3ks0hu3rg137a9i1nkb59keh.apps.googleusercontent.com',
            });
        } catch (e) {
            this.setState({ status: JSON.stringify(Object.keys(e)) });
            return;
        }
        if (loginResponse.type !== 'success') {
            return;
        }

        const { idToken, user } = loginResponse;
        if (!idToken) {
            return;
        }

        let credentials;
        try {
            credentials = await Auth.federatedSignIn('google', { token: idToken, expires_at: 0 }, user);
        } catch (e) {
            this.setState({ status: JSON.stringify(e) });
            return;
        }

        const db = new Database(credentials);
        db.getLastNDays(30, (err: AWSError, data: DynamoDB.QueryOutput) => {
            if (err) {
                return;
            }
            if (!data.Count) {
                this.setState({ status: 'New user: posting initial data' });
                db.addItem({ foo: 'bar' }, (addItemErr: AWSError, addedData: DynamoDB.PutItemOutput) => {
                    if (addItemErr) {
                        return;
                    }
                    this.setState({ status: `Successfully added user! ${JSON.stringify(addedData)}` });
                    this.props.onLoggedIn(true);
                });
                return;
            }
            this.setState({ status: `Data retreived: ${JSON.stringify(data)}` });
            this.props.onLoggedIn(false);
        });
    }

    public render() {
        return (
            <View>
                <Button
                    backgroundColor="#696969"
                    borderRadius={5}
                    color="white"
                    fontSize={32}
                    fontWeight={'500'}
                    style={{ borderRadius: 5 }}
                    icon={googleIcon}
                    onPress={this.handlePressGoogleSignIn}
                    raised={true}
                    title="Continue with Google"
                    underlayColor="white"
                />
                <Text>{this.state.status}</Text>
            </View>
        );
    }
}

const googleIcon = { color: 'red', name: 'google', type: 'font-awesome' };
