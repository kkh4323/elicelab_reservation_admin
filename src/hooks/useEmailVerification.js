import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { API_ENDPOINTS } from "../constants/api"

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async email => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.SEND_EMAIL, {
        email,
      })
      return data
    },
    onError: err => {
      console.error("email send error ", err)
    },
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        email,
        code,
      })
      return data
    },
    onError: err => {
      console.error("email verification error ", err)
    },
  })
}
