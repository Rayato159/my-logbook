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

export const createTask = (title, description) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        baseURL, 
        {
          title,
          description,
        },

        { headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`} },
      )
      resolve(res.data)
    } catch(e) {
      reject(e.response.data)
    }
  })
}

export const deleteTask = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(`${baseURL}/${id}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
      })

      resolve(res.data)
    } catch(e) {
      reject(e.response.data)
    }
  })
}