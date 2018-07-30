import { shallow } from 'enzyme';
import React from 'react';
import { ExistingUser } from './ExistingUser';

it('renders ExistingUser', () => {
    const wrapper = shallow(<ExistingUser />);
    expect(wrapper.find('Text')).toHaveLength(1);
});
