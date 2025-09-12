import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import cors from 'cors'
import db from './models/index.js';
import customerRouter from './Router/custormerRouts.js';
import { createApiUser, generateMomoApiKey } from './Utils/momo.js';


const app = express()
const port = 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// auth routes
app.use("/auth", customerRouter);



app.get('/create-momo-user', (req, res) => {
  const response = createApiUser()
  res.json(response)
  console.log(response)
})

app.get('/generate-momo-apikey', (req, res) => {
  const apiKey = generateMomoApiKey()
  res.json(apiKey.data  )
  console.log(apiKey.data)
})

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(port, ()=>{
  db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
    console.log(`Server is running on port ${port}`)
})