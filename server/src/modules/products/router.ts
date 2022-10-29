import { Router } from 'express'
import { getEntities } from './controller';
// const router = require('express').Router();
const router = Router();

router.route('/').get(getEntities);

export default router;