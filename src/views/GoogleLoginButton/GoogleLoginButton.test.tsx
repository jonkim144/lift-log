import { shallow } from 'enzyme';
import React from 'react';
import { GoogleLoginButton } from './GoogleLoginButton';

jest.mock('aws-amplify', () => ({ configure: jest.fn() }));

it('renders google login button', () => {
    const wrapper = shallow(<GoogleLoginButton onLoggedIn={jest.fn()} />);
    expect(wrapper.find('TextElement')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').prop('title')).toBe('Continue with Google');
});
