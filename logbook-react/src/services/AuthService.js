import axios from 'axios';

// BaseURL
const client = axios.create({
    baseURL: "http:/localhost:3000/api",
})

export const fetchLogin = ({ username, password }) => {
    client.post('auth/signin', {
        username,
        password,
    })
        .then((res) => {
            return console.log(res.data)
        })
        .catch((e) => e.message)
}