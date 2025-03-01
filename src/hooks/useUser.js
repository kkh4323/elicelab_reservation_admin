import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useUsers = (
  { order, page, take, searchFilter, keyword } = {
    order: "ASC",
    page: 1,
    take: 10,
    searchFilter: null,
    keyword: null,
  }
) => {
  return useQuery({
    queryKey: ["users", page, take],
    queryFn: async () => {
      const config = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmNkNTFjZC0xOTk1LTRjYjgtOTM5YS0zMDlhZDQ5ZjU1NDMiLCJpYXQiOjE3NDA3ODgxODgsImV4cCI6MTc0MDc5NDE4OH0.yZfeMZUzt5eJUPBHzULUWbJut3dE-eQjA0J5y3esvYk",
        },
      }
      const url = searchFilter
        ? `https://localhost/api/user?order=${order}&page=${page}&take=${take}&${searchFilter}=${keyword}`
        : `https://localhost/api/user?order=${order}&page=${page}&take=${take}`
      const { data } = await axios.get(url, config)
      return data.body.data
    },
    staleTime: 0,
    keepPreviousData: true,
  })
}
