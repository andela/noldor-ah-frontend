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
import Pagination from '../../presentational/home/Pagination/Pagination';
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      allArticles: {},
      page: 1
    };
    this.page = this.state.page;
    this.displayBanner = this.displayBanner.bind(this);
    this.pageRef = React.createRef();
    this.paginationList = React.createRef();
  }

  componentDidMount = () => {
    this.props.featureArticle();
    this.props.relateArticle();
    this.props.allArticle();
    this.setState({ allArticles: this.props.allArticle() });
  }

  handleClick = (e) => {
    let pageNo = this.state.page;
    if (e.target.classList[0] === 'pagination-link') {
      pageNo = parseInt(e.target.innerHTML, 10);
    } else {
      pageNo = e.target.classList[0] === 'pagination-next'
        ? (this.page + parseInt(1, 10)) : (this.page - parseInt(1, 10));
    }
    const pageList = this.paginationList.current.children;
    [...pageList].map(page => page.classList.remove('is-current'));
    e.target.classList.add('is-current');
    this.setState({ allArticles: this.props.allArticle(pageNo) });
    this.page = pageNo;
    this.setState({ ...this.state, page: pageNo });
    this.scrollToPageRef();
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

  scrollToPageRef = () => {
    window.scrollTo({
      top: this.pageRef.current.offsetTop,
      behavior: 'smooth'
    });
  }

  extremePages = (e) => {
    let pageNo = this.state.page;
    const pageList = this.paginationList.current.children;
    [...pageList].map(page => page.classList.remove('is-current'));
    if (e.target.className === 'pagination-link first') {
      pageNo = 1;
    } else {
      pageNo = parseInt(localStorage.getItem('message'), 10);
    }
    e.target.classList.add('is-current');
    this.setState({ allArticles: this.props.allArticle(pageNo) });
    this.page = pageNo;
    this.setState({ ...this.state, page: pageNo });
    this.scrollToPageRef();
  }

  render() {
    const { featuredArticle, relatedArticle, allArticles } = this.props;
    if (featuredArticle.isLoading !== false && relatedArticle.isLoading !== false) {
      return <Loading />;
    }
    return (
      <div>
        <ToastContainer />
        <section className="feat-section">
          <CategoryList />
          <FeaturedArticle article={featuredArticle.article} read={this.viewArticle} />
        </section>
        <section ref={this.pageRef} className="section">
          <div className="container is-mt3 ">
            <div className="columns is-multiline ">
              {allArticles
                .map((article, index) => (<AllArticles key={index}
                  article={article}
                  read={this.viewArticle}
                  bookmark={this.bookmarkArticle}
                />))}
            </div>
            <nav className="pagination is-rounded is-pulled-right"
              role="navigation" aria-label="pagination" >
              <Pagination
                onClick={this.handleClick}
                isVisible={this.state.page}
                extremePages={this.extremePages}
                reference={this.paginationList}
              />
            </nav>
          </div>
        </section>
        {this.displayBanner()}
        <section className="section related-article-head">
          <h1 className="related-article-title has-text-weight-bold">Top Articles</h1>
          <div className="container ">
            <div className="columns footer-article">
              {relatedArticle.articles
                .map((x, index) => (<RelatedArticle
                  key={index} article={x}
                  read={this.viewArticle}
                />))}
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
