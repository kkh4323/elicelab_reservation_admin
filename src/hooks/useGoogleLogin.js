// import { useMutation } from "@tanstack/react-query"
// import { useNavigate } from "react-router-dom"
//
// export const useGoogleLogin = () => {
//   const navigate = useNavigate()
//   return useMutation({
//     mutationFn: async () => {
//       return new Promise((resolve, reject) => {
//         const googleAuthURL = "https://localhost/api/auth/google"
//         const width = 500
//         const height = 600
//         const left = window.innerWidth / 2 - width / 2
//         const top = window.innerHeight / 2 - height / 2
//
//         const loginWindow = window.open(
//           googleAuthURL,
//           "google login",
//           `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
//         )
//
//         const messageListener = event => {
//           console.log("event: ", event)
//           if (event.origin != "https://localhost") return
//           const { user } = event.data
//           console.log(user)
//           if (user) {
//             if (loginWindow) loginWindow.close()
//             navigate("/dashboard")
//             resolve(user)
//           } else {
//             reject(new Error("google login failed"))
//           }
//         }
//         window.addEventListener("message", messageListener)
//       })
//     },
//     onSuccess: () => {},
//     onError: err => {
//       console.error(err)
//     },
//   })
// }
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useGoogleLogin = () => {
  // const { login } = useAuth();
  const navigate = useNavigate()
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const googleAuthUrl = "https://localhost/api/auth/google"
        const width = 500
        const height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2

        // ✅ "noopener" 제거하여 `window.opener` 유지
        const loginWindow = window.open(
          googleAuthUrl,
          "Google Login",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        )

        // ✅ 백엔드에서 전달한 메시지 수신 후 쿠키 저장
        const messageListener = event => {
          console.log("Received message:", event)
          if (event.origin !== "http://localhost:7070") return // 백엔드 주소 확인

          const { accessToken, refreshToken, user } = event.data
          if (accessToken) {
            // ✅ 토큰을 쿠키에 저장
            // Cookies.set("access_token", accessToken, { expires: 1, secure: true });
            // Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true });

            // login(accessToken);
            // queryClient.invalidateQueries({ queryKey: ["user"] }); // 🔥 유저 정보 최신화

            console.log("User Info:", user)

            // ✅ 창 닫기
            if (loginWindow) loginWindow.close()

            // ✅ 대시보드 이동
            navigate("/dashboard")

            resolve(user)
          } else {
            reject(new Error("Google login failed"))
          }
        }

        window.addEventListener("message", messageListener)

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed)
            window.removeEventListener("message", messageListener)
            reject(new Error("Google login window closed"))
          }
        }, 500)
      })
    },
    onError: error => {
      console.error("Google login failed:", error)
    },
  })
}
