import React from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        margin: 30,
        minWidth: 150,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 75,
    },
    heading: {
        color: 'white',
        fontWeight: '500',
    },
    input: {
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        color: 'white',
        fontSize: 40,
        fontWeight: '500',
        marginBottom: 20,
        minWidth: 150,
        textAlign: 'center',
    },
    label: {
        color: 'white',
        fontWeight: '500',
    },
    subheading: {
        color: 'white',
        fontWeight: '500',
        margin: 30,
        textAlign: 'center',
    },
});

interface IProps {
    tabLabel: string;
}

interface IState {
    reps: number;
    weightLifted: number;
}

export default class MaxCalculatorContent extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            reps: 0,
            weightLifted: 0,
        };
        this.getEstimatedMax = this.getEstimatedMax.bind(this);
        this.handleChangeTextWeight = this.handleChangeTextWeight.bind(this);
        this.handleChangeTextReps = this.handleChangeTextReps.bind(this);
    }

    public render() {
        const { tabLabel } = this.props;
        const { weightLifted, reps } = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text h1={true} style={styles.heading}>
                        {tabLabel}
                    </Text>
                    <Text h3={true} style={styles.subheading}>
                        {'CALCULATE\nYOUR\nONE-REP MAX'}
                    </Text>
                    <Text style={styles.label}>WEIGHT LIFTED</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={this.handleChangeTextWeight}
                        selectTextOnFocus={true}
                        value={weightLifted.toString()}
                    />
                    <Text style={styles.label}>REPS</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={this.handleChangeTextReps}
                        selectTextOnFocus={true}
                        value={reps.toString()}
                    />
                    <Text style={styles.label}>ESTIMATED MAX</Text>
                    <TextInput style={styles.input} editable={false} value={this.getEstimatedMax().toString()} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    private getEstimatedMax() {
        return this.state.reps === 0 ? 0 : Math.floor(this.state.weightLifted * (1 + this.state.reps / 30));
    }

    private handleChangeTextWeight(text: string) {
        this.setState({ weightLifted: parseInt(text, undefined) || 0 });
    }

    private handleChangeTextReps(text: string) {
        this.setState({ reps: parseInt(text, undefined) || 0 });
    }
}
