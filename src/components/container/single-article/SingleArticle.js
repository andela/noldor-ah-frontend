/* eslint-disable max-len */
import React, { Component } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ToastContainer, notifier } from '../../../utilities/toast/notifier';
import SingleArticle from '../../presentational/article/singleArticle';
import { loadAnArticle } from '../../../redux/actions/single-article/singleArticleAction';
import CategoryList from '../../common/category-list/CategoryList';
import '../styles/SingleArticle.scss';
import Loading from '../../common/loader/Loader';

import '../../presentational/styles/comment.scss';
import { rateArticles } from '../../../redux/actions/article-rating/articleRating';
import { getUserRating } from '../../../redux/actions/article-rating/userArticleRating';

export class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: {}
    };
    this.rate = 0;
    this.articleId = '';
    this.handleOnChangeEvent = this.handleOnChangeEvent.bind(this);
  }

  componentDidMount = () => {
    const { slug } = this.props;
    this.props.singleArticle(slug);
  }

  async handleOnChangeEvent(rateValue) {
    const id = this.articleId;
    const data = {
      id,
      rateValue
    };
    const response = await this.props.rateAnArticle(data);
    if (response.type === 'RATE_ARTICLE_SUCCESS') {
      notifier('Article rated succesfully', 'success');
    } else {
      notifier(response.error.data.message, 'failure');
    }
  }


  render() {
    const { anArticle } = this.props;
    const { ratings } = anArticle.article;
    this.articleId = anArticle.article.id;

    if (this.articleId) {
      this.props.userRate(this.articleId);
    }

    if (anArticle.isLoading !== false) {
      return <Loading />;
    }
    return (
      <div>
        <ToastContainer />
        <section >
          <CategoryList />
          <SingleArticle article={anArticle.article}
            eventHandler={this.handleOnChangeEvent}
            averageRate={ratings}
            userRating={this.rate}
          />
        </section>
      </div>

    );
  }
}

SinglePage.propTypes = {
  history: PropTypes.object,
  slug: PropTypes.string,
  anArticle: PropTypes.object.isRequired,
  singleArticle: PropTypes.func.isRequired,
  rateAnArticle: PropTypes.func,
  userRate: PropTypes.func
};


export const mapStateToProps = (state, ownProp) => {
  return {
    slug: ownProp.match.params.slug,
    anArticle: state.anArticle,
    rateArticle: state.articleRating,
    userRates: state.userRatings
  };
};

export const mapDispatchToProps = {
  singleArticle: slug => loadAnArticle(slug),
  rateAnArticle: data => rateArticles(data),
  userRate: articleId => getUserRating(articleId)
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
