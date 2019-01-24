import Koa from 'koa'

import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
const cors = require("koa2-cors");
import mongoose from "mongoose";
import config from './config/index'
const GraphqlRouter = require('./router')
// import { saveInfo, fetchInfo } from './controllers/info' // 引入info controller
// import { saveStudent, fetchStudent, fetchStudentDetail } from './controllers/student'

mongoose.connect(
  config.dbPath,
  {useNewUrlParser: true}
);

const app = new Koa();
const router = new Router();


app.use(bodyParser());
app.use(cors());
router.use('', GraphqlRouter.routes())
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000);

console.log('graphQL server listen port: ' + 4000)