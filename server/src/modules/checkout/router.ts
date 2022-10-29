import { Router } from 'express'
import { getEntities } from '../products/controller';
import { applyPolicies } from './controller';
// const router = require('express').Router();
const router = Router();

router.route('/apply-policies').post(applyPolicies);

export default router;