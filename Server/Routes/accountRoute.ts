import express from "express"
import * as accountController from "../Controller/accountController"

const accountRoute = express.Router()

// accountRoute.post('/details', accountController.accountDetails)

accountRoute.post('/deposit', accountController.deposit)

export default accountRoute;