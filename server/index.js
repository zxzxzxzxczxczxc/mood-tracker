const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)


app.get("/", (req, res) => {
  res.json({ message: "Mood Tracker API работает 🚀" })
})


app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.json({
      success: true,
      users,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      error: "Ошибка БД",
    })
  }
})


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Пользователь уже существует",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword,
      },
    })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Ошибка регистрации",
    })
  }
})


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Пользователь не найден",
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Неверный пароль",
      })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Ошибка логина",
    })
  }
})


const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Нет токена",
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Неверный токен",
    })
  }
}


app.post("/moods", authMiddleware, async (req, res) => {
  try {
    const { mood, activity, note } = req.body

    const newEntry = await prisma.moodEntry.create({
      data: {
        mood,
        activity,
        note,
        userId: req.userId,
      },
    })

    res.json({
      success: true,
      entry: newEntry,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      error: "Ошибка сервера",
    })
  }
})


app.get("/moods", authMiddleware, async (req, res) => {
  try {
    const moods = await prisma.moodEntry.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    res.json(moods)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      error: "Ошибка получения записей",
    })
  }
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})