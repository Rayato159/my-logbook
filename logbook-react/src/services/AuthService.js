export const isLogin = (username, password) => {
    fetchLogin(username, password)
}

export const storeToken = (token) => {
    localStorage.setItem("accessToken", token)
}

export const removeToken = () => {
    localStorage.removeItem("accessToken")
}

export const fetchLogin = (username, password) => {
    client.post(`/auth/signin`, {
        username,
        password,
    })
    .then((res) => {
        setToken(res.data.accessToken)
        localStorage.setItem("accessToken", res.data.accessToken)
        return fetchUser()
    })
    .catch((e) => e.message)
}

export const fetchUser = () => {
    client.get(`/auth/profile`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
        .then((res) => res.data)
        .catch((e) => e.message)
}