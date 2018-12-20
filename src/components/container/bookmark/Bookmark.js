import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewBookmark } from '../../../redux/actions/view-bookmark/viewBookmarkAction';
import ViewBookmark from '../../presentational/view-bookmark/bookmark';
import Loading from '../../common/loader/Loader';
import '../styles/Bookmark.scss';

export class Bookmark extends Component {
  componentDidMount = () => {
    this.props.viewAllBookmark();
  }

  viewArticle = (articleId) => {
    console.log(articleId)
    const {
      history
    } = this.props;
    history.push(`/${articleId}`);
  }

  render() {
    const { allBookmarks } = this.props;
    if (allBookmarks.isLoading !== false) {
      return (<div className="container">
        <Loading />
      </div>);
    }
    return (
      <div>
        <section className="section">
          <div className="container">
            { allBookmarks.bookmarks.map((article, index) => <ViewBookmark key={index} article={article} read={this.viewArticle} />)}
          </div>
        </section>
      </div>

    );
  }
}
export const mapStateToProps = (state) => {
  return {
    allBookmarks: state.viewBookmarkReducer
  };
};

export const mapDispatchToProps = {
  viewAllBookmark: () => viewBookmark()
};


export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);
