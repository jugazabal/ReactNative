import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { Navigate, useNavigate } from 'react-router-native';
import * as yup from 'yup';
import Text from '../components/Text';
import theme from '../theme';
import { useCreateReview } from '../hooks/useCreateReview';
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .integer('Rating must be an integer')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().nullable(),
});

const CreateReviewForm = ({
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
          touched.ownerName && errors.ownerName && styles.textInputError,
        ]}
        placeholder="Repository owner name"
        value={values.ownerName}
        onChangeText={handleChange('ownerName')}
        onBlur={handleBlur('ownerName')}
        testID="repositoryOwnerNameInput"
      />
      {touched.ownerName && errors.ownerName ? (
        <Text style={styles.errorText}>{errors.ownerName}</Text>
      ) : null}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.repositoryName && errors.repositoryName && styles.textInputError,
        ]}
        placeholder="Repository name"
        value={values.repositoryName}
        onChangeText={handleChange('repositoryName')}
        onBlur={handleBlur('repositoryName')}
        testID="repositoryNameInput"
      />
      {touched.repositoryName && errors.repositoryName ? (
        <Text style={styles.errorText}>{errors.repositoryName}</Text>
      ) : null}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          touched.rating && errors.rating && styles.textInputError,
        ]}
        placeholder="Rating between 0 and 100"
        value={values.rating}
        onChangeText={handleChange('rating')}
        onBlur={handleBlur('rating')}
        keyboardType="numeric"
        testID="ratingInput"
      />
      {touched.rating && errors.rating ? (
        <Text style={styles.errorText}>{errors.rating}</Text>
      ) : null}
    </View>

    <View style={styles.fieldContainer}>
      <TextInput
        style={[
          styles.textInput,
          styles.textArea,
          touched.text && errors.text && styles.textInputError,
        ]}
        placeholder="Review"
        value={values.text}
        onChangeText={handleChange('text')}
        onBlur={handleBlur('text')}
        multiline
        testID="reviewTextInput"
      />
      {touched.text && errors.text ? (
        <Text style={styles.errorText}>{errors.text}</Text>
      ) : null}
    </View>

    <Pressable
      style={[styles.button, submitting && styles.buttonDisabled]}
      onPress={onSubmit}
      disabled={submitting}
      testID="submitReviewButton"
    >
      <Text style={styles.buttonText}>Create a review</Text>
    </Pressable>
  </View>
);

export const CreateReviewContainer = ({ onSubmit, submitting = false }) => (
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
      <CreateReviewForm
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

const CreateReview = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useCurrentUser();
  const [createReview, { loading: mutationLoading }] = useCreateReview();

  const handleSubmit = async (values, helpers) => {
    const { ownerName, repositoryName, rating, text } = values;
    const { setSubmitting, resetForm } = helpers;

    try {
      const reviewInput = {
        ownerName: ownerName.trim(),
        repositoryName: repositoryName.trim(),
        rating: Number(rating),
      };

      if (text && text.trim()) {
        reviewInput.text = text.trim();
      }

      const createdReview = await createReview(reviewInput);
      const repositoryId = createdReview?.repositoryId;

      if (repositoryId) {
        resetForm();
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (error) {
      console.log('Failed to create review:', error.message);
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

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <CreateReviewContainer onSubmit={handleSubmit} submitting={mutationLoading} />;
};

export default CreateReview;
