import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const DialogComponent = ({title, description, dialogEvent, cancelDialog}) => {
  const [visible, setVisible] = useState(true);

  const hideDialog = () => {
    setVisible(false);
    cancelDialog();
  };

  return (
    <View>
      <Portal style={{elevation: 3}}>
        <Dialog visible={visible}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{description}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={dialogEvent}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogComponent;
