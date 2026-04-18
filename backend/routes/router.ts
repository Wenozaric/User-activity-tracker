import express from 'express'

import loginReq from "./loginReq.js";
import cookieRouter from './checkCookie.js';
import statsProfile from './statsProfile.js'
import tasks from './tasks.js';

const importantRouter = express.Router();

importantRouter.use('/', tasks);
importantRouter.use('/', loginReq);
importantRouter.use('/', statsProfile);
importantRouter.use('/', cookieRouter);

export default importantRouter;