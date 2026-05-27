import { useState } from "react"
import axios from "axios"

const moodButtons = [
  { value: -5, color: "#2F2736" },
  { value: -4, color: "#403947" },
  { value: -3, color: "#504955" },
  { value: -2, color: "#605A65" },
  { value: -1, color: "#6F6A74" },
  { value: 0, color: "#C2BBC6" },
  { value: 1, color: "#846992" },
  { value: 2, color: "#785888" },
  { value: 3, color: "#6B477D" },
  { value: 4, color: "#5F3673" },
  { value: 5, color: "#522568" },
]

const activities = [
  { name: "Сон", icon: "/img/sleep.png" },
  { name: "Еда", icon: "/img/food.png" },
  { name: "Готовка", icon: "/img/cook.png" },
  { name: "Гигиена", icon: "/img/hygiene.png" },
  { name: "Уборка", icon: "/img/clean.png" },
  { name: "Стирка", icon: "/img/wash.png" },
  { name: "Покупки", icon: "/img/shop.png" },
  { name: "Учёба", icon: "/img/study.png" },
  { name: "Работа", icon: "/img/work.png" },
  { name: "Домашние задания", icon: "/img/homework.png" },
  { name: "Саморазвитие", icon: "/img/self.png" },
  { name: "Планирование", icon: "/img/plan.png" },
  { name: "Отдых", icon: "/img/rest.png" },
  { name: "Просмотр фильмов", icon: "/img/movie.png" },
  { name: "Игры", icon: "/img/game.png" },
  { name: "Музыка", icon: "/img/music.png" },
  { name: "Соцсети", icon: "/img/social.png" },
  { name: "YouTube", icon: "/img/youtube.png" },
  { name: "Чтение", icon: "/img/read.png" },
  { name: "Общение", icon: "/img/chat.png" },
  { name: "Встреча с друзьями", icon: "/img/friends.png" },
  { name: "Время с семьёй", icon: "/img/family.png" },
  { name: "Отношения", icon: "/img/love.png" },
  { name: "Прогулка", icon: "/img/walk.png" },
  { name: "Тренировка", icon: "/img/sport.png" },
  { name: "Хобби", icon: "/img/hobby.png" },
  { name: "Поездки", icon: "/img/travel.png" },
  { name: "Ожидание", icon: "/img/wait.png" },
  { name: "Болезнь", icon: "/img/sick.png" },
  { name: "Лечение", icon: "/img/treatment.png" },
  { name: "Визит к врачу", icon: "/img/doctor.png" },
]

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState("")
  const [note, setNote] = useState("")
  const [message, setMessage] = useState("")
  const handleSubmit = async () => {

  if (selectedMood === null) {
    setMessage("выберите оценку настроения")

    setTimeout(() => {
      setMessage("")
    }, 2500)

    return
  }

  if (!selectedActivity) {
    setMessage("выберите занятие")

    setTimeout(() => {
      setMessage("")
    }, 2500)

    return
  }

  try {
const token = localStorage.getItem("token")

await axios.post(
  "http://localhost:5000/moods",
  {
    mood: selectedMood,
    activity: selectedActivity,
    note,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

    setMessage("запись сохранена")

    setTimeout(() => {
      setMessage("")
    }, 2500)

    setSelectedMood(null)
    setSelectedActivity("")
    setNote("")

  } catch (error) {
    console.log(error)

    setMessage("ошибка сохранения")

    setTimeout(() => {
      setMessage("")
    }, 2500)
  }
}

  return (
    <div className="max-w-[1800px] mx-auto px-6 pb-6 -mt-0">
      <div className="flex gap-5 items-start justify-center mt-7">

        <div
          className="
            w-[740px] h-[730px]
            rounded-[30px]
            backdrop-blur-md
            bg-white/25
            border border-white/40
            p-5
            overflow-y-auto
          "
        >
          <div className="flex flex-col gap-4">
            {activities.map((activity) => (
              <button
                key={activity.name}
                onClick={() => setSelectedActivity(activity.name)}
                className={`
                  w-full min-h-[98px]
                  rounded-[26px]
                  px-5

                  flex items-center justify-between

                  transition-all duration-300

                  ${
                    selectedActivity === activity.name
                      ? "bg-white border-2 border-[#7A5C8A] scale-[1.01]"
                      : "bg-white/60 hover:bg-white"
                  }
                `}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="
                      w-[76px] h-[76px]
                      rounded-full
                      backdrop-blur-md
                      bg-white/30
                      border border-white
                      flex items-center justify-center
                    "
                  >
                    <img
                      src={activity.icon}
                      alt={activity.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  <span className="text-[27px] text-[#614D6B] font-medium">
                    {activity.name}
                  </span>
                </div>

                <span className="text-[50px] text-[#614D6B]">
                  ›
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="
            w-[790px] h-[730px]
            rounded-[30px]
            backdrop-blur-md
            bg-white/35
            border border-white/40
            p-8
          "
        >
          <div className="flex items-center gap-5 ml-3">
            <div
              className="
                w-[76px] h-[76px]
                rounded-full
                backdrop-blur-md
                bg-white/30
                border border-white
                flex items-center justify-center
              "
            >
              {selectedActivity && (
                <img
                  src={
                    activities.find(
                      (a) => a.name === selectedActivity
                    )?.icon
                  }
                  className="w-10 h-10"
                />
              )}
            </div>

            <div className="text-[28px] text-[#614D6B]">
              Вы выбрали:
              <span className="font-bold ml-3">
                {selectedActivity || "Ничего"}
              </span>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex gap-[6px] flex-wrap justify-center">
              {moodButtons.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  style={{ backgroundColor: mood.color }}
                  className={`
                    w-[53px] h-[64px]
                    rounded-[12px]
                    text-white text-[22px]
                    transition-all duration-300

                    ${
                      selectedMood === mood.value
                        ? "scale-110 border-[3px] border-white"
                        : "hover:scale-105"
                    }
                  `}
                >
                  {mood.value > 0
                    ? `+${mood.value}`
                    : mood.value}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-3 text-[#614D6B] text-[16px] px-2">
              <span>отвратительно</span>
              <span>нейтрально</span>
              <span>замечательно</span>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-[30px] font-bold text-[#614D6B] mb-5">
              Заметка
            </h2>

            <textarea
              placeholder="Как вы себя чувствовали? Что случилось? Почему так вышло?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="
                w-full h-[190px]
                rounded-[30px]
                p-5
                text-[#614D6B]
                text-[18px]

                backdrop-blur-md
                bg-white/30
                border border-white/40

                resize-none
                outline-none
              "
            />

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="
                  mt-7
                  w-[210px]
                  h-[62px]
                  rounded-[18px]

                  bg-[#D9D9D9]
                  text-[#614D6B]
                  text-[27px]

                  hover:scale-105
                  transition-all duration-300
                "
              >
                сохранить
              </button>
            </div>

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

        shadow-xl

        animate-[fadeIn_.3s_ease]
      "
    >
      {message}
    </div>
  </div>
)}
    </div>
  )
}