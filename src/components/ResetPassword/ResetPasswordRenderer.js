import * as React from 'react';
import { FieldGroup, FieldControl } from 'react-reactive-form';
import {
  Text, Button, Form, Spinner,
} from 'native-base';
import FormInput from '../FormInput';
import AuthContainer from '../Auth/AuthContainer';
import AuthExtraLink from '../Auth/AuthExtraLink';
import styles from './styles';

type Props = {
  navigation: any,
  inProgress: boolean,
  form: any,
  error: string,
  successMessage: string,
  handleSubmit: () => void,
};

const ResetPasswordRenderer = ({
  navigation,
  form,
  error,
  inProgress,
  successMessage,
  handleSubmit,
}: Props) => (
  <AuthContainer
    title="Reset Password"
    error={error}
    extraLinks={[
      <AuthExtraLink
        key={0}
        message="Return to Sign In?"
        buttonText="Go Back"
        handlePress={() => navigation.goBack()}
      />,
    ]}
  >
    {!error
      && !successMessage && (
        <Text style={styles.message}>
          Enter your email address to receive a password reset email.
        </Text>
    )}
    {successMessage
      && !error && <Text style={styles.success}>{successMessage}</Text>}
    <FieldGroup
      control={form}
      strict={false}
      render={({ invalid }) => (
        <Form>
          <FieldControl
            name="email"
            render={formProps => <FormInput {...formProps} />}
            meta={{
              label: 'Email',
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
          />

          <Button
            style={{ marginTop: 10 }}
            block
            onPress={handleSubmit}
            disabled={invalid || inProgress}
          >
            {!inProgress && <Text>Send Email</Text>}
            {inProgress && <Spinner size="small" color="white" />}
          </Button>
        </Form>
      )}
    />
  </AuthContainer>
);

export default ResetPasswordRenderer;
