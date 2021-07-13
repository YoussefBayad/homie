import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import ErrorText from '../../components/ErrorText';
import Button from '../../components/forms/Button';
import Label from '../../components/forms/Label';
import Google from '../../components/GoogleLogin/GoogleLogin';

const Signup = () => {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.auth.error);
  const [error, setError] = useState('');

  // formik setup
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('This field is required'),
    email: Yup.string()
      .email('invalid email')
      .required('This field is required'),
    password: Yup.string().min(6).required('This field is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    try {
      // Sign Up
      dispatch(register(values));
      // onSubmitProps.resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login'>
      <h1 className='title'>Sign up</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}>
        <Form>
          {error && <ErrorText>{error}</ErrorText>}
          <Label htmlFor='username'>Name</Label>
          <Field
            id='username'
            type='name'
            placeholder='Enter your name'
            name='username'
          />
          <ErrorMessage name='username' component={ErrorText} />
          <Label htmlFor='email'>Email</Label>
          <Field
            id='email'
            type='email'
            placeholder='email@example.com'
            name='email'
          />
          <ErrorMessage name='email' component={ErrorText} />
          <Label htmlFor='password'>Password</Label>

          <Field
            id='password'
            type='password'
            placeholder='Password'
            name='password'
          />
          <ErrorMessage name='password' component={ErrorText} />

          <Button type='submit' className='btn'>
            sign up
          </Button>
        </Form>
      </Formik>
      <Google />
      <h4>
        Already have an account ? <Link to='/login'>Login Now</Link>{' '}
      </h4>
    </div>
  );
};

export default Signup;
