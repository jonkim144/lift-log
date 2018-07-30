import { shallow } from 'enzyme';
import React from 'react';
import { MaxCalculator } from './MaxCalculator';

describe('<MaxCalculator />', () => {
    it('renders', () => {
        const wrapper = shallow(<MaxCalculator />);
        expect(wrapper.find('ScrollableTabView')).toHaveLength(1);
        expect(wrapper.find('MaxCalculatorContent')).toHaveLength(4);
    });
});
