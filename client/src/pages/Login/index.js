import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../components/ErrorText';
import Button from '../../components/forms/Button';
import Label from '../../components/forms/Label';
import { login as loginCall } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// style
import './style.scss';
import Google from '../../components/GoogleLogin/GoogleLogin';

const Login = () => {
  const dispatch = useDispatch();
  const { error: loginError, loading } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid Email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    try {
      dispatch(loginCall(values));
      // onSubmitProps.resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login'>
      <h1 className='title'>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={onSubmit}>
        <Form>
          {error && <ErrorText>{error}</ErrorText>}
          {loginError && <ErrorText>{loginError}</ErrorText>}
          <Label htmlFor='email'>Email</Label>
          <Field
            id='email'
            type='email'
            placeholder='Enter your email'
            name='email'
          />
          <ErrorMessage component={ErrorText} name='email' />
          <Label htmlFor='password'>Password</Label>

          <Field
            id='password'
            type='password'
            placeholder='Password'
            name='password'
          />
          <ErrorMessage component={ErrorText} name='password' />

          <Button type='submit' disabled={loading}>
            Login
          </Button>
        </Form>
      </Formik>

      <Google />
      <h4>
        Don't have an account ? <Link to='/signup'>SignUp</Link>{' '}
      </h4>
    </div>
  );
};

export default React.memo(Login);
