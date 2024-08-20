import { View, Text, ImageBackground, Dimensions, StyleSheet, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GlobalContext } from '../Context';
export default function Login(props: any) {

  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const openRegisterScreen = () => {
    props.navigation.navigate('Register');
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user)
        console.log('signInWithEmailAndPassword', userCredential.user)
        props.navigation.navigate('MyTab', { user_id: userCredential.user.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
    >
      <ImageBackground
        source={require('../images/Chat_app.png')}
        style={styles.container}
        resizeMode='stretch'
      >
        <View style={styles.smallScreen}>
          <View style={styles.viewInput}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              placeholder='Enter your email'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              placeholder='Enter your password'
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>


          <TouchableOpacity
            onPress={() => {
              signin();
            }
            }
            style={{
              backgroundColor: '#414242',
              paddingHorizontal: 5,
              paddingVertical: 10,
              width: '70%', borderRadius: 15,
              marginTop: 30,
              marginBottom: 15
            }}>
            <Text style={{
              textAlign: 'center', color: '#FFFFFF', fontSize: 18
            }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openRegisterScreen();
            }
            }
            style={{
              backgroundColor: '#4E50F7',
              paddingHorizontal: 5,
              paddingVertical: 10,
              width: '70%', borderRadius: 15,
            }}>
            <Text style={{
              textAlign: 'center', color: '#FFFFFF', fontSize: 18
            }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: '#4E50F7',
    width: '100%', height: Dimensions.get('window').height
  },
  button: {
    width: 0.7 * Dimensions.get('window').width,
    marginTop: 10,
    // color: '#4E50F7'
  },
  smallScreen: {
    width: Dimensions.get('window').width,
    // flex: 1,
    paddingBottom: 0.2 * Dimensions.get('window').height,
    paddingTop: 40,
    backgroundColor: 'rgba(212,60,71,0.2)',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textLabel: {
    paddingBottom: 5,
    fontSize: 18,
  },
  viewInput: {
    width: '70%',
    marginBottom: 5
  }
});