import { State } from './state';
import { Patient, Diagnosis, HospitalEntry } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'UPDATE_PATIENT';
          payload: Patient;
      }
    | {
          type: 'SET_DIAGNOSE_LIST';
          payload: Diagnosis[];
      }
      | {
          type: 'ADD_ENTRY';
          payload: {
              id: string;
              entry: HospitalEntry;
          };
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case 'UPDATE_PATIENT':
            const p = state.patients[action.payload.id];
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                }
            };
        case 'SET_DIAGNOSE_LIST':
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
                        {}
                    )
                }
            };
        case 'ADD_ENTRY':
            const o = { ...state.patients[action.payload.id] };
            const entries = o.entries.concat(action.payload.entry);
            o.entries = entries;

            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: o
                }
            };
        default:
            return state;
    }
};
