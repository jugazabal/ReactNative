import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { Navigate, useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useCreateUser } from '../hooks/useCreateUser';
import { useSignIn } from '../hooks/useSignIn';
import { useCurrentUser } from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: theme.fontSizes.body,
  },
  textInputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({
  onSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  submitting,
}) => (
  <View style={styles.container}>
    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.username && errors.username && styles.textInputError,
        ]}
        placeholder="Username"
        value={values.username}
        onChangeText={handleChange('username')}
        onBlur={handleBlur('username')}
        autoCapitalize="none"
        testID="signUpUsernameInput"
      />
      {touched.username && errors.username ? (
        <Text style={styles.errorText}>{errors.username}</Text>
      ) : null}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.password && errors.password && styles.textInputError,
        ]}
        placeholder="Password"
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        secureTextEntry
        testID="signUpPasswordInput"
      />
      {touched.password && errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.passwordConfirmation &&
            errors.passwordConfirmation &&
            styles.textInputError,
        ]}
        placeholder="Password confirmation"
        value={values.passwordConfirmation}
        onChangeText={handleChange('passwordConfirmation')}
        onBlur={handleBlur('passwordConfirmation')}
        secureTextEntry
        testID="signUpPasswordConfirmationInput"
      />
      {touched.passwordConfirmation && errors.passwordConfirmation ? (
        <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
      ) : null}
    </View>

    <Pressable
      style={[styles.button, submitting && styles.buttonDisabled]}
      onPress={onSubmit}
      disabled={submitting}
      testID="signUpSubmitButton"
    >
      <Text style={styles.buttonText}>Sign up</Text>
    </Pressable>
  </View>
);

export const SignUpContainer = ({ onSubmit, submitting = false }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({
      handleSubmit,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting,
    }) => (
      <SignUpForm
        onSubmit={handleSubmit}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        submitting={isSubmitting || submitting}
      />
    )}
  </Formik>
);

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser, { loading: createUserLoading }] = useCreateUser();
  const [signIn] = useSignIn();
  const { currentUser, loading } = useCurrentUser();

  const handleSubmit = async (values, helpers) => {
    const { setSubmitting } = helpers;
    const username = values.username.trim();
    const password = values.password;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log('Sign up failed:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <SignUpContainer onSubmit={handleSubmit} submitting={createUserLoading} />;
};

export default SignUp;
