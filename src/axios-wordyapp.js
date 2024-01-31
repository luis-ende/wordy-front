import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://wordy.test/api/'
});

export default instance;
