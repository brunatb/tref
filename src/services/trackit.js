import axios from "axios";
const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function createToken() {
  const auth = localStorage.getItem("hash");
  const config = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  return config;
}

function postSignUpData(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
  return promise;
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/auth/login`, body);
  return promise;
}

function getHabits() {
  const config = createToken();
  const promise = axios.get(`${BASE_URL}/habits`, config);
  return promise;
}

function postHabit(body) {
  const config = createToken();
  const promise = axios.post(`${BASE_URL}/habits`, body, config);
  return promise;
}

function removeHabit(id) {
  const config = createToken();
  const promise = axios.delete(`${BASE_URL}/habits/${id}`, config);
  return promise;
}

function getTodayHabits() {
  const config = createToken();
  const promise = axios.get(`${BASE_URL}/habits/today`, config);
  return promise;
}

function postCompletedHabit(body, id) {
  const config = createToken();
  const promise = axios.post(`${BASE_URL}/habits/${id}/check`, body, config);
  return promise;
}

function postUncompletedHabit(body, id) {
  const config = createToken();
  const promise = axios.post(`${BASE_URL}/habits/${id}/uncheck`, body, config);
  return promise;
}

function getHistoric() {
  const config = createToken();
  const promise = axios.get(`${BASE_URL}/habits/history/daily`, config);
  return promise;
}

export {
  postSignUpData,
  postLogin,
  postHabit,
  getHabits,
  removeHabit,
  getTodayHabits,
  postCompletedHabit,
  postUncompletedHabit,
  getHistoric,
};
