const express = require("express")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const PORT = 5005

const app = express()


app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:5173"]
  })
)




app.get('/api/cohorts', (req, res) => {
  const cohorts = require('./cohorts.json')
  res.json(cohorts)
})




app.get('/api/students', (req, res) => {              // http://localhost:5005/api/students
  const students = require('./students.json')
  res.json(students)
})

app.get('/api/students/search', (req, res) => {       // http://localhost:5005/api/students/search?language=javascript
  const { language } = req.query
  res.send(`Debo buscar en la BBDD los alumnos/as que controlen de ${language}`)
})

app.get('/api/students/:studentId', (req, res) => {   // http://localhost:5005/api/students/674836583
  const { studentId } = req.params
  res.send(`Debo buscar en la BBDD el Id de alumno ${studentId}`)
})





app.get('*', (req, res) => {
  res.sendStatus(404)
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))