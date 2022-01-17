import axios from "axios";

const baseURL = 'http://localhost:3000/api/tasks'

export const getTasks = () => {
  return new Promise(async  (resolve, reject) => {
    try {
        const res = await axios.get(baseURL, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
        })
        resolve(res.data)
    } catch (e) {
        reject(e.response.data)
    }
  });
};