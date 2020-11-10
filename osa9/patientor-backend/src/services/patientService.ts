/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { v4 } from 'uuid';
import patientData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatient, Gender } from '../types';

const patients: Patient[] = patientData.map((patient) => ({
    ...patient,
    gender: patient.gender as Gender
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
