import { Router } from 'express';
import { getPublicPatients, addPatient } from '../services/patientService';

const router = Router();

router.get('/', (_req, res) => {
    res.json(getPublicPatients());
});

router.post('/', (req, res) => {
    try {
        const patient = addPatient(req.body);
        res.json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;