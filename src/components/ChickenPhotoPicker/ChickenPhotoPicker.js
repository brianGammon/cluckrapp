/* @flow */
import React from 'react';
import { View, Button, Text } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';

type Props = {
  photoUrl: string,
  newImage: {
    mime: string,
    data: string,
  } | null,
  originalPhotoUrl: string,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
};

const ChickenPhotoPicker = ({
  photoUrl,
  newImage,
  originalPhotoUrl,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  onSelectPhoto,
}: Props) => {
  let imageSource = require('../../assets/default-profile-photo.png');
  if (photoUrl !== '') {
    imageSource = { uri: photoUrl };
  }
  if (newImage) {
    imageSource = {
      uri: `data:${newImage.mime};base64,${newImage.data}`,
    };
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Photo:</Text>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 200, height: 200 }} source={imageSource} />
        <View style={styles.photoControls}>
          {photoUrl !== ''
            && !newImage && (
              <Button onPress={onRemoveProfilePhoto} title="Remove" />
          )}
          {((originalPhotoUrl !== '' && photoUrl === '') || newImage) && (
            <Button onPress={onResetProfilePhoto} title="Reset" />
          )}
          <Button transparent onPress={() => onSelectPhoto(false)}>
            <Text>Select Photo</Text>
          </Button>
          <Button transparent onPress={() => onSelectPhoto(true)}>
            <Text>Take Photo</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChickenPhotoPicker;
