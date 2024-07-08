
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import WebView from "react-native-webview";
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height;
const logo = require('../src/images/2.png')

const WebViewScreen = ({ navigation, url = null }) => {
  const [load, setLoad] = useState(false);
  const refWebView = useRef(null)
  // const scr = `document.getElementById("close-bar").click()`;
  const scr = `<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">`;

  return (
    <View style={{ backgroundColor: '#fff', flex: 1, }}>
      {!load &&
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#012039" />
        </View>
      }
      <WebView
        ref={refWebView}
        onLoad={() => setLoad(true)}
        source={{ uri: url == null ? 'https://www.adbadger.com/blog/' : url }}
        javaScriptEnabled
        injectedJavaScript={scr}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 100
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  input: {
    height: height / 8,
    width: width * 0.9,
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
    borderRadius: 10
  },
  btn: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#003e7e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  }
});


export default WebViewScreen;