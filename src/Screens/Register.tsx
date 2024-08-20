import React, { useState, Fragment } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text, SafeAreaView, TextInput, ImageBackground, Alert } from 'react-native'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Register = (props: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('https://robohash.org/default');
    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const register = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), { uid: user.uid, email: email, name: name, req: [], realFriend: [], avatar: avatar });

                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://robohash.org/default',
                })

                    .then(() => {
                        Alert.alert('Registered, please login.');
                        props.navigation.navigate('Login');
                    })
                    .catch((error) => {
                        Alert.alert(error.message);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });

    }

    const generate = () => {
        if (name != '') {
            setAvatar('https://robohash.org/' + name)
            console.log(avatar)
        } else {
            Alert.alert("Please enter your name!")
        }
    }

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
                        <Text style={styles.textLabel}>Name</Text>
                        <TextInput
                            placeholder='Enter your name'
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.textLabel}>Email</Text>
                        <TextInput
                            placeholder='Enter your email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.textLabel} >Password</Text>
                        <TextInput
                            placeholder='Enter your password'
                            value={password} onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 20, marginTop: 5 }}>
                        <Image source={{ uri: avatar }} style={{ width: 60, height: 60, marginBottom: 5 }} />
                        <TouchableOpacity
                            onPress={() => {
                                generate();
                            }
                            }
                            style={{
                                backgroundColor: '#A8A8A8',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                width: '50%',
                                borderRadius: 5,
                                // marginBottom: 10
                            }}>
                            <Text style={{
                                textAlign: 'center', color: '#FFFFFF'
                            }}>Generating Your Avatar</Text>
                        </TouchableOpacity>


                    </View>
                    {/* <TextInput
                placeholder='Enter your image url'
                label='Profile Picture'
                value = {avatar}
                onChangeText={text => setAvatar(text)}
            /> */}
                    <TouchableOpacity
                        onPress={() => {
                            register();
                        }
                        }
                        style={{
                            backgroundColor: '#4E50F7',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            width: '70%', borderRadius: 15,
                            marginBottom: 10
                        }}>
                        <Text style={{
                            textAlign: 'center', color: '#FFFFFF', fontSize: 18
                        }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Login');
                        }
                        }
                        style={{
                            backgroundColor: '#414242',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            width: '70%', borderRadius: 15,
                        }}>
                        <Text style={{
                            textAlign: 'center', color: '#FFFFFF', fontSize: 18
                        }}>Back</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: Dimensions.get('window').height
    },
    button: {
        width: 370,
        marginTop: 10
    },
    smallScreen: {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(212,60,71,0.2)',
        paddingTop: 40,
        padding: 20,
        paddingBottom: 0.2 * Dimensions.get('window').height,
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

export default Register;