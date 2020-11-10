import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

export function getDiagnoses(): Diagnose[] {
    return diagnoseData;
}
