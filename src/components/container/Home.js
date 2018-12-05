/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeaturedArticle from '../presentation/Home/FeaturedArticle';
import AllArticles from '../presentation/Home/AllArticles';
import Banner from '../presentation/Home/Banner';
import RelatedArticle from '../presentation/Home/RelatedArticles';
import CategoryList from '../presentation/Home/CategoryList';
import Pagination from '../presentation/Home/Pagination';
import './style/home.scss';
import { loadFeatureArticle } from '../../actions/featureArticleAction';
import { loadRelatedArticles } from '../../actions/relatedArticlesAction';
import { loadAllArticles } from '../../actions/allArticleAction';


class Home extends Component {
  constructor(props, context, page = 1) {
    super(props, context, page);
    this.state = {
      featuredArticle: {},
      allArticles: {},
      page: 1
    };
    this.page = page;
  }

  componentDidMount = async () => {
    this.props.featureArticle();
    this.props.relatedArticle();
    this.props.allArticle();
    this.setState({ featuredArticle: this.props.featureArticle() });
    this.setState({ allArticles: this.props.allArticle() });
  }

  handleClick = (e) => {
    const pageNo = e.target.className === 'pagination-next' ? (this.page += 1) : (this.page -= 1);
    this.props.allArticle(pageNo);
    this.setState({ allArticles: this.props.allArticle(pageNo) });
    this.setState({ ...this.state, page: pageNo });
  }

  render() {
    const { featuredArticle, allArticles } = this.props;
    return (
      <div>
        <section className="feat-section">
          <CategoryList />
          <FeaturedArticle article={featuredArticle}/>
        </section>
        <section className="section">
          <div className="container is-mt3 ">
            <div className="columns is-multiline ">
              {allArticles.map((article, index) => <AllArticles key={index} article={article} />)}
            </div>
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination" >
              <Pagination onClick={this.handleClick} isVisible={this.state.page} />
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
  featuredArticle: PropTypes.func.isRequired,
  allArticles: PropTypes.func.isRequired
};

/**
 * @description - mapStateToProps
 * @param { object } state
 * @param { object } ownProp
 * @returns { object } object
*/
function mapStateToProps(state) {
  return {
    featuredArticle: state.featureArticleReducer,
    relatedArticle: state.featureRelatedReducer,
    allArticles: state.allArticleReducer
  };
}

const mapDispatchToProps = {
  featureArticle: () => loadFeatureArticle(),
  relatedArticle: () => loadRelatedArticles(),
  allArticle: page => loadAllArticles(page)
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
