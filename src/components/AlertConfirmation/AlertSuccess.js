/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

const AlertSuccess = (alertTitle, alertMsg) => {
  Alert.alert(
    alertTitle,
    alertMsg,
    [
      {
        text: 'OK',
        onPress: () => console.log('ok pressed'),
      },
    ],
    {
      cancelable: true,
      onDismiss: () => console.log('Dismiss'),
    },
  );
};

export default AlertSuccess;
