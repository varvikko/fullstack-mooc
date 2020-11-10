import { Router } from 'express';
import { getPublicPatients, getPatientById, addPatient } from '../services/patientService';

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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const patient = getPatientById(id);
        res.json(patient);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

});

export default router;