import React from 'react';
import {
    Entry,
    HospitalEntry,
    OccupationalHealthcareEntry,
    HealthCheckEntry
} from '../types';
import { useStateValue } from '../state';
import { Header } from 'semantic-ui-react';

interface Props {
    entry: Entry;
}

const HospitalEntryDisplay: React.FC<{ entry: HospitalEntry }> = ({
    entry
}) => {
    return (
        <div>
            <Header as='h3'>Hospital</Header>
            {entry.discharge ? (
                <div>
                    Discharge: {entry.discharge.date} {entry.discharge.criteria}
                </div>
            ) : null}
        </div>
    );
};

const OccupationalHealthcareEntryDisplay: React.FC<{
    entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
    return (
        <div>
            <Header as='h3'>Occupational Healthcare</Header>
            Employer: {entry.employerName}
            {entry.sickLeave && (
                <p>
                    Sick leave: {entry.sickLeave.startDate} -{' '}
                    {entry.sickLeave.endDate}
                </p>
            )}
        </div>
    );
};

const HealthCheckEntryDispaly: React.FC<{ entry: HealthCheckEntry }> = ({
    entry
}) => {
    return (
        <div>
            <Header as='h3'>Health Check</Header>Health check rating:{' '}
            {entry.healthCheckRating}
        </div>
    );
};

const EntryDisplay: React.FC<Props> = ({ entry }) => {
    const [{ diagnoses }, dispatch] = useStateValue();

    if (!Object.keys(diagnoses).length) {
        return null;
    }

    let additional = null;
    switch (entry.type) {
        case 'Hospital':
            additional = <HospitalEntryDisplay entry={entry} />;
            break;
        case 'OccupationalHealthcare':
            additional = <OccupationalHealthcareEntryDisplay entry={entry} />;
            break;
        case 'HealthCheck':
            additional = <HealthCheckEntryDispaly entry={entry} />;
            break;
    }

    return (
        <div>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            {additional}
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code} {diagnoses[code].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntryDisplay;
