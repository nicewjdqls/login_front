import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Add JWT token to headers if it exists
 * and log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 JWT 토큰 가져오기
    if (token) {
      request.headers.Authorization = `Bearer ${token}`; // 토큰이 존재하면 Authorization 헤더에 추가
    }
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response?.data || error.message; // 에러가 응답 객체에서 발생하는지 확인
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
