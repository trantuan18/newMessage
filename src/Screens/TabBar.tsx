// import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { signOut } from 'firebase/auth';
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

import Explore from './Explore';
import Messages from './Messages';
import Notification from './Notification';

const Tab = createBottomTabNavigator();

export default function MyTabs(props: any) {
    const user = props.route.params.user_id;
    const signOutNow = () => {
        signOut(auth).then(() => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }).catch((error) => { });
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({

            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })

    }, [props.navigation]);
    return (
        <Tab.Navigator initialRouteName='Explore'
            screenOptions={{
                tabBarActiveTintColor: '#FF6B76',
                tabBarStyle: {
                    backgroundColor: '#373838',
                    padding: 10
                },
            }}
        >
            <Tab.Screen name="Explore" component={Explore} initialParams={{ user_id: user }}
                options={() => ({
                    headerBackVisible: false,
                    headerShown: false,
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="explore" color={color} size={size} />
                    ),
                })} />
            <Tab.Screen name="Messages" component={Messages} initialParams={{ user_id: user }}
                options={() => ({
                    headerBackVisible: false,
                    headerShown: false,
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles-sharp" color={color} size={size} />
                    ),
                })} />
            <Tab.Screen name="Notification" component={Notification} initialParams={{ user_id: user }}
                options={() => ({
                    headerBackVisible: false,
                    headerShown: false,
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                })} />

        </Tab.Navigator>
    );
}