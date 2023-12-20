/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

const AlertUploadPhoto = ({alertTitle, alertMsg, camera, gallery}) => {
  Alert.alert(alertTitle, alertMsg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Camera', onPress: () => camera()},
    {text: 'Gallery', onPress: () => gallery()},
  ]);
};

export default AlertUploadPhoto;
