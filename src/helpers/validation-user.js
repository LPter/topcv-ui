import * as yup from 'yup';

let userSchema = yup.object().shape({
    email: yup.string().required('Email required').email('Email invalid'),
    password: yup.string().required('Password is required'),
    // .matches(/^(?=.*[A-Za-z])(?=.*\d){8,}$/, 'Password invalid'),
});

let userSchemaSignUp = yup.object().shape({
    username: yup.string().required('Display name required'),
    email: yup.string().required('Email required').email('Email invalid'),
    password: yup.string().required('Password is required'),
    passwordAuth: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    // .matches(/^(?=.*[A-Za-z])(?=.*\d){8,}$/, 'Password invalid'),
});

export { userSchema, userSchemaSignUp };
