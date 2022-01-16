import axios from "axios";

const loginURL = 'http://localhost:3000/api/auth/signin'

export const userLogin = (formData) => {
  return new Promise(async  (resolve, reject) => {
    try {
        const res = await axios.post(loginURL, formData)
        console.log(res)
        resolve(res.data)
    } catch (e) {
        console.log(e.message)
        reject(e)
    }
  });
};
