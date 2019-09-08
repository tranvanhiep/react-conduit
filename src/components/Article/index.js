import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleMeta from '../common/ArticleMeta';
import { loadArticle, unloadArticle, addComment } from '../../actions/article';
import FavoriteButton from '../common/FavoriteButton';
import FollowButton from '../common/FollowButton';
import { ARTICLE_PAGE } from '../../constants';
import CommentList from './CommentList';
import marked from 'marked';
import ErrorsList from '../common/ErrorsList';

class Article extends Component {
  componentDidMount() {
    const {
      params: { slug },
    } = this.props.match;
    this.props.loadArticle(slug);
  }

  componentWillUnmount() {
    this.props.unloadArticle();
  }

  onTextareaChange = event => {
    event.preventDefault();
    this.commentContent = event.currentTarget.value;
  };

  submit = event => {
    const {
      article: { slug },
    } = this.props;
    event.preventDefault();
    this.props.addComment(slug, this.commentContent);
    this.commentContent = '';
  };

  render() {
    const { article, currentUser, commentErrors } = this.props;

    if (!article) {
      return null;
    }

    const {
      slug,
      title,
      description,
      body,
      tagList,
      createdAt,
      favorited,
      favoritesCount,
      author,
    } = article;
    const { username, following } = author;
    const markup = { __html: marked(body, { sanitize: true }) };

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{title}</h1>
            <ArticleMeta createdAt={createdAt} author={author}>
              <FollowButton username={username} following={following}></FollowButton>
              &nbsp;
              <FavoriteButton favorited={favorited} slug={slug} from={ARTICLE_PAGE}>
                {favorited ? 'Unfavorite' : 'Favorite'} Article ({favoritesCount})
              </FavoriteButton>
            </ArticleMeta>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <h2 id="introducing-ionic">{description}</h2>
              <p dangerouslySetInnerHTML={markup}></p>
            </div>
            <ul className="tag-list">
              {tagList.length &&
                tagList.map((tag, idx) => (
                  <li className="tag-default tag-pill tag-outline" key={`${tag}-${idx}`}>
                    {tag}
                  </li>
                ))}
            </ul>
          </div>

          <hr />

          <div className="article-actions">
            <ArticleMeta createdAt={createdAt} author={author}>
              <FollowButton username={username} following={following}></FollowButton>
              &nbsp;
              <FavoriteButton favorited={favorited} slug={slug} from={ARTICLE_PAGE}>
                {favorited ? 'Unfavorite' : 'Favorite'} Article ({favoritesCount})
              </FavoriteButton>
            </ArticleMeta>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <ErrorsList errors={commentErrors} />
              <form className="card comment-form" onSubmit={this.submit}>
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows="3"
                    value={this.commentContent}
                    onChange={this.onTextareaChange}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src={currentUser.image}
                    alt={currentUser.username}
                    className="comment-author-img"
                  />
                  <button className="btn btn-sm btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>

              <CommentList slug={slug} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { loadArticle, unloadArticle, addComment }
)(Article);
