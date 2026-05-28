import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("заполните все поля")

      setTimeout(() => {
        setMessage("")
      }, 2500)

      return
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      setMessage("вход выполнен")

      setTimeout(() => {
        navigate("/")
      }, 1200)
    } catch (error) {
      console.log(error)

      setMessage("неверный email или пароль")

      setTimeout(() => {
        setMessage("")
      }, 2500)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center px-6 -mt-18">
      <div
        className="
          w-[640px]
          rounded-[30px]

          backdrop-blur-md
          bg-white/25
          border border-white/40

          p-10
        "
      >
        <h1
          className="
            text-center
            text-[45px]
            text-[#614D6B]
            font-medium
            mb-6
          "
        >
          вход
        </h1>

        <div className="flex flex-col gap-5 -mt-2">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              h-[72px]
              rounded-[22px]
              px-6

              text-[24px]
              text-[#614D6B]

              backdrop-blur-md
              bg-white/35
              border border-white/40

              outline-none
            "
          />

          <input
            type="password"
            placeholder="пароль"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              h-[72px]
              rounded-[22px]
              px-6

              text-[24px]
              text-[#614D6B]

              backdrop-blur-md
              bg-white/35
              border border-white/40

              outline-none
            "
          />

          <button
            onClick={handleLogin}
            className="
              mt-4
              h-[72px]

              rounded-[22px]

              bg-[#D9D9D9]

              text-[#614D6B]
              text-[28px]

              hover:scale-[1.02]
              transition-all duration-300
            "
          >
            войти
          </button>

          <div
            className="
              text-center
              text-[#614D6B]
              text-[20px]
              mt-2
            "
          >
            нет аккаунта?

            <Link
              to="/register"
              className="ml-1 underline"
            >
              регистрация
            </Link>
          </div>
        </div>
      </div>

      {message && (
        <div
          className="
            fixed
            inset-0
            flex items-center justify-center
            z-50
            pointer-events-none
          "
        >
          <div
            className="
              px-10
              py-5

              rounded-[28px]

              backdrop-blur-md
              bg-white/30
              border border-white/40

              text-[#614D6B]
              text-[30px]
              font-medium
            "
          >
            {message}
          </div>
        </div>
      )}
    </div>
  )
}