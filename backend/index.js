const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const dyslexiaRoutes = require('./routes/dyslexiaRoutes')
const dysgraphiaRoutes = require('./routes/dysgraphiaRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const cors = require('cors')
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://doodle-path-stories.vercel.app",
      "http://localhost:8081",
      "https://candyisland.vercel.app/"
    ],
    credentials: true,
  })
);
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req, res) => {
    res.send('hello world')
})

app.use('/api/user', userRoutes)
app.use('/api/dyslexia',dyslexiaRoutes)
app.use('/api/dysgraphia',dysgraphiaRoutes)
app.use('/api/dashboard',dashboardRoutes)

app.listen(3000,() => {
    console.log(`server running on port 3000`);
})