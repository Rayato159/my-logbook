import axios from "axios";

const baseURL = 'http://localhost:3000/api/auth'

export const userLogin = (formData) => {
  return new Promise(async  (resolve, reject) => {
    try {
        const res = await axios.post(`${baseURL}/signin`, formData)
        resolve(res.data)
    } catch (e) {
        reject(e.response.data)
    }
  });
};

export const getUserInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${baseURL}/profile`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
      })
      resolve(res.data)
    } catch(e) {
      reject(e.response.data)
    }
  })
}
