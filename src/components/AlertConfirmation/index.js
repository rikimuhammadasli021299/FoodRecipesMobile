/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

const AlertConfirmation = ({alertTitle, alertMsg, action}) => {
  Alert.alert(alertTitle, alertMsg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => action(),
    },
  ]);
};

export default AlertConfirmation;
