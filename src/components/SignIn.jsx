import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';
import { useSignIn } from '../hooks/useSignIn';

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
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({
  onSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
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
      />
      {touched.username && errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.password && errors.password && styles.textInputError,
        ]}
        placeholder="Password"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
      />
      {touched.password && errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
    </View>

    <Pressable style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Sign in</Text>
    </Pressable>
  </View>
);

export const SignInContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, values, errors, touched, handleChange, handleBlur }) => (
      <SignInForm
        onSubmit={handleSubmit}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    )}
  </Formik>
);

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log('Sign in failed:', e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;