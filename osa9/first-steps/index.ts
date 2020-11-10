import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    try {
        const bmi = calculateBmi(Number(height), Number(weight));
        return res.json({ height, weight, bmi });
    } catch (error) {
        return res.json({ error: error.message });
    }
});

app.post('/exercises', (req, res) => {
    const { target, daily_exercises } = req.body;
    if (!target || !daily_exercises) {
        return res.status(400).json({ error: 'Missing arguments' });
    }

    try {
        const result = calculateExercises(daily_exercises.map(Number), Number(target));
        return res.json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
