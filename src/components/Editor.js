import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createArticle, updateArticle } from '../actions';
import ErrorsList from './common/ErrorsList';
import { unloadEditor, loadEditor } from '../actions';
import PropTypes from 'prop-types';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      tagInput: '',
      tagList: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match && match.params && match.params.slug) {
      const {
        params: { slug },
      } = match;
      this.props.loadEditor(slug).then(() => {
        const {
          article: { title, description, body, tagList },
        } = this.props;
        this.setState(state => ({
          ...state,
          title,
          description,
          body,
          tagList,
        }));
      });
    }
  }

  componentWillUnmount() {
    this.props.unloadEditor();
  }

  onChange = field => event => {
    event.preventDefault();
    const value = event.currentTarget.value;

    this.setState(state => ({ ...state, [field]: value }));
  };

  addTag = event => {
    const currentTag = event.currentTarget.value.trim();

    if (event.key === 'Enter') {
      this.setState(state => {
        const { tagList } = state;

        if (currentTag && !tagList.some(tag => tag === currentTag)) {
          tagList.push(currentTag);
          return { ...state, tagList, tagInput: '' };
        }

        return state;
      });

      this.setState(state => ({ ...state, tagInput: '' }));
    }
  };

  removeTag = currentTag => event => {
    event.preventDefault();

    this.setState(state => ({
      ...state,
      tagList: state.tagList.filter(tag => tag !== currentTag),
    }));
  };

  submit = event => {
    event.preventDefault();
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    const { title, description, body, tagList } = this.state;

    if (slug) {
      this.props.updateArticle({ slug, title, description, body, tagList });
    } else {
      this.props.createArticle({ title, description, body, tagList });
    }
  };

  render() {
    const { inProgress, errors } = this.props;
    const { title, description, body, tagList, tagInput } = this.state;
    const invalid = !title || !description || !body;

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ErrorsList errors={errors} />
              <form>
                <fieldset disabled={inProgress}>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.onChange('title')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.onChange('description')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.onChange('body')}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
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
                          <i
                            className="ion-close-round"
                            onClick={this.removeTag(tag)}
                          ></i>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={invalid}
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

Editor.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.array,
  }),
  inProgress: PropTypes.bool,
  errors: PropTypes.shape({
    body: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default connect(mapStateToProps, {
  createArticle,
  updateArticle,
  unloadEditor,
  loadEditor,
})(withRouter(Editor));
