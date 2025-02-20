export const BASE_URL = "https://localhost/api"

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
    FIND_PASSWORD: `${BASE_URL}/auth/forgot/password`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change/password/before`,
    FIND_EMAIL: `${BASE_URL}/auth/find/email`,
    SEND_EMAIL: `${BASE_URL}/auth/email/send`,
    VERIFY_EMAIL: `${BASE_URL}/auth/email/verify`,
  },
}
