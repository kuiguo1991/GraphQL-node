import Koa from 'koa'

import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
const cors = require("koa2-cors");
import mongoose from "mongoose";
import config from './config/index'
import { saveInfo, fetchInfo } from './controllers/info' // 引入info controller
import { saveStudent, fetchStudent, fetchStudentDetail } from './controllers/student'

mongoose.connect(
  config.dbPath,
  { useMongoClient: true }
);

const app = new Koa();
const router = new Router();


app.use(bodyParser());
app.use(cors());

// 设置每一个路由对应的相对的控制器
router.post('/saveinfo', saveInfo)
router.get('/info', fetchInfo)

router.post('/savestudent', saveStudent)
router.get('/student', fetchStudent)
router.get('/studentDetail', fetchStudentDetail)

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000);

console.log('graphQL server listen port: ' + 4000)