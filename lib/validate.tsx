interface LoginValue {
  email: string;
  password: string;
}

type Validate = {
  email: string;
  password: string;
};
export default function loginValidate(values: LoginValue) {
  const errors = {} as Validate;
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // validation for password
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  return errors;
}

interface ConfirmPassword {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type Registraion = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export function registrationValidation(values: ConfirmPassword) {
  const errors = {} as Registraion;

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.includes(' ')) {
    errors.username = 'Invalid Username...!';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // validation for password
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less then 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  // validate confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password Not Match...!';
  } else if (values.confirmPassword.includes(' ')) {
    errors.confirmPassword = 'Invalid Confirm Password';
  }

  return errors;
}
