/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { v4 } from 'uuid';
import patientData from '../../data/patients';
import {
    Patient,
    PublicPatient,
    NewPatient,
    Gender,
    Entry,
    OccupationalHealthcareEntry,
    HospitalEntry,
    HealthCheckEntry
} from '../types';

const patients: Patient[] = patientData.map((patient) => ({
    ...patient
}));

export function getPublicPatients(): PublicPatient[] {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        })
    );
}

export function getPatientById(id: string): Patient {
    const patient = patients.find((patient) => patient.id === id);
    if (!patient) {
        throw new Error(`No patient found with such ID: ${id}`);
    }

    return patient;
}

export function addPatient(newPatient: NewPatient): Patient {
    const createdPatient: NewPatient = toNewPatient(newPatient);
    const patient: Patient = {
        ...createdPatient,
        id: v4()
    };
    patients.push(patient);
    return patient;
}

function isString(str: string) {
    return (
        Object.prototype.toString.call(str).toLowerCase().slice(8, -1) ===
        'string'
    );
}

function isDate(date: string) {
    return !!Date.parse(date);
}

function parseName(name: string): string {
    if (!name || !isString(name)) {
        throw new Error('Missing or invalid name');
    }

    return name;
}

function parseDate(date: string): string {
    if (!date || !isDate(date)) {
        throw new Error('Missing or invalid date');
    }

    return date;
}

function parseSsn(ssn: string): string {
    if (!ssn || !isString(ssn)) {
        throw new Error('Missing or invalid SSN');
    }

    return ssn;
}

function parseGender(gender: string): Gender {
    if (!gender) {
        throw new Error('Missing or invalid gender');
    }

    return gender as Gender;
}

function parseOccupation(occupation: string): string {
    if (!occupation || !isString(occupation)) {
        throw new Error('Missing or invalid occupation');
    }

    return occupation;
}

export function toNewPatient(body: any): NewPatient {
    const patient = {
        name: parseName(body.name),
        dateOfBirth: parseDate(body.dateOfBirth),
        ssn: parseSsn(body.ssn),
        gender: parseGender(body.gender),
        occupation: parseOccupation(body.occupation),
        entries: []
    };

    return patient;
}

function parseDescription(desc: string): string {
    if (!desc || !isString(desc)) {
        throw new Error('Missing or invalid description');
    }
    
    return desc;
}

function parseSpecialist(spec: string): string {
    if (!spec || !isString(spec)) {
        throw new Error('Missing or invalid specialist');
    }
    return spec;
}

function parseDiagnosisCodes(codes: string[]): string[] {
    return codes;
}

function parseSickLeave(leave: any): Record<string, string> {
    if (!leave.startDate || !leave.endDate) {
        throw new Error('Insufficient sick leave');
    }

    return leave;
}

function parseDischarge(discharge: any): Record<string, string> {
    if (!discharge.date || !discharge.criteria) {
        throw new Error('Invalid discharge');
    }
     
    return discharge;
}

function parseHealthCheckRating(rating: number): number {
    if (!rating || isNaN(rating)) {
        throw new Error('Invalid or missing health rating');
    }
    
    return rating;
}

function parseOccupationalHealthcareEntry(
    body: any
): Pick<OccupationalHealthcareEntry, 'type' | 'employerName' | 'sickLeave'> {
    return {
        type: 'OccupationalHealthcare',
        employerName: parseName(body.employerName),
        sickLeave: parseSickLeave(body.sickLeave)
    };
}

function parseHospitalEntry(
    body: any
): Pick<HospitalEntry, 'type' | 'discharge'> {
    return {
        type: 'Hospital',
        discharge: parseDischarge(body.discharge)
    };
}

function parseHealthCheckEntry(
    body: any
): Pick<HealthCheckEntry, 'type' | 'healthCheckRating'> {
    return {
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(body.healthCheckRating)
    };
}

export function toEntry(body: any): Entry {
    const entry = {
        id: v4(),
        description: parseDescription(body.description),
        date: parseDate(body.date),
        specialist: parseSpecialist(body.specialist),
        diagnosisCodes: parseDiagnosisCodes(body.diagnosisCodes)
    };

    switch (body.type) {
        case 'OccupationalHealthcare':
            return { ...entry, ...parseOccupationalHealthcareEntry(body) };
        case 'Hospital':
            return { ...entry, ...parseHospitalEntry(body) };
        case 'HealthCheck':
            return { ...entry, ...parseHealthCheckEntry(body) };
        default:
            throw new Error('Invalid entry type');
    }
}

export function addEntry(id: string, entry: Entry): Entry {
    const patient = patients.find(patient => patient.id === id);
    patient?.entries.push(entry);
    return entry;
}
