import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FirstTimeUser, GoogleLoginButton } from 'views';

export default class App extends React.Component<{}, { loggedIn: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
    }

    public handleLoggedIn() {
        this.setState({ loggedIn: true });
    }

    public render() {
        return <View style={styles.container}>{this.state.loggedIn ? <FirstTimeUser /> : <GoogleLoginButton onLoggedIn={this.handleLoggedIn} />}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
    },
});
