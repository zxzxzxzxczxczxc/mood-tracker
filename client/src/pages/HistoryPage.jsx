import { useEffect, useState } from "react"
import axios from "axios"

const moodColors = {
  "-5": "#2F2736",
  "-4": "#403947",
  "-3": "#504955",
  "-2": "#605A65",
  "-1": "#6F6A74",
  "0": "#C2BBC6",
  "1": "#846992",
  "2": "#785888",
  "3": "#6B477D",
  "4": "#5F3673",
  "5": "#522568",
}

const activityIcons = {
  "Сон": "/img/sleep.png",
  "Еда": "/img/food.png",
  "Готовка": "/img/cook.png",
  "Гигиена": "/img/hygiene.png",
  "Уборка": "/img/clean.png",
  "Стирка": "/img/wash.png",
  "Покупки": "/img/shop.png",
  "Учёба": "/img/study.png",
  "Работа": "/img/work.png",
  "Домашние задания": "/img/homework.png",
  "Саморазвитие": "/img/self.png",
  "Планирование": "/img/plan.png",
  "Отдых": "/img/rest.png",
  "Просмотр фильмов": "/img/movie.png",
  "Игры": "/img/game.png",
  "Музыка": "/img/music.png",
  "Соцсети": "/img/social.png",
  "YouTube": "/img/youtube.png",
  "Чтение": "/img/read.png",
  "Общение": "/img/chat.png",
  "Встреча с друзьями": "/img/friends.png",
  "Время с семьёй": "/img/family.png",
  "Отношения": "/img/love.png",
  "Прогулка": "/img/walk.png",
  "Тренировка": "/img/sport.png",
  "Хобби": "/img/hobby.png",
  "Поездки": "/img/travel.png",
  "Ожидание": "/img/wait.png",
  "Болезнь": "/img/sick.png",
  "Лечение": "/img/treatment.png",
  "Визит к врачу": "/img/doctor.png",
}

const activities = [
  "all",
  "Сон",
  "Еда",
  "Готовка",
  "Гигиена",
  "Уборка",
  "Стирка",
  "Покупки",
  "Учёба",
  "Работа",
  "Домашние задания",
  "Саморазвитие",
  "Планирование",
  "Отдых",
  "Просмотр фильмов",
  "Игры",
  "Музыка",
  "Соцсети",
  "YouTube",
  "Чтение",
  "Общение",
  "Встреча с друзьями",
  "Время с семьёй",
  "Отношения",
  "Прогулка",
  "Тренировка",
  "Хобби",
  "Поездки",
  "Ожидание",
  "Болезнь",
  "Лечение",
  "Визит к врачу",
]

const moods = [
  "all",
  -5,
  -4,
  -3,
  -2,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
]

export default function HistoryPage() {
  const [entries, setEntries] = useState([])

  const [sortType, setSortType] = useState("new")

  const [selectedActivity, setSelectedActivity] =
    useState("all")

  const [selectedMood, setSelectedMood] =
    useState("all")

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        return
      }

      const response = await axios.get(
        "http://localhost:5000/moods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setEntries(response.data || [])
    } catch (error) {
      console.log(error)
    }
  }

  let filteredEntries = [...entries]

  if (selectedActivity !== "all") {
    filteredEntries = filteredEntries.filter(
      (entry) =>
        entry.activity === selectedActivity
    )
  }

  if (selectedMood !== "all") {
    filteredEntries = filteredEntries.filter(
      (entry) => entry.mood === selectedMood
    )
  }

  if (sortType === "new") {
    filteredEntries.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
  }

  if (sortType === "old") {
    filteredEntries.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    )
  }

  if (sortType === "best") {
    filteredEntries.sort(
      (a, b) => b.mood - a.mood
    )
  }

  if (sortType === "worst") {
    filteredEntries.sort(
      (a, b) => a.mood - b.mood
    )
  }

  return (
    <div className="max-w-[1650px] mx-auto px-6">
      <div className="flex gap-5 mt-7 mb-5">
        <div className="flex gap-3">
          <select
            value={selectedActivity}
            onChange={(e) =>
              setSelectedActivity(e.target.value)
            }
            className="
              w-[260px]
              h-[50px]
              rounded-[18px]

              bg-[#D9D9D9]
              text-[#614D6B]
              text-[22px]

              px-4
              outline-none
            "
          >
            {activities.map((activity) => (
              <option
                key={activity}
                value={activity}
              >
                {activity === "all"
                  ? "Все занятия"
                  : activity}
              </option>
            ))}
          </select>

          <select
            value={selectedMood}
            onChange={(e) =>
              setSelectedMood(
                e.target.value === "all"
                  ? "all"
                  : Number(e.target.value)
              )
            }
            className="
              w-[180px]
              h-[50px]
              rounded-[18px]

              bg-[#D9D9D9]
              text-[#614D6B]
              text-[22px]

              px-4
              outline-none
            "
          >
            {moods.map((mood) => (
              <option
                key={mood}
                value={mood}
              >
                {mood === "all"
                  ? "Все оценки"
                  : mood > 0
                  ? `+${mood}`
                  : mood}
              </option>
            ))}
          </select>
        </div>

        <select
          value={sortType}
          onChange={(e) =>
            setSortType(e.target.value)
          }
          className="
            w-[320px]
            h-[50px]
            rounded-[18px]

            bg-[#D9D9D9]
            text-[#614D6B]
            text-[22px]

            px-4
            outline-none
          "
        >
          <option value="new">
            От новых к старым
          </option>

          <option value="old">
            От старых к новым
          </option>

          <option value="best">
            От лучших к худшим
          </option>

          <option value="worst">
            От худших к лучшим
          </option>
        </select>
      </div>

      <div
        className="
          h-[680px]
          rounded-[32px]
          backdrop-blur-md
          bg-white/20
          border border-white/30
          p-6
          overflow-y-auto
        "
      >
        <div className="flex flex-col gap-4">
          {filteredEntries.length === 0 && (
            <div className="text-center text-white text-2xl mt-10">
              История пока пуста
            </div>
          )}

          {filteredEntries.map((entry) => {
            const date = new Date(entry.createdAt)

            const formattedDate =
              date.toLocaleDateString("ru-RU")

            const formattedTime =
              date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })

            return (
              <div
                key={entry.id}
                className="
                  h-[145px]
                  rounded-[28px]
                  bg-white/55
                  border border-white/40
                  px-6
                  py-4

                  flex items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-5 min-w-0 flex-1">
                  <div
                    className="
                      w-[74px] h-[74px]
                      rounded-full
                      backdrop-blur-md
                      bg-white/35
                      border border-white
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <img
                      src={
                        activityIcons[entry.activity]
                      }
                      alt={entry.activity}
                      className="w-10 h-10"
                    />
                  </div>

                  <div className="w-[120px] shrink-0">
                    <div className="text-[#614D6B] text-[15px]">
                      {formattedDate}
                    </div>

                    <div className="text-[#614D6B] text-[15px]">
                      {formattedTime}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 mr-10">
                    <div
                      className="
                        text-[#614D6B]
                        text-[28px]
                        font-bold
                        leading-none
                        mb-2
                      "
                    >
                      {entry.activity}
                    </div>

                    <div
                      className="
                        text-[#614D6B]
                        text-[17px]
                        leading-[22px]

                        max-h-[46px]
                        overflow-y-auto
                        overflow-x-hidden

                        break-words
                        whitespace-pre-wrap

                        pr-4
                      "
                    >
                      {entry.note || "Без заметки"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor:
                      moodColors[entry.mood],
                  }}
                  className="
                    w-[72px]
                    h-[82px]
                    rounded-[18px]

                    flex items-center justify-center

                    text-white
                    text-[28px]
                    shrink-0
                  "
                >
                  {entry.mood > 0
                    ? `+${entry.mood}`
                    : entry.mood}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}