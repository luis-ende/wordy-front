import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wordy-back.herokuapp.com/api/'
});

export default instance;
