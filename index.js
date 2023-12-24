/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './src/Main';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/storages/store';
import {LogLevel, OneSignal} from 'react-native-onesignal';

const {store, persistor} = storage();

const AppID = '9fed0bad-fea6-4dc9-b4d5-d23857a12b7b';
class App extends Component {
  async componentDidMount() {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(AppID);
    OneSignal.Notifications.requestPermission(true);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
