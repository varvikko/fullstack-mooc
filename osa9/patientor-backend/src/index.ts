import express from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnose';
import patients from './routes/patient';

const app = express();
const port = 3001;

app.use(cors({origin: 'http://localhost:3000 '}))
app.use(express.json());

app.get('/api/ping', (_, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});