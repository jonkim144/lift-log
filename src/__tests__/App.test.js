import React from 'react';
import App from '../../App';
import { shallow } from 'enzyme';

jest.mock('aws-amplify', () => ({ configure: jest.fn() }));

it('renders google login button', () => {
    expect(shallow(<App />).find('GoogleLoginButton')).toHaveLength(1);
});
