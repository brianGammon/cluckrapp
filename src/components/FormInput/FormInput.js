/* @flow */
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import errorMapper from '../../utils/errorMapper';
import styles from './styles';

type Props = {
  handler: () => void,
  touched: boolean,
  errors: {
    [errorKey: string]: any,
  } | null,
  meta: {
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
    mustMatchLabel: string,
    label: string,
    secureTextEntry: boolean,
    multiline: boolean,
    maxLength: number,
    numberOfLines: number,
    keyboardType: any,
  },
};

const FormInput = ({
  handler, touched, meta, errors,
}: Props) => {
  const error = errorMapper(errors, meta);
  return (
    <View style={styles.container}>
      <TextInput
        keyboardType={meta.keyboardType || null}
        maxLength={meta.maxLength || null}
        numberOfLines={meta.numberOfLines || null}
        multiline={meta.multiline}
        style={[styles.textInput, meta.multiline ? { height: 125 } : {}]}
        placeholder={`Enter ${meta.label}`}
        autoCapitalize={meta.autoCapitalize}
        secureTextEntry={meta.secureTextEntry}
        {...handler()}
      />
      <View style={{ height: 20 }}>
        <Text style={styles.error}>{touched && error}</Text>
      </View>
    </View>
  );
};

export default FormInput;