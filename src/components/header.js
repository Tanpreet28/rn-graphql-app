import * as React from 'react';
import {Appbar} from 'react-native-paper';

const Header = ({title, add, search, back, navigate, navigateIcon, close, deleteEvent}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={_goBack} />}
      <Appbar.Content title={title} />
      {deleteEvent && <Appbar.Action icon="delete" onPress={deleteEvent} />}
      {add && <Appbar.Action icon="account-plus" onPress={add} />}
      {navigate && <Appbar.Action icon={navigateIcon} onPress={navigate} />}
      {close && <Appbar.Action icon="close" onPress={close} />}
    </Appbar.Header>
  );
};

export default Header;
