import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
    TextField,
    SelectField,
    GenderOption,
    DiagnosisSelection
} from './FormField';
import { Gender, Patient, HospitalEntry } from '../types';
import { useStateValue } from '../state';

export type PatientFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: PatientFormValues) => void;
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'Hospital',
                date: '',
                specialist: '',
                description: '',
                diagnosisCodes: [],
                discharge: {
                    date: '',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}>
            {({ dirty, setFieldTouched, setFieldValue, setValues, status }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Date'
                            placeholder='Date'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            placeholder='Specialist'
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                        />
                        <Field
                            label='Description'
                            placeholder='Description'
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Discharge date'
                            placeholder='Discharge date'
                            name='discharge.date'
                            component={TextField}
                        />
                        <Field
                            label='Discharge criteria'
                            placeholder='Discharge criteria'
                            name='discharge.criteria'
                            component={TextField}
                        />
                        <Button
                            type='submit'
                            floated='right'
                            color='green'
                            disabled={!dirty}>
                            Add
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
