import { useEffect, useMemo, useState } from "react"
import axios from "axios"

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

const moodColors = {
  amazing: "#522568",
  good: "#6B487D",
  neutral: "#C2BBC6",
  bad: "#504955",
  awful: "#2F2736",
}

export default function StatsPage() {
  const [moods, setMoods] = useState([])

  const textStyle = {
    color: "#614D6B",
    textShadow: "0 0 0 #614D6B",
  }

  useEffect(() => {
    fetchMoods()
  }, [])

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem("token")

const response = await axios.get(
  "http://localhost:5000/moods",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)

      const moodsData = Array.isArray(response.data)
        ? response.data
        : response.data.moods || []

      const normalized = moodsData.map((item) => ({
        ...item,
        mood: Number(item.mood),
        createdAt: item.createdAt ? new Date(item.createdAt) : null,
      }))

      setMoods(normalized)
    } catch (error) {
      console.log(error)
    }
  }

  const getMoodColor = (avg) => {
    if (avg === null || avg === undefined || isNaN(avg)) return moodColors.neutral
    if (avg >= 4) return moodColors.amazing
    if (avg >= 2) return moodColors.good
    if (avg >= 0) return moodColors.neutral
    if (avg >= -2) return moodColors.bad
    return moodColors.awful
  }

  const averageMood = (entries) => {
    if (!entries || entries.length === 0) return null

    const values = entries
      .map((e) => Number(e.mood))
      .filter((v) => !isNaN(v))

    if (values.length === 0) return null

    return values.reduce((a, b) => a + b, 0) / values.length
  }

  const todayEntries = useMemo(() => {
    const today = new Date().toDateString()

    return moods.filter((m) => {
      if (!m.createdAt) return false
      return m.createdAt.toDateString() === today
    })
  }, [moods])

  const monthEntries = useMemo(() => {
    const now = new Date()

    return moods.filter((m) => {
      if (!m.createdAt) return false

      return (
        m.createdAt.getMonth() === now.getMonth() &&
        m.createdAt.getFullYear() === now.getFullYear()
      )
    })
  }, [moods])

  const dayAvg = averageMood(todayEntries)
  const monthAvg = averageMood(monthEntries)
  const allAvg = averageMood(moods)

  const calculateActivityStats = () => {
    const stats = {}

    moods.forEach((entry) => {
      if (!stats[entry.activity]) {
        stats[entry.activity] = { total: 0, count: 0 }
      }

      stats[entry.activity].total += Number(entry.mood)
      stats[entry.activity].count += 1
    })

    return Object.entries(stats)
      .map(([name, data]) => ({
        name,
        avg: data.total / data.count,
        count: data.count,
        score: (data.total / data.count) * Math.log(data.count + 1),
        icon: activities.find((a) => a.name === name)?.icon || "",
      }))
      .filter((item) => item.count >= 2)
  }

  const activityStats = calculateActivityStats()

  const topPositive = [...activityStats]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const topNegative = [...activityStats]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)

  const renderTopCard = (item, index, positive = true) => {
    if (!item) return null

    return (
      <div
        key={index}
        className="
          w-[500px]
          h-[72px]
          rounded-[28px]
          bg-[#D9D9D9]
          flex items-center
          px-5
          shrink-0
        "
      >
        {!positive && (
          <div className="w-[56px] h-[56px] rounded-full backdrop-blur-md bg-white/40 border border-white/40 flex items-center justify-center mr-5 shrink-0">
            <img src={item.icon} className="w-8 h-8 object-contain" />
          </div>
        )}

        <div
          style={textStyle}
          className="flex-1 text-center text-[#614D6B] text-[29px] font-medium leading-none"
        >
          {item.name}
        </div>

        {positive && (
          <div className="w-[56px] h-[56px] rounded-full backdrop-blur-md bg-white/40 border border-white/40 flex items-center justify-center ml-5 shrink-0">
            <img src={item.icon} className="w-8 h-8 object-contain" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-[1700px] mx-auto px-6 pb-12 mt-4">

      <div className="w-[1440px] h-[360px] mx-auto rounded-[30px] backdrop-blur-md bg-white/20 border border-white/40 px-20 pt-1">

        <h1 style={textStyle} className="text-center text-[40px] text-[#614D6B] font-medium">
          статистика вашего настроения
        </h1>

        <div className="flex mt-3">

          <div className="flex flex-col gap-3 -mt-1">
            {[
              ["замечательно", moodColors.amazing],
              ["хорошо", moodColors.good],
              ["нейтрально", moodColors.neutral],
              ["плохо", moodColors.bad],
              ["отвратительно", moodColors.awful],
            ].map(([text, color]) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full" style={{ backgroundColor: color }} />

                <div
                  style={textStyle}
                  className="h-9 px-5 rounded-full bg-[#D9D9D9] flex items-center text-[#614D6B] text-[24px]"
                >
                  {text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-14 -ml-[-210px]">

            <div className="flex flex-col items-center">
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "9999px",
                  border: `18px solid ${getMoodColor(dayAvg)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <img src="/img/day.png" className="w-[110px] h-[110px]" />
              </div>
              <div style={textStyle} className="mt-2 text-[31px]">день</div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-[180px] h-[180px] rounded-full flex items-center justify-center"
                style={{ border: `18px solid ${getMoodColor(monthAvg)}` }}
              >
                <img src="/img/month.png" className="w-[85px] h-[85px]" />
              </div>
              <div style={textStyle} className="mt-2 text-[31px]">месяц</div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="w-[180px] h-[180px] rounded-full flex items-center justify-center"
                style={{ border: `18px solid ${getMoodColor(allAvg)}` }}
              >
                <img src="/img/alltime.png" className="w-[100px] h-[100px]" />
              </div>
              <div style={textStyle} className="mt-2 text-[31px]">все время</div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-center gap-28 mt-6 relative">

        <div className="w-[560px] h-[360px] rounded-[30px] backdrop-blur-md bg-white/20 border border-white/40 p-7">
          <div className="flex items-center gap-2 mb-3 h-[40px] pl-[55px]">
            <div style={textStyle} className="text-[35px]">
              топ позитивных занятий
            </div>
            <img src="/img/topplus.png" className="h-8 object-contain" />
          </div>

          <div className="flex flex-col gap-5">
            {topPositive.map((item, i) => renderTopCard(item, i, true))}
          </div>
        </div>

        <div className="w-[560px] h-[360px] rounded-[30px] backdrop-blur-md bg-white/20 border border-white/40 p-7">
          <div className="flex items-center gap-2 mb-3 h-[40px]">
            <img src="/img/topminus.png" className="w-8 h-8 object-contain" />
            <div style={textStyle} className="text-[35px]">
              топ негативных занятий
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {topNegative.map((item, i) => renderTopCard(item, i, false))}
          </div>
        </div>

      </div>
    </div>
  )
}