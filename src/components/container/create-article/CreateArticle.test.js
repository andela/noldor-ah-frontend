import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CreateArticle, { ConnectedCreateArticle } from './CreateArticle';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CreateArticle />', () => {
  it('matches the snapshot', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = shallow(<Provider store={store}>
      <CreateArticle />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render create article page correctly', () => {
    const wrapper = shallow(<ConnectedCreateArticle />);
    expect(wrapper.find('.column').exists()).toBe(true);
    expect(wrapper.find('.column').exists()).toBe(true);
    expect(wrapper.find('.is-8').exists()).toBe(true);
    expect(wrapper.find('.is-4').exists()).toBe(true);
    expect(wrapper.find('#editor').exists()).toBe(true);
  });

  it('should update the state when data is passed', () => {
    const wrapper = mount(<ConnectedCreateArticle />);
    const titleInput = wrapper.find('#title').at(1);
    titleInput.instance().value = 'Using a function in setState instead of an object';
    titleInput.simulate('change');

    const descriptionInput = wrapper.find('#description').at(1);
    const val = 'Components are reusable pieces of code that often contain their own state.';
    descriptionInput.instance().value = val;
    descriptionInput.simulate('change');

    const editorInput = wrapper.find('Editor');
    const val2 = 'Amazing stateful components to hold my states.';
    editorInput.instance().value = val2;
    editorInput.simulate('change');

    const categoryInput = wrapper.find('#select-category');
    categoryInput.instance().value = 'technology';
    categoryInput.simulate('change');

    expect(wrapper.state()).toMatchObject({
      title: 'Using a function in setState instead of an object',
      description: 'Components are reusable pieces of code that often contain their own state.',
      content: 'Write your story here...',
      featuredImg: '',
      category: 'technology',
      tags: '',
      articleTags: [],
      articleSlug: null,
      suggestions:
      [{ id: 'technology', text: 'technology' },
        { id: 'Andela', text: 'Andela' }],
      remainingTags: 5,
      tagInformation: '',
      imgStatus: 'upload a featured image',
      imgColor: 'black',
      status: 'success',
      message: '',
      display: 'none'
    });
    wrapper.unmount();
  });

  it('should change text on input in the editor', () => {
    jest.useFakeTimers();
    const event = {
      preventDefault() {},
      target: {
        getContent: jest.fn(),
      }
    };
    const wrapper = shallow(<ConnectedCreateArticle />);
    const editorInput = wrapper.find('Editor');
    const val2 = 'Amazing stateful components to hold my states.';
    editorInput.value = val2;
    editorInput.simulate('change', event);
    expect(event.target.getContent).toBeCalled();
  });

  it('should handle submit changes successfully', () => {
    const MockcreateUserArticleFn = jest.fn();
    const notification = {
      type: 'error',
    };
    const wrapper = mount(<ConnectedCreateArticle
      createUserArticle={MockcreateUserArticleFn}
      notification={notification}
    />);
    const titleInput = wrapper.find('#title').at(1);
    titleInput.instance().value = 'some titled article';
    titleInput.simulate('change');

    const descriptionInput = wrapper.find('#description').at(1);
    const val = 'brief description';
    descriptionInput.instance().value = val;
    descriptionInput.simulate('change');

    const editorInput = wrapper.find('Editor');
    const val2 = 'some content';
    editorInput.instance().value = val2;
    editorInput.simulate('change');

    const categoryInput = wrapper.find('#select-category');
    categoryInput.instance().value = 'health';
    categoryInput.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(MockcreateUserArticleFn.mock.calls[0][0]).toEqual({
      articleSlug: null,
      articleTags: [],
      category: 'health',
      content: 'Write your story here...',
      description: 'brief description',
      display: 'none',
      featuredImg: '',
      imgColor: 'black',
      imgStatus: 'upload a featured image',
      message: '',
      remainingTags: 5,
      status: 'success',
      suggestions: [{ id: 'technology', text: 'technology' },
        { id: 'Andela', text: 'Andela' }],
      tagInformation: '',
      tags: '',
      title: 'some titled article'
    });
    wrapper.unmount();
  });

  it('should handle submit changes successfully', () => {
    const MockcreateUserArticleFn = jest.fn();
    const notification = {
      type: 'success',
      message: 'successfull'
    };
    const wrapper = mount(<ConnectedCreateArticle
      createUserArticle={MockcreateUserArticleFn}
      notification={notification}
    />);
    const titleInput = wrapper.find('#title').at(1);
    titleInput.instance().value = 'some titled article';
    titleInput.simulate('change');

    const descriptionInput = wrapper.find('#description').at(1);
    const val = 'brief description';
    descriptionInput.instance().value = val;
    descriptionInput.simulate('change');

    const editorInput = wrapper.find('Editor');
    const val2 = 'some content';
    editorInput.instance().value = val2;
    editorInput.simulate('change');

    const categoryInput = wrapper.find('#select-category');
    categoryInput.instance().value = 'health';
    categoryInput.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(MockcreateUserArticleFn.mock.calls[0][0]).toEqual({
      articleSlug: null,
      articleTags: [],
      category: 'health',
      content: 'Write your story here...',
      description: 'brief description',
      display: 'none',
      featuredImg: '',
      imgColor: 'black',
      imgStatus: 'upload a featured image',
      message: '',
      remainingTags: 5,
      status: 'success',
      suggestions: [{ id: 'technology', text: 'technology' },
        { id: 'Andela', text: 'Andela' }],
      tagInformation: '',
      tags: '',
      title: 'some titled article'
    });
    wrapper.unmount();
  });

  it('should add tags to the state', async () => {
    const wrapper = shallow(<ConnectedCreateArticle />);
    const instance = wrapper.instance();
    const tags = { id: 'some tag', text: 'some tag' };
    await instance.handleAddition(tags);
    expect(instance.state.tags).toMatch(tags.text);
  });

  it('should delete tags from the state', async () => {
    const wrapper = shallow(<ConnectedCreateArticle />);
    const instance = wrapper.instance();
    instance.state.articleTags = ['Andela', 'Technology', 'Health'];
    const accepted = ['Technology', 'Health'];
    await instance.handleDelete(0);
    expect(instance.state.articleTags).toEqual(accepted);
  });

  it('should handle drag operations on the tags', () => {
    const wrapper = shallow(<ConnectedCreateArticle />);
    const instance = wrapper.instance();
    instance.state.articleTags = ['Andela', 'Technology', 'Health'];
    const tag = 'Andela';
    const currentPosition = 0;
    const newPosition = 2;
    instance.handleDrag(tag, currentPosition, newPosition);
    const expected = ['Technology', 'Health', 'Andela'];
    expect(instance.state.articleTags).toEqual(expected);
  });

  it('should upload a featured image to cloudinary', () => {
    const wrapper = mount(<ConnectedCreateArticle />);
    const featuredImage = wrapper.find('#featuredImg');
    featuredImage.value = 'img.jpg';
    featuredImage.simulate('change');
    expect(featuredImage.value).toEqual('img.jpg');
    wrapper.unmount();
  });
});
