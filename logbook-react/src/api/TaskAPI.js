import axios from "axios";

const baseURL = 'http://localhost:3000/api/tasks'

export const getTasks = (search) => {
  return new Promise(async  (resolve, reject) => {
    try {
      const res = await axios.get(`${baseURL}?search=${search}`, {
          headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
      })
      resolve(res.data)
    } catch (e) {
        reject(e.response.data)
    }
  });
};

export const getTaskByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${baseURL}/${id}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
      })

      resolve(res.data)
    } catch(e) {
      reject(e.response.message)
    }
  })
}

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

export const updateTask = (id, title, description) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(`${baseURL}/${id}/update`, 
      {
        title,
        description,
      },
      {
        headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
      })

      resolve(res.data)
    } catch(e) {
      reject(e.response.message)
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