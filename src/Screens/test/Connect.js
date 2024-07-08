import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from 'react-native';
import {isIphoneX} from '../../helper/CheckIphoneX';
import WebView from 'react-native-webview';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const camp = require('../../images/fb.png');
const Connect = ({navigation}) => {
  const check = () => {
    navigation.navigate('LoginFaceBook');
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      '"Chat app" \n Wants to Use \n "facebook.com" to Sign In',
      'This allows the app and website to share infomation about you',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Continue', onPress: () => check()},
      ],
    );

  const openLinkPolicy = () => {
    Linking.openURL('https://www.facebook.com/privacy/policy/').catch(err =>
      console.error('Error', err),
    );
  };
  const openLinkCreate = () => {
    Linking.openURL('https://www.facebook.com/reg/').catch(err =>
      console.error('Error', err),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SafeAreaView
        style={{marginTop: isIphoneX() ? 100 : 80, alignItems: 'center'}}>
        {/* {isIphoneX() } */}

        <View
          style={{
            alignItems: 'center',
            width: width * 0.8,
            height: height * 0.7,
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'column',

              alignItems: 'center',
              marginBottom: 40,
            }}>
            <Image
              source={camp}
              style={{alignSelf: 'center', height: 80, width: 80}}
              resizeMode="contain"
            />

            <Text
              style={{
                fontWeight: '700',
                fontSize: 30,
                marginTop: 50,
                textAlign: 'center',
              }}>
              Chat app
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.btn} onPress={createTwoButtonAlert}>
            <Text style={{color: '#fff', fontWeight: '700'}}>
              Login With Facebook{' '}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={openLinkPolicy}>
              <Text>Privacy Policy </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openLinkCreate}>
              <Text style={{}}>Create an Account </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: width * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 10,
  },
  des: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 10,
  },
  btn: {
    width: width * 0.9,
    height: 40,
    backgroundColor: '#1A73E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Connect;
