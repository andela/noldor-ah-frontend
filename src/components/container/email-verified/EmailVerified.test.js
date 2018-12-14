import React from 'react';
import { shallow } from 'enzyme';
import EmailVerified from './EmailVerified';

describe('Rendering <EmailVerified />', () => {
  let wrapper, props;
  const hash = '2765157216f99ac0e03007722eb4e50caf272f74d16575d65219c83d70340007';
  const url = `https://noldor-ah-backend-staging.herokuapp.com/api/v1/users/verify?id=${hash}`;
  beforeEach(() => {
    props = {
      location: { search: url },
    };
  });

  it('should render page correctly', () => {
    wrapper = shallow(<EmailVerified {...props} />);
    expect(wrapper.find('h1').text()).toBe('Email Verification');
    expect(wrapper.find('h2').text()).toBe('Verifying account...');
    expect(wrapper.find('p').length).toEqual(1);
  });
});
