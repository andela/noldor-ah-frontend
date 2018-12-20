import React, { Component } from 'react';
import Axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { debounce } from 'lodash';
import Input from '../../presentational/input/Input';
import Notification from '../../presentational/notification/Notification';
import {
  createArticleDraft,
  createArticle
} from '../../../redux/actions/create-article/createArticleAction';

import '../styles/createArticle.scss';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const categoryList = ['self-development', 'travel', 'health',
  'finance', 'relationships', 'science', 'technology', 'life'
];

export class ConnectedCreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      content: 'Write your story here...',
      featuredImg: '',
      category: '',
      tags: '',
      articleTags: [],
      articleSlug: null,
      suggestions: [
        { id: 'technology', text: 'technology' },
        { id: 'Andela', text: 'Andela' }
      ],
      remainingTags: 5,
      tagInformation: '',
      imgStatus: 'upload a featured image',
      imgColor: 'black',
      status: '',
      message: '',
      display: 'none',
    };
  }

handleChange = (event) => {
  this.setState({
    [event.target.id]: event.target.value,
    status: 'success',
    message: '',
    display: 'none',
  });
}

handleArticleChange = (event) => {
  this.setState({
    content: event.target.getContent(),
  });

  debounce(async () => {
    const article = { ...this.state };
    const { createUserArticleDraft, slug } = this.props;
    if (slug) {
      await this.setState({
        articleSlug: slug
      });
    }
    await createUserArticleDraft(article, slug);
    if (this.props.notification.type === 'error') {
      await this.setState({
        display: 'block',
        message: this.props.notification.message,
        status: this.props.notification.type,
      });
    } else {
      this.setState({
        status: 'success',
        successMessage: this.props.notification.message,
        display: 'none',
        articleSlug: slug,
      });
    }
  }, 1000)();
}

handleSubmit = async (event) => {
  event.preventDefault();
  const article = { ...this.state };
  const { createUserArticle } = this.props;
  await createUserArticle(article, this.state.articleSlug);
  const {
    history,
  } = this.props;
  if (this.props.notification.type === 'error') {
    this.setState({
      display: 'block',
      message: this.props.notification.message,
      status: this.props.notification.type,
    });
  } else {
    this.setState({
      status: 'success',
      message: this.props.notification.message,
      display: 'block',
    });
    return setTimeout(() => history.push(`${this.state.articleSlug}`), 500);
  }
}

handleDelete = async (i) => {
  const { articleTags } = this.state;
  const remTags = this.state.remainingTags + 1;
  const more = remTags === 1 ? 'more tag' : 'more tags';
  const message = remTags === 0 ? '5 tags picked' : `pick ${remTags} ${more}`;
  await this.setState({
    articleTags: articleTags.filter((tag, index) => index !== i),
    remainingTags: remTags,
    tagInformation: message,
  });
  const tags = this.state.articleTags.map(object => object.id).toString();
  this.setState({
    tags,
  });
}

handleAddition = async (tag) => {
  const remTags = this.state.remainingTags - 1;
  const more = remTags === 1 ? 'more tag' : 'more tags';
  const message = remTags === 0 ? '5 tags picked' : `pick ${remTags} ${more}`;
  if (remTags <= 5 && remTags !== -1) {
    await this.setState(state => ({
      articleTags: [...state.articleTags, tag],
      remainingTags: remTags,
      tagInformation: message,
    }));

    const tags = this.state.articleTags.map(object => object.id).toString();
    this.setState({
      tags,
    });
  }

  return this.setState({
    tagInformation: 'you can only pick 5 tags',
  });
}

handleDrag = (tag, currPos, newPos) => {
  const tags = [...this.state.articleTags];
  const newTags = tags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  this.setState({ articleTags: newTags });
}

uploadWidget = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('upload_preset', 'kvozp3sj');
  formData.append('file', file);
  this.setState({ imgStatus: 'uploading...' });
  Axios.post('https://api.cloudinary.com/v1_1/dstvcmycn/upload', formData)
    .then((response) => {
      return this.setState({
        featuredImg: response.data.secure_url,
        imgStatus: 'image uploaded',
        imgColor: 'white',
      });
    })
    .catch((error) => {
      return this.setState({ imgStatus: `${error.message}, try again` });
    });
}

handleCategoryChange = (event) => {
  return this.setState({
    category: event.target.value,
    status: 'success',
    message: '',
    display: 'none',
  });
}


render() {
  const {
    title,
    description,
    articleTags,
    suggestions,
    featuredImg,
    imgStatus,
    imgColor,
    tagInformation,
    status,
    message,
    display,
  } = this.state;
  return (
    <section className="section">
      <div className="container article-center">
        <Notification status={status} message={message} display={display} />
        <form className="article-form" onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column is-8">
              <div className="">
                <Input name="title"
                  id="title"
                  className=""
                  type="text"
                  value = {title}
                  onChange={this.handleChange}
                  placeholder = "Title..."
                  required
                />
                <Input name="description"
                  id="description"
                  className=""
                  type="text"
                  value = {description}
                  onChange= {this.handleChange}
                  placeholder = "Write a short intro to your article..."
                  required
                />
                <div id="editor">
                  <Editor apiKey="kob84554odwug7t84j2i4zluek2gckgeo7q5pkxz8yabim9h"
                    initialValue="<p>Write your story...</p>"
                    onChange={this.handleArticleChange}
                    init= {{
                      toolbar: `
                      undo redo | bold italic |
                      alignleft aligncenter alignright | code
                      `,
                      height: 400,
                      resize: true,
                      plugins: 'link image code',
                      paste_data_images: true,
                      inline: true,
                      images_upload_handler: (blobInfo, success, failure) => {
                        const formData = new FormData();
                        formData.append('upload_preset', 'kvozp3sj');
                        formData.append('file', blobInfo.blob(), blobInfo.filename());
                        Axios.post('https://api.cloudinary.com/v1_1/dstvcmycn/upload', formData)
                          .then((response) => {
                            return success(response.data.secure_url);
                          })
                          .catch((error) => {
                            return failure(error);
                          });
                      },
                      mobile: {
                        theme: 'mobile',
                        plugins: ['autosave', 'lists', 'autolink', 'image'],
                        toolbar: ['undo', 'bold', 'italic', 'styleselect',
                          'undo redo | styleselect | bold italic | link image',
                          'alignleft aligncenter alignright'
                        ]
                      },
                      statusbar: false,
                    }}
                  />
                </div>
              </div>

            </div>

            <div className="column is-4">
              <div className="right-partition">

                <div className="card-display" id= "featuredImg-container" style={{
                  backgroundImage: `url(${featuredImg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}>
                  <div id="upload">

                    <label htmlFor="featuredImg" >
                      <i className="fas fa-plus font-awesome" style={{
                        color: `${imgColor}`,
                      }} />
                    </label>
                    <p id="upload-text" style={{
                      color: `${imgColor}`
                    }}>{imgStatus}</p>

                    <input type="file" id="featuredImg" name="featuredImg"
                      onChange={this.uploadWidget} value="" ref="upload"
                      accept="image/*" hidden/>
                  </div>
                </div>

                <div className="tag-container">
                  <p className="tag-information">{tagInformation}</p>
                  <ReactTags tags={articleTags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder={tagInformation}
                    inline
                    classNames={{
                      tagInput: 'tag-input',
                      tagInputField: 'tag-input-field',
                      selected: 'selected-display',
                      tag: 'tag-items',
                      remove: 'remove-tag',
                      suggestions: 'suggestions-tag',
                      activeSuggestion: 'active-suggestion-tag'
                    }}
                  />
                  <p id="tag-instruction">Pick up to 5 tags and sepereate them with a comma</p>
                </div>

                <div className="card-display">
                  <div id="category-display">
                    <select id="select-category"
                      onChange={this.handleCategoryChange}
                      name="category">
                      <option value="">Please select a category</option>
                      { categoryList.map((list, index) => {
                        return <option key={index} value={list}>{list}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <button type="submit">Publish</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
}

ConnectedCreateArticle.propTypes = {
  notification: propTypes.object,
};

const mapStateToProps = state => ({
  slug: state.createArticle.slug,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  createUserArticle: (article, slug) => dispatch(createArticle(article, slug)),
  createUserArticleDraft: (article, slug) => dispatch(createArticleDraft(article, slug)),
});

const CreateArticle = connect(mapStateToProps, mapDispatchToProps)(ConnectedCreateArticle);

export default CreateArticle;
