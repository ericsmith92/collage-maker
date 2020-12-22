import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: 'Client-ID e9cafbdb4e7383f0344aac1d1ac6710a5b36b9d733d3975e14a12d0143484927'
    }
});
