import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCategoriesList } from '../../../redux/actions/categoriesList/categoriesHeader';


export class CategoriesList extends Component {
  componentDidMount =() => {
    this.props.categoryList();
  }

  render() {
    const {
      categories
    } = this.props;
    return (
      <div className="container is-mt1 is-pb1">
        <div className="categories has-text-centered is-pt1">
          <ul>
            { categories.slice(0, 6).map((category, key) => (<li key={key}
              className="categories-list is-capitalized">
              {category}</li>))}
            <li className="is-paddingless">
              <button className=" categories-button theme-background">
          MORE</button></li>
          </ul>
        </div>

      </div>
    );
  }
}
CategoriesList.propTypes = {
  categories: PropTypes.array,
  categoryList: PropTypes.func
};

export const mapStateToProps = (state) => {
  return {
    categories: state.categoriesListReducer.categories
  };
};
export const mapDispatchToProps = {
  categoryList: () => loadCategoriesList(),
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
