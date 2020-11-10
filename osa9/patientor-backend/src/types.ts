export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id'>;

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: Record<string, string>;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Record<string, string>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
