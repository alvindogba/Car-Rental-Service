import express from "express"
import { createNewCustomer, customerLogIn} from "../controller/custormerController.js"
const customerRouter = express()

//Creating new customer
customerRouter.post("/signup", createNewCustomer)
customerRouter.post("/login", customerLogIn)

export default customerRouter