import axios from 'axios';

//change to an environment url eventually
const customAxios = axios.create({
  /* eslint-disable-next-line */
  baseURL: process.env.REACT_APP_API_URL,
});

customAxios.defaults.headers.common['Content-Type'] = 'application/json'
customAxios.defaults.headers.post['Content-Type'] = 'application/json'
customAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const setAuthHeader = (token) => {
  customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
customAxios.interceptors.response.use(response => {
  if (response.config) console.info(`[AXIOS]:${response.config.method.toUpperCase()}:${response.config.url}`, {config: response.config, data: response.data});
  return { ok: true, status: response.status, data: (response || {}).data }
}, error => {
  console.log({error})
  return { ok: false, error, errMessage: error.response.statusText, data: (error.response || {}).data }
});

export { setAuthHeader };

customAxios.origin = axios;
export default customAxios;