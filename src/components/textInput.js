import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Title, Avatar, TextInput, Button} from 'react-native-paper';

export const TextInputComponent = ({
  label,
  value,
  disabled,
  changeFieldText,
}) => {
  const changeText = (val) => {
    value = val;
    changeFieldText(label, val);
  };

  return (
    <View>
      <TextInput
        label={label}
        value={value}
        disabled={disabled}
        mode={'outlined'}
        style={styles.input}
        onChangeText={(val) => changeText(val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
