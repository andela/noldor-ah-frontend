/* eslint-disable max-len */
import React, { Component } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SingleArticle from '../../presentational/article/singleArticle';
import { loadAnArticle } from '../../../redux/actions/single-article/singleArticleAction';
import CategoryList from '../../presentational/category-list/CategoryList';
import Loading from '../../common/loader/Loader';

import './style.scss';

export class SinglePage extends Component {
    componentDidMount = () => {
      // window.scrollTo(0, 0);
      const { slug } = this.props;
      this.props.singleArticle(slug);
    }

    render() {
      const { anArticle } = this.props;
      if (anArticle.isLoading !== false) {
        return <Loading />;
      }

      return (

        <section >

          <CategoryList />
          <SingleArticle article={anArticle.article} />
        </section>
      );
    }
}

SinglePage.propTypes = {
  history: PropTypes.object,
  slug: PropTypes.string,
  anArticle: PropTypes.object.isRequired,
  singleArticle: PropTypes.func.isRequired

};


export const mapStateToProps = (state, ownProp) => {
  // console.log(state)
  return {
    slug: ownProp.match.params.slug,
    anArticle: state.anArticle
  };
};

export const mapDispatchToProps = {
  singleArticle: slug => loadAnArticle(slug)
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
