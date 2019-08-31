import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;

const responseBody = res => res.body;

let token = null;

const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Token ${token}`);
  }
};

const setToken = _token => {
  token = _token;
};

const makeRequest = (method, url) =>
  superagent[method](url)
    .use(tokenPlugin)
    .then(responseBody);

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  delete: url =>
    superagent
      .delete(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  current: requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user }),
};

const Profiles = {
  get: username => requests.get(`/profiles/${username}`),
  follow: username => requests.post(`/profiles/${username}/follow`),
  unfollow: username => requests.delete(`/profiles/${username}/follow`),
};

const Tags = {
  getAll: () => requests.get('/tags'),
};

const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;

const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) => requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  favoritedBy: (author, page) =>
    requests.get(`/article?favorited=${encode(author)}&${limit(5, page)}`),
  feed: page => requests.get(`/articles/feed?${limit(10, page)}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug => requests.delete(`/articles/${slug}/favorite`),
  create: article => requests.post('/articles', { article }),
  get: slug => requests.get(`/articles/${slug}`),
  update: article => requests.put(`/articles/${article.slug}`, { article }),
  delete: slug => requests.delete(`/articles/${slug}`),
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  create: slug => requests.post(`/articles/${slug}/comments`),
  delele: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`),
};

export default { Auth, Profiles, Tags, Articles, Comments, setToken };
