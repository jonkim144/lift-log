import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MaxCalculatorContent from './MaxCalculatorContent';

export class MaxCalculator extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <ScrollableTabView style={{ marginTop: 30 }} tabBarTextStyle={{ color: '#fff' }} tabBarUnderlineStyle={{ backgroundColor: '#fff' }}>
                <MaxCalculatorContent tabLabel="SQUAT" />
                <MaxCalculatorContent tabLabel="BENCH" />
                <MaxCalculatorContent tabLabel="DEADLIFT" />
                <MaxCalculatorContent tabLabel="OHP" />
            </ScrollableTabView>
        );
    }
}
