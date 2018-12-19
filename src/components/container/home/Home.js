/* eslint-disable max-len */
import React, { Component } from 'react';

// third-party libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// components
import { ToastContainer, notifier } from '../../../utilities/toast/notifier';
import {
  Banner, RelatedArticle, FeaturedArticle, AllArticles
} from '../../presentational';
import CategoryList from '../../common/category-list/CategoryList';
import Pagination from '../../presentational/home/Pagination';
import { loadFeatureArticle } from '../../../redux/actions/feature-article/featureArticleAction';
import { loadRelatedArticles } from '../../../redux/actions/related-articles/relatedArticlesAction';
import { loadAllArticles } from '../../../redux/actions/all-article/allArticleAction';
import Loading from '../../common/loader/Loader';
import isLoggedIn from '../../../utilities/is-logged-in/isLoggedIn';
import 'react-toastify/dist/ReactToastify.css';

// styles
import '../styles/Home.scss';
import { addBookmark } from '../../../redux/actions/bookmark/addBookmark';


export class Home extends Component {
  constructor(props, context, page = 1) {
    super(props, context, page);
    this.state = {
      allArticles: {},
      page: 1
    };
    this.page = page;
  }

  componentDidMount = () => {
    this.props.featureArticle();
    this.props.relateArticle();
    this.props.allArticle();
    this.setState({ allArticles: this.props.allArticle() });
  }

  handleClick = (e) => {
    const pageNo = e.target.className === 'pagination-next' ? (this.page += 1) : (this.page -= 1);
    this.props.allArticle(pageNo);
    this.setState({ allArticles: this.props.allArticle(pageNo) });
    this.setState({ ...this.state, page: pageNo });
  }

  viewArticle = (articleId) => {
    const {
      history
    } = this.props;
    history.push(`/${articleId}`);
  }

   bookmarkArticle = async (slug) => {
     await this.props.bookmark(slug);
     const message = this.props.bookmarkMessage;
     if (message) notifier(message, 'success');
   }

   displayBanner() {
     if (isLoggedIn()) {
       return false;
     }
     return <Banner />;
   }

   render() {
     const { featuredArticle, relatedArticle, allArticles } = this.props;
     if (featuredArticle.isLoading !== false && relatedArticle.isLoading !== false) {
       return <Loading />;
     }
     return (
       <div>
         <ToastContainer/>
         <section className="feat-section">
           <CategoryList />
           <FeaturedArticle article = {featuredArticle.article} read={this.viewArticle}/>
         </section>
         <section className="section">
           <div className="container is-mt3 ">
             <div className="columns is-multiline ">
               {allArticles.map((article, index) => <AllArticles key={index} article={article} read={this.viewArticle} bookmark={this.bookmarkArticle} />)}
             </div>
             <nav className="pagination is-rounded" role="navigation" aria-label="pagination" >

               <Pagination onClick={this.handleClick} isVisible={this.state.page} />
             </nav>
           </div>
         </section>
         {this.displayBanner()}
         <section className="section related-article-head">
           <h1 className="related-article-title has-text-weight-bold">Top Articles</h1>
           <div className="container ">
             <div className="columns footer-article">
               {relatedArticle.articles.map((x, index) => <RelatedArticle key={index} article={x} read={this.viewArticle} />)}
             </div>
           </div>
         </section>
       </div>
     );
   }
}

Home.propTypes = {
  featuredArticle: PropTypes.object.isRequired,
  featureArticle: PropTypes.func.isRequired,
  relateArticle: PropTypes.func.isRequired,
  relatedArticle: PropTypes.object.isRequired,
  allArticle: PropTypes.func.isRequired,
  allArticles: PropTypes.array.isRequired,
  history: PropTypes.object,
  bookmark: PropTypes.func,
  bookmarkMessage: PropTypes.string
};

export const mapStateToProps = (state) => {
  return {
    featuredArticle: state.featureArticleReducer,
    relatedArticle: state.relatedArticleReducer,
    allArticles: state.allArticleReducer,
    bookmarkMessage: state.addBookmarkReducer.message
  };
};

export const mapDispatchToProps = {
  featureArticle: () => loadFeatureArticle(),
  relateArticle: () => loadRelatedArticles(),
  allArticle: page => loadAllArticles(page),
  bookmark: slug => addBookmark(slug)
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
