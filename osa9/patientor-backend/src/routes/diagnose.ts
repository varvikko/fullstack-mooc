import { Router } from 'express';
import { getDiagnoses } from '../services/diagnoseService';

const router = Router();

router.get('/', (_req, res) => {
    res.json(getDiagnoses());
});

export default router;
