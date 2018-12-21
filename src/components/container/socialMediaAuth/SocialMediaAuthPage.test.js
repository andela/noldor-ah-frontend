import React from 'react';
import { shallow } from 'enzyme';
import { SocialMediaAuthPage } from './SocialMediaAuthPage';
import { history } from '../../../routes/Routes';

describe('Visiting the web app through social media registrations or login', () => {
  describe('Test the connected component', () => {
    const handleSocialMedia = jest.fn(() => {
      return Promise.resolve('smurf');
    });
    const location = { pathname: '/auth' };
    const loading = true;

    const wrapper = shallow(
      <SocialMediaAuthPage
        handleSocialMedia={handleSocialMedia}
        location={location}
        history={history}
        loading={loading}
      />
    );
    it('should matche the snapshot', () => {
      const tree = shallow(
        <SocialMediaAuthPage
          handleSocialMedia={handleSocialMedia}
          location={location}
          history={history}/>
      );
      expect(tree).toMatchSnapshot();
    });

    it('should render props', () => {
      expect(wrapper.instance().props.location).toMatchObject({ pathname: '/auth' });
      expect(wrapper.instance().props.loading).toBe(true);
      expect(wrapper.instance().props.history).toMatchObject(history);
    });
  });
});
