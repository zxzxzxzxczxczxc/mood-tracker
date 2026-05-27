import { NavLink } from "react-router-dom"

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `
      w-[180px]
      h-[46px]

      flex items-center justify-center

      rounded-[18px]

      text-[28px]
      font-medium

      transition-all duration-300

      ${
        isActive
          ? "bg-white text-[#614D6B] border-2 border-[#614D6B] shadow-lg"
          : "bg-[#D9D9D9] text-[#614D6B] hover:bg-white"
      }
    `

  return (
    <header className="flex justify-center pt-8">
      <div
        className="
          w-[1650px]
          h-[90px]

          rounded-[30px]

          backdrop-blur-md
          bg-white/20
          border border-white/30

          flex items-center justify-between

          px-8
        "
      >
        <div className="flex gap-5">
          <NavLink to="/" className={linkClass}>
            главная
          </NavLink>

          <NavLink to="/stats" className={linkClass}>
            статистика
          </NavLink>
        </div>

        <h1
          className="
            text-[52px]
            tracking-[0.3em]
            text-[#522568]
          "
          style={{ fontFamily: "Antic Didone" }}
        >
          Mood Tracker
        </h1>

        <div className="flex gap-5">
          <NavLink to="/history" className={linkClass}>
            история
          </NavLink>

          <NavLink to="/login" className={linkClass}>
            вход
          </NavLink>
        </div>
      </div>
    </header>
  )
}