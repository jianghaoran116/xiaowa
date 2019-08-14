/* eslint-disable import/prefer-default-export */
/**
 * @file utils
 */

export const reuqest = (params) => {
  const requestParams = {
    ...params,
    method: (params.method && params.method.toUpperCase()) || 'GET',
  };

  return fetch(
    requestParams.url,
    requestParams,
  )
    .then(res => res.json());
};
