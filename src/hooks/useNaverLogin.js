import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

export const useNaverLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        const googleAuthUrl = "https://localhost/api/auth/naver"
        const width = 500
        const height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2

        // ✅ "noopener" 제거하여 `window.opener` 유지
        const loginWindow = window.open(
          googleAuthUrl,
          "Naver Login",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        )

        const messageListener = event => {
          console.log("Received message:", event)
          if (event.origin !== "http://localhost:8000") return // 백엔드 주소 확인

          const { accessToken, refreshToken, user } = event.data
          if (accessToken) {
            // Cookies.set("access_token", accessToken, { expires: 1, secure: true });
            // Cookies.set("refresh_token", refreshToken, { expires: 7, secure: true });

            // login(accessToken);
            // queryClient.invalidateQueries({ queryKey: ["user"] }); // 🔥 유저 정보 최신화

            console.log("User Info:", user)

            if (loginWindow) loginWindow.close()

            navigate("/dashboard")

            resolve(user)
          } else {
            reject(new Error("Naver login failed"))
          }
        }

        window.addEventListener("message", messageListener)

        // 창이 닫히면 이벤트 리스너 제거
        const checkPopupClosed = setInterval(() => {
          if (loginWindow?.closed) {
            clearInterval(checkPopupClosed)
            window.removeEventListener("message", messageListener)
            reject(new Error("Naver login window closed"))
          }
        }, 500)
      })
    },
    onError: error => {
      console.error("Naver login failed:", error)
    },
  })
}
