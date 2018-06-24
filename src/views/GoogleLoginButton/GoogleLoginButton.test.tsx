import React from 'react';
import { shallow } from 'enzyme';
import { GoogleLoginButton } from './GoogleLoginButton';

jest.mock('aws-amplify', () => ({ configure: jest.fn() }));

it('renders google login button', () => {
  const wrapper = shallow(<GoogleLoginButton />);
  expect(wrapper.find('Text')).toHaveLength(1);
  expect(wrapper.find('Button')).toHaveLength(1);
  expect(wrapper.find('Button').prop('title')).toBe('Continue with Google');
});
