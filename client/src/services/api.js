import axios from 'axios'

const api=axios.create({
    baseURL:'https://interview-prep-backend-34tz.onrender.com/',
    headers:{
        'Content-Type':'application/json',
    },
});

export default api;