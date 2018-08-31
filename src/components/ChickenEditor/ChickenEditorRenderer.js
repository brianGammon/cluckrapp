import React from 'react';
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import ChickenPhotoPicker from '../ChickenPhotoPicker';
import styles from './styles';

type Props = {
  form: any,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  handleSubmit: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
  error: string,
  originalPhotoUrl: string,
};

const ChickenEditorRenderer = ({
  form,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  handleSubmit,
  error,
  originalPhotoUrl,
  onSelectPhoto,
}: Props) => (
  <ScrollView>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.editorContainer}>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={form}
          render={({ invalid }) => (
            <View style={styles.formContainer}>
              <FieldControl
                name="name"
                render={FormInput}
                meta={{ label: 'Name', maxLength: 25 }}
              />

              <FieldControl
                name="breed"
                render={FormInput}
                meta={{
                  label: 'Breed',
                  maxLength: 25,
                }}
              />

              <FieldControl
                name="hatched"
                render={FormInput}
                meta={{
                  label: 'Hatched On',
                }}
              />

              <Field
                control={form.get('photoUrl')}
                strict={false}
                render={({ value: photoUrl }) => {
                  const { newImage } = form.value;
                  return (
                    <ChickenPhotoPicker
                      photoUrl={photoUrl}
                      newImage={newImage}
                      originalPhotoUrl={originalPhotoUrl}
                      onRemoveProfilePhoto={onRemoveProfilePhoto}
                      onResetProfilePhoto={onResetProfilePhoto}
                      onSelectPhoto={onSelectPhoto}
                    />
                  );
                }}
              />
              <Button disabled={invalid} onPress={handleSubmit} title="Save" />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  </ScrollView>
);

export default ChickenEditorRenderer;
