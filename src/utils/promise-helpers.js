export const fulfilHandler = (type, dispatch, rest) => res => {
  dispatch({ type, payload: res, ...rest });
  return Promise.resolve();
};

export const rejectHandler = (type, dispatch, rest) => err => {
  const { errors } = err;
  dispatch({ type, errors, ...rest });
  return Promise.reject();
};
