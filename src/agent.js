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

const request = (method, url, body = null) => {
  if (body) {
    return superagent[method](`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody);
  }

  return superagent[method](`${API_ROOT}${url}`)
    .use(tokenPlugin)
    .then(responseBody);
};

const requests = {
  get: url => request('get', url),
  post: (url, body) => request('post', url, body),
  put: (url, body) => request('put', url, body),
  delete: url => request('del', url),
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
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

const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;

const Articles = {
  all: limitCount => page => requests.get(`/articles?${limit(limitCount, page)}`),
  byAuthor: (author, limitCount) => page =>
    requests.get(`/articles?author=${encode(author)}&${limit(limitCount, page)}`),
  byTag: (tag, limitCount) => page =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(limitCount, page)}`),
  favoritedBy: (author, limitCount) => page =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(limitCount, page)}`),
  feed: limitCount => page => requests.get(`/articles/feed?${limit(limitCount, page)}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug => requests.delete(`/articles/${slug}/favorite`),
  create: article => requests.post('/articles', { article }),
  get: slug => requests.get(`/articles/${slug}`),
  update: article => requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  delete: slug => requests.delete(`/articles/${slug}`),
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delele: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`),
};

export default { Auth, Profiles, Tags, Articles, Comments, setToken };
