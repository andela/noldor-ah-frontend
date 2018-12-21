import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  searchRequest, getCategories, setKeyword,
  getAuthors,
} from '../../../redux/actions/search/searchAction';
import Loader from '../../common/loader/Loader';
import SearchCard from '../../presentational/search-card/SearchCard';
import '../styles/Search.scss';

const baseURL = 'https://noldor-ah-backend-staging.herokuapp.com/api/v1/';

const mapStateToProps = state => ({
  loading: state.search.loading,
  results: state.search.results,
  request: state.search.request,
  categories: state.search.categories,
  authors: state.search.authors,
});

const mapDispatchToProps = dispatch => ({
  searchFor: (url, request) => dispatch(searchRequest(url, request)),
  getCategories: url => dispatch(getCategories(url)),
  getAuthors: url => dispatch(getAuthors(url)),
  updateKeyword: keywords => dispatch(setKeyword(keywords)),
});

export class ConnectedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      authors: [],
      categoryFilter: null,
      authorFilter: null,
    };

    this.sidebar = React.createRef();
    this.searchBar = React.createRef();
    this.authorSelect = React.createRef();
    this.categoryList = React.createRef();
  }

  componentDidMount = async () => {
    await this.renderCategories();
    this.renderAuthors();

    const {
      categoryFilter, authorFilter
    } = this.state;

    this.search(categoryFilter, authorFilter);

    try {
      this.searchBar.current.value = this.props.request.keywords || '';
    } catch (error) { /* do nothing */ }
  }

  toggleFilters = (sidebar, window) => {
    window.scrollTo(150, 0);

    sidebar.current.classList.toggle('show');
  }

  renderCategories = async () => {
    await this.props.getCategories(`${baseURL}/categories`);
    const categoriesArray = [];
    await this.props.categories.map(category => (
      categoriesArray.push(<a onClick={this.addCategory} key={category}>{category}</a>)
    ));

    this.setState({
      categories: categoriesArray,
    });
  }

  renderAuthors = async () => {
    await this.props.getAuthors(`${baseURL}/users`);
    const authorsArray = [];
    await this.props.authors.map(author => (
      authorsArray.push(<option key={author.id} value={author.username}>{author.username}</option>)
    ));

    this.setState({
      authors: authorsArray,
    });
  }

  addCategory = async (event) => {
    event.preventDefault();

    const categories = this.categoryList.current.children;

    [...categories].map(category => category.classList.remove('active-category'));

    event.target.classList.add('active-category');

    switch (event.target.innerText) {
    case 'All categories':
      await this.setState({ categoryFilter: null });
      break;

    default:
      await this.setState({
        categoryFilter: event.target.innerText,
      });
    }

    const {
      categoryFilter, authorFilter
    } = this.state;

    this.search(categoryFilter, authorFilter);
  }

  addAuthor = async () => {
    await this.setState({
      authorFilter: this.authorSelect.current.value,
    });

    const {
      categoryFilter, authorFilter
    } = this.state;

    this.search(categoryFilter, authorFilter);
  }

  search = (categoryFilter, authorFilter) => {
    let url;

    if (!categoryFilter && !authorFilter) {
      url = `${baseURL}search`;
    } else if (categoryFilter && !authorFilter) {
      url = `${baseURL}search?category=${categoryFilter}`;
    } else if (!categoryFilter && authorFilter) {
      url = `${baseURL}search?author=${authorFilter}`;
    } else {
      url = `${baseURL}search?category=${categoryFilter}&author=${authorFilter}`;
    }

    this.props.searchFor(url, this.props.request);
  }

  renderResults = () => {
    if (this.props.loading) return <Loader />;

    if (!this.props.results.length) {
      return <div className="no-search-results">No results found</div>;
    }

    const displayResults = this.props.results.map((article) => {
      article.date = Date(article.createdAt).toString().slice(0, 15);

      return <SearchCard key={article.id} article={article} />;
    });

    return displayResults;
  }

  searchInput = async (event) => {
    if (event.key === 'Enter') {
      const request = {
        keywords: this.searchBar.current.value,
      };

      await this.props.updateKeyword(request);
      this.search();
    }
  }

  clearAuthorFilter = async () => {
    this.authorSelect.current.selectedIndex = 0;
    await this.setState({
      authorFilter: ''
    });

    this.search(this.state.categoryFilter, this.state.authorFilter);
  }

  render() {
    const { categories, authors } = this.state;
    const { sidebar } = this;

    return (
      <div className="search-page-container">
        <button
          type="button"
          className="expand-filters"
          onClick={this.toggleFilters.bind(this, sidebar, window)}
        >
          Filters
        </button>

        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Type and hit enter..."
            onKeyPress={this.searchInput}
            ref={this.searchBar}
          />
        </div>

        <div className="search-container">
          <div ref={this.sidebar} className="sidebar">
            <h2 className="sidebar-h2">Refine Results</h2>

            <div className="sidebar-category">
              <h3 className="sidebar-h3">Refine by category</h3>
              <p className="sidebar-p">To clear this filter, choose "All categories"</p>
              <ul ref={this.categoryList}>
                <a
                  className="active-category"
                  onClick={this.addCategory}
                  key="all"
                >All categories</a>
                {categories}
              </ul>
            </div>

            <div className="sidebar-authors">
              <h3 className="sidebar-h3">Refine by author</h3>
              <select
                ref={this.authorSelect}
                className="sidebar-select"
                onChange={this.addAuthor}
              >
                <option key="select-auth" className="select-author" value="">Select Author:</option>
                {authors}
              </select>
              <button
                className="remove-author-filter"
                onClick={this.clearAuthorFilter}
              >
                Remove this filter
              </button>
            </div>
          </div>

          <div className="search-results">
            {this.renderResults()}
          </div>

        </div>
      </div>
    );
  }
}

ConnectedSearch.propTypes = {
  results: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  searchFor: propTypes.func.isRequired,
  updateKeyword: propTypes.func.isRequired,
  request: propTypes.object,
  authors: propTypes.array,
  getAuthors: propTypes.func.isRequired,
  categories: propTypes.array,
  getCategories: propTypes.func.isRequired,
};

ConnectedSearch.defaultProps = {
  request: '',
  authors: [],
  categories: [],
};

const Search = connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);

export default Search;
