import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const showMessage = (text) => {
    setMessage(text)

    setTimeout(() => {
      setMessage("")
    }, 2500)
  }

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showMessage("заполните все поля")
      return
    }

    try {
      const response = await axios.post(
  "http://localhost:5000/register",
  {
    name,
    email,
    password,
  }
)

localStorage.setItem(
  "token",
  response.data.token
)

showMessage("аккаунт создан")

setTimeout(() => {
  navigate("/")
}, 1200)

      showMessage("аккаунт создан")

      setTimeout(() => {
        navigate("/login")
      }, 1200)

    } catch (error) {
      console.log(error)

      showMessage("ошибка регистрации")
    }
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center px-6 -mt-18">

      <div
        className="
          w-[620px]
          rounded-[35px]

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
            mb-10
          "
        >
          регистрация
        </h1>

        <div className="flex flex-col gap-6">

          <input
            type="text"
            placeholder="имя"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
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
            onClick={handleRegister}
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
            зарегистрироваться
          </button>

          <div
            className="
              text-center
              text-[#614D6B]
              text-[20px]
              mt-2
            "
          >
            уже есть аккаунт?

            <Link
              to="/login"
              className="ml-2 underline"
            >
              войти
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