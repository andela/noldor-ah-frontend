import { loadAllArticles } from './all-article/allArticleAction';
import { loadFeatureArticle } from './feature-article/featureArticleAction';
import loginAction from './login/loginAction';
import notificationAction from './notification/notificationAction';
import { loadRelatedArticles } from './related-articles/relatedArticlesAction';
import signupAction from './signup/signupAction';
import { loadCategoriesList } from './categoriesList/categoriesHeader';

export default {
  loadAllArticles,
  loadFeatureArticle,
  loginAction,
  notificationAction,
  loadRelatedArticles,
  signupAction,
  loadCategoriesList
};
