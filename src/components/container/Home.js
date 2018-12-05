import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeaturedArticle from '../presentation/Home/FeaturedArticle';
import AllArticle from '../presentation/Home/AllArticles';
import Banner from '../presentation/Home/Banner';
import RelatedArticle from '../presentation/Home/RelatedArticles';
import CategoryList from '../presentation/Home/CategoryList';
import Pagination from '../presentation/Home/Pagination';
import { loadFeatureArticle } from '../../actions/featureArticleAction';
import { loadRelatedArticles } from '../../actions/relatedArticlesAction';
import { loadAllArticle } from '../../actions/allArticleAction';
import './style/home.scss';


class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      featuredArticle: {},
      allArticles: {}

    };
  }

  componentDidMount = () => {
    this.props.featureArticle();
    this.props.relatedArticle();
    this.props.allArticle();
    console.log('runing..');
    this.setState({ featuredArticle: this.props.featureArticle() });
    this.setState({ allArticles: this.props.allArticle() });
  }

  render() {
    // console.log(this.props.featuredArticle);
    return (
      <div>
        <section className="feat-section">
          <CategoryList />

          <FeaturedArticle article = {this.props.featuredArticle}/>

        </section>

        <section className="section">
          <div className="container is-mt3 ">
            <div className="columns is-multiline ">
              <AllArticle articles = {this.props.allArticles}/>
            </div>
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
              <Pagination onClick={this.onClickNext} />
            </nav>
          </div>
        </section>
        <Banner />
        <section className="section ">
          <div className="container ">
            <div className="columns footer-article">
              <RelatedArticle />
            </div>
          </div>
        </section>
      </div>


    );
  }
}

Home.propType = {
  featuredArticle: PropTypes.object.isRequired,
  allArticles: PropTypes.object.isRequired
};

/**
 * @description - mapStateToProps
 * @param { object } state
 * @param { object } ownProp
 * @returns { object } object
*/

// eslint-disable-next-line require-jsdoc
function mapStateToProps(state, ownProp) {
  // articleId = ownProp.params.id
// state can be formatted here
  console.log(state);
  return {
    featuredArticle: state.featureArticleReducer,
    allArticles: state.allArticleReducer,
    relatedArticle: state.relatedArticleReducer
  };
}

const mapDispatchToProps = {
  featureArticle: () => loadFeatureArticle(),
  relatedArticle: () => loadRelatedArticles(),
  allArticle: () => loadAllArticle()
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
