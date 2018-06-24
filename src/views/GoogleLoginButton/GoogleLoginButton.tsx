import React from 'react';
import Expo from 'expo';
import { Auth } from 'aws-amplify';
import { Button, Text, View } from 'react-native';
import { Database } from 'helpers';

export class GoogleLoginButton extends React.Component<{}, { status: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { status: '' };
    this.handlePressGoogleSignIn = this.handlePressGoogleSignIn.bind(this);
  }

  async handlePressGoogleSignIn() {
    this.setState({ status: '' });
    const loginResponse = await Expo.Google.logInAsync({
      webClientId: '821903562672-0nrmuvsi3ks0hu3rg137a9i1nkb59keh.apps.googleusercontent.com',
      iosClientId: '821903562672-26mdl7ql1psrmgbu4g3spiqo64fjbo26.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (loginResponse.type !== 'success') return;

    const { idToken, user } = loginResponse;
    if (!idToken) return;

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: idToken, expires_at: 0 },
      user,
    );
    const db = new Database(credentials);
    db.getLastNDays(30, (err, data) => {
      if (err) {
        this.setState({ status: `yow Error: ${err.message}: ${JSON.stringify(err)}` });
        return;
      }
      if (!data.Count) {
        this.setState({ status: 'New user: posting initial data' });
        db.addItem({ foo: 'bar' }, (err, data) => {
          if (err) {
            this.setState({ status: `Error posting data: ${err.message}: ${JSON.stringify(err)}` });
            return;
          }
          this.setState({ status: `Successfully added user! ${JSON.stringify(data)}` });
        });
        return;
      }
      this.setState({ status: `Successfully got data! ${JSON.stringify(data.Items)}` });
    });
  }

  render() {
    return (
      <View>
        <Button title="Continue with Google" onPress={this.handlePressGoogleSignIn} />
        <Text>{this.state.status}</Text>
      </View>
    );
  }
}
