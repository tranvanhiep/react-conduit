import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createArticle, updateArticle } from '../actions/article';
import ErrorsList from './common/ErrorsList';
import { redirectToUrl } from '../actions/common';
import { unloadEditor, loadEditor, updateFieldEditor } from '../actions/editor';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { submitted, article } = nextProps;

    if (submitted) {
      const { slug } = article;
      nextProps.redirectToUrl(`/article/${slug}`);
    }

    return null;
  }

  componentDidMount() {
    const {
      match: {
        params: { slug },
      },
    } = this.props;

    if (slug) {
      this.props.loadEditor(slug);
    }
  }

  componentWillUnmount() {
    this.props.unloadEditor();
  }

  onChange = key => event => {
    event.preventDefault();
    const value = event.currentTarget.value;

    if (key === 'tagInput') {
      this.setState(state => ({ ...state, tagInput: value }));
    }

    this.props.updateFieldEditor({ key, value });
  };

  addTag = event => {
    const {
      article: { tagList },
    } = this.props;
    const currentTag = event.currentTarget.value.trim();

    if (event.key === 'Enter') {
      if (currentTag && !tagList.some(tag => tag === currentTag)) {
        tagList.push(currentTag);
        this.props.updateFieldEditor({ key: 'tagList', value: tagList });
      }

      this.setState(state => ({ ...state, tagInput: '' }));
    }
  };

  removeTag = currentTag => event => {
    event.preventDefault();
    const {
      article: { tagList },
    } = this.props;

    this.props.updateFieldEditor({
      key: 'tagList',
      value: tagList.filter(tag => tag !== currentTag),
    });
  };

  submit = event => {
    event.preventDefault();
    const {
      match: {
        params: { slug },
      },
      article: { title, description, body, tagList },
    } = this.props;

    if (slug) {
      this.props.updateArticle({ slug, title, description, body, tagList });
    } else {
      this.props.createArticle({ title, description, body, tagList });
    }
  };

  render() {
    const {
      article: { title, description, body, tagList },
      inProgress,
      errors,
    } = this.props;
    const { tagInput } = this.state;
    const invalid = !title || !description || !body;

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ErrorsList errors={errors} />
              <form>
                <fieldset>
                  <fieldset className="form-group" disabled={inProgress}>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.onChange('title')}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={inProgress}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.onChange('description')}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled={inProgress}>
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.onChange('body')}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group" disabled={inProgress}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagInput}
                      onKeyPress={this.addTag}
                      onChange={this.onChange('tagInput')}
                    />
                    <div className="tag-list">
                      {tagList.map(tag => (
                        <span className="tag-default tag-pill" key={tag}>
                          <i className="ion-close-round" onClick={this.removeTag(tag)}></i>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={invalid || inProgress}
                    onClick={this.submit}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.editor,
});

export default connect(
  mapStateToProps,
  { createArticle, updateArticle, redirectToUrl, unloadEditor, loadEditor, updateFieldEditor }
)(Editor);
