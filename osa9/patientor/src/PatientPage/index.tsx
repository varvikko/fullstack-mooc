import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient, addEntry } from '../state';
import { Patient as PatientType, Gender, HospitalEntry } from '../types';
import EntryDisplay from './Entry';
import { AddHospitalEntryForm, PatientFormValues } from '../AddPatientModal/AddEntryForm';

interface Props {
    patient: PatientType;
}

const Patient: React.FC<Props> = ({ patient }) => {
    const [, dispatch] = useStateValue();

    const getGender = (gender: Gender): string => {
        switch (gender) {
            case Gender.Male:
                return 'M';
            case Gender.Female:
                return 'F';
            case Gender.Other:
                return 'O';
        }
    };

    const gender = getGender(patient.gender);

    const onSubmit = async (values: PatientFormValues) => {
        const response = await axios.post(`${apiBaseUrl}/patients/${patient.id}/entries`, values);
        dispatch(addEntry(patient.id, response.data));
    };

    return (
        <div>
            <Header as='h2'>
                {patient.name} ({gender})
            </Header>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <Header as='h3'>
                entries
            </Header>
            {patient.entries.map(entry => <EntryDisplay entry={entry} key={entry.id} />)}
            <Header as='h2'>Add hospital entry</Header>
            <AddHospitalEntryForm onSubmit={onSubmit} />
        </div>
    );
};

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    
    React.useEffect(() => {
        if (!(patients[id] && patients[id].ssn)) {
            axios
                .get(`${apiBaseUrl}/patients/${id}`)
                .then((response) => response.data)
                .then((patient) => {
                    dispatch(updatePatient(patient));
                });
        }
    }, []);

    const patient = patients[id];

    return <div>{patient ? <Patient patient={patient} /> : null}</div>;
};

export default PatientPage;
