import React from 'react';
import { shallow } from 'enzyme';
import SocialButton from './SocialMediaButton';

describe('SocialButton Shallow rendering', () => {
  const handleSocialButton = jest.fn();
  const wrapper = shallow(
    <SocialButton
      className="social-btn"
      fonticon="fa-google-plus-g"
      onClick={handleSocialButton}
      href="somewebsite.com"
    />
  );

  it('should render button with the appropriate props', () => {
    expect(wrapper.find('social-btn').exists());
  });

  it('matches the snapshot', () => {
    const tree = shallow(
      <SocialButton
        className="social-btn"
        fonticon="fa-google-plus-g"
        onClick={handleSocialButton}
        href="somewebsite.com"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
