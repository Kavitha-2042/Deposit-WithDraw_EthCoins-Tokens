import express from "express"
import * as accountController from "../Controller/accountController"
import * as withDrawController from "../Controller/withDrawController"
import withDrawRoute from './withDrawRoute';

const accountRoute = express.Router()

// accountRoute.post('/details', accountController.accountDetails)

accountRoute.post('/deposit', accountController.deposit)

accountRoute.post('/depositedBalance', accountController.depositedBalance)

withDrawRoute.post("/withdrawTransaction", withDrawController.withDrawTransactions )

export default accountRoute;