import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExistingUser, FirstTimeUser, GoogleLoginButton } from 'views';

export default class App extends React.Component<{}, { isFirstTimeUser: boolean; loggedIn: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isFirstTimeUser: false,
            loggedIn: false,
        };
        this.handleLoggedIn = this.handleLoggedIn.bind(this);
    }

    public handleLoggedIn(isFirstTimeUser: boolean) {
        this.setState({ loggedIn: true, isFirstTimeUser });
    }

    public render() {
        const { isFirstTimeUser, loggedIn } = this.state;
        return (
            <View style={styles.container}>
                {!loggedIn ? <GoogleLoginButton onLoggedIn={this.handleLoggedIn} /> : isFirstTimeUser ? <FirstTimeUser /> : <ExistingUser />}
            </View>
        );
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
