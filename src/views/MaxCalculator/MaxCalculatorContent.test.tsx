import { shallow } from 'enzyme';
import React from 'react';
import MaxCalculatorContent from './MaxCalculatorContent';

describe('<MaxCalculatorContent />', () => {
    it('renders', () => {
        const wrapper = shallow(<MaxCalculatorContent tabLabel="MyTab" />);
        expect(wrapper.find('TouchableWithoutFeedback')).toHaveLength(1);
        expect(wrapper.find('TextElement')).toHaveLength(5);
        expect(
            wrapper
                .find('TextElement')
                .at(0)
                .dive()
                .dive()
                .text(),
        ).toBe('MyTab');
    });
});
