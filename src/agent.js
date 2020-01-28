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
  post: (url, body) => fetch(`${API_ROOT}${url}`, options('POST', body)).then(responseFn),
  put: (url, body) => fetch(`${API_ROOT}${url}`, options('PUT', body)).then(responseFn),
  delete: url => fetch(`${API_ROOT}${url}`, options('DELETE')).then(responseFn)
};

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  update: user => requests.put('/user', { user })
};

const Profiles = {
  get: username => requests.get(`/profiles/${encode(username)}`),
  follow: username => requests.post(`/profiles/${encode(username)}/follow`),
  unfollow: username => requests.delete(`/profiles/${encode(username)}/follow`)
};

const Tags = {
  getAll: () => requests.get('/tags')
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
  delete: slug => requests.delete(`/articles/${slug}`)
};

const Comments = {
  get: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delele: (slug, id) => requests.delete(`/articles/${slug}/comments/${id}`)
};

export default { Auth, Profiles, Tags, Articles, Comments, setToken, destroyToken };
