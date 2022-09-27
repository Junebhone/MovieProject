import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '91ab5efb121db7d5f28848458f3af2be',
  },
});
