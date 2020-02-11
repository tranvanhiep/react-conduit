import fetch from 'cross-fetch';

const API_ROOT = process.env.REACT_APP_API_ENDPOINT;

const encode = encodeURIComponent;

let token = null;

const setToken = _token => {
  token = _token;
};

const destroyToken = () => {
  token = null;
};

const options = (method, body = null) => {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    Object.assign(headers, { Authorization: `Token ${token}` });
  }

  if (body) {
    return { method, headers, body: JSON.stringify(body) };
  }

  return { method, headers };
};

const responseFn = async res => {
  const json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw json;
  }
};

const requests = {
  get: url => fetch(`${API_ROOT}${url}`, options('GET')).then(responseFn),
  post: (url, body) =>
    fetch(`${API_ROOT}${url}`, options('POST', body)).then(responseFn),
  put: (url, body) =>
    fetch(`${API_ROOT}${url}`, options('PUT', body)).then(responseFn),
  delete: url => fetch(`${API_ROOT}${url}`, options('DELETE')).then(responseFn),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  update: user => requests.put('/user', { user }),
};

const Profiles = {
  get: username => requests.get(`/profiles/${encode(username)}`),
  follow: username => requests.post(`/profiles/${encode(username)}/follow`),
  unfollow: username => requests.delete(`/profiles/${encode(username)}/follow`),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const omitSlug = article => ({ ...article, slug: undefined });

const Articles = {
  getArticles: config => {
    const {
      type,
      filters: { limit, offset, favorited, author, tag },
    } = config;
    if (type === 'feed') {
      return Articles.feed(limit, offset);
    } else if (author) {
      return Articles.byAuthor(limit, offset, author);
    } else if (favorited) {
      return Articles.favoritedBy(limit, offset, favorited);
    } else if (tag) {
      return Articles.byTag(limit, offset, tag);
    } else if (type === 'all') {
      return Articles.all(limit, offset);
    } else {
      return Promise.reject({
        errors: { body: ['Missing specific type of article'] },
      });
    }
  },
  all: (limit, offset) =>
    requests.get(`/articles?limit=${limit}&offset=${offset}`),
  byAuthor: (limit, offset, author) =>
    requests.get(
      `/articles?author=${encode(author)}&limit=${limit}&offset=${offset}`
    ),
  byTag: (limit, offset, tag) =>
    requests.get(
      `/articles?tag=${encode(tag)}&limit=${limit}&offset=${offset}`
    ),
  favoritedBy: (limit, offset, author) =>
    requests.get(
      `/articles?favorited=${encode(author)}&limit=${limit}&offset=${offset}`
    ),
  feed: (limit, offset) =>
    requests.get(`/articles/feed?limit=${limit}&offset=${offset}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug => requests.delete(`/articles/${slug}/favorite`),
  create: article => requests.post('/articles', { article }),
  get: slug => requests.get(`/articles/${slug}`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  delete: slug => requests.delete(`/articles/${slug}`),
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delele: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`),
};

export default {
  Auth,
  Profiles,
  Tags,
  Articles,
  Comments,
  setToken,
  destroyToken,
};
