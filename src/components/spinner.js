import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Spinner = ({animating}) => {
  return (
    <ActivityIndicator
      size="large"
      style={{position: 'absolute', top: '46%', left: '46%', elevation: 4}}
      animating={animating}
    />
  );
};

export default Spinner;
