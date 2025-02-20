import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { API_ENDPOINTS } from "../constants/api"
import { useNavigate } from "react-router-dom"

export const useSendEmailFindPassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async email => {
      const { data } = await axios.post(API_ENDPOINTS.AUTH.FIND_PASSWORD, {
        email,
      })
      return data
    },
    onSuccess: () => {
      alert("please email check")
      navigate("/login")
    },
    onError: err => {
      console.error("email send error ", err)
    },
  })
}
