import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

//define const MAX_RETRIES = 5
const MAX_RETRIES = 20;



const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    /* 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com', */
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`
});
axiosInstance.interceptors.request.use(
  (config) => {

    if (config.requireAuth) {

      let accessToken = localStorage.getItem("LOGIN_USER");

      if (accessToken) {
        config.headers["token"] = accessToken
      }

    }
    return config;
  },
  () => { }
);

let retryCount = 0;

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status == 401) {

      if (retryCount < MAX_RETRIES) {
        retryCount += 1;
        try {
 
          const data = await extendTokenAPI();

          originalRequest.headers["token"] = data.token;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.log("error retry: ", error);

        }



      } else {
        retryCount = 0;
        window.location.href = "/login";
      }

    }

    return Promise.reject(error);
  }
)

export const extendTokenAPI = async () => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/auth/extend-token`, {}, {
      withCredentials: true
    });

    localStorage.setItem("LOGIN_USER", data.token);
    return data;
  } catch (error) {
    throw error;
  }
}



export const signUpAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, payload);
    return data;
  } catch (error) {
    console.log("error sign up");
    throw error;
  }
}

export const loginAPI = async (payload) => {
  try {
    const { data } = await axiosInstance.post(`${BASE_URL}/auth/login`, payload, {
      withCredentials: true //setting để FE nhận được cookie cũng như là gửi cookie cho BE
    });
    return data;
  } catch (error) {
    throw error;
  }

}

export const loginFaceBookAPI = async (payload) => {
  try {
    //payload: email, name, id
    const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const forgotPassAPI = async (payload) => {
  try {
    //payload: email
    let { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, payload)
    return data;
  } catch (error) {
    throw error;
  }
}
export const changePassAPI = async (payload) => {
  try {
    //payload: email, code, newPass
    let { data } = await axios.post(`${BASE_URL}/auth/change-password`, payload)
    return data;
  } catch (error) {
    throw error;
  }
}