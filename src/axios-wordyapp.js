import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thawing-ocean-88577.herokuapp.com/api/'
});

export default instance;
