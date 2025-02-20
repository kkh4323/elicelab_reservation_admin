import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { API_ENDPOINTS } from "../constants/api"

export const useSignUp = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async userData => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, userData)
      return data
    },
    onSuccess: () => {
      navigate("/login")
    },
    onError: err => {
      console.error("signup failed ", err)
    },
  })
}

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, status } = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      })
      console.log(data, status)
      return data
    },
    onSuccess: () => {
      alert("login success")
      navigate("/dashboard")
    },
    onError: err => {
      console.error("login failed ", err)
    },
  })
}
