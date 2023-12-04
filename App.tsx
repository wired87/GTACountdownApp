import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, Platform, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import * as Font from "expo-font";
import CustomCountdown from "./src/CustomCountdown";
import { ImageBackground } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

const windowWidth = Dimensions.get('window').width;

interface AppProps {}

// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitIdBannerAd = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
    "ca-app-pub-2225753085204049/2862976257" :
    "ca-app-pub-2225753085204049/8777981057"
/*
<BannerAd
unitId={adUnitIdBannerAd}
size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
requestOptions={{
requestNonPersonalizedAdsOnly: true,
}}
/>*/
const App : React.FC<AppProps> = () => {
  
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while fetching fonts
        await SplashScreen.preventAutoHideAsync();

        // Load your fonts
        await Font.loadAsync({
          GTA: require("./assets/fonts/pricedow.ttf"),
        });

        // Fonts are loaded, we can set appLoaded to true
        setAppLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    }

    prepare().then(r => console.log("Fonts have been successfully loaded!"));
  }, []);

  if (!appLoaded) {
    return <ActivityIndicator size={20} />;
  }

  // Calculate the target date for December 25, 2024
  const targetDate = new Date("2023-12-25T00:00:00").getTime();

  return (
    <View
      style={styles.container}>
      <View style={styles.topBanner}>
        <BannerAd
          unitId={adUnitIdBannerAd}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}/>
      </View>
        <Text style={styles.title}>Trailer Release</Text>
        <CustomCountdown targetDate={targetDate} />
      <View style={styles.bottomBanner}>
        <BannerAd
          unitId={adUnitIdBannerAd}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1b",
    resizeMode:'contain'
  },
  title: {
    fontSize: 50,
    color: "white",
    marginBottom: 20,
    fontFamily: "GTA",
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    width: windowWidth,
    height: 100,
  },
  topBanner: {
    position: "absolute",
    top: 0,
    width: windowWidth,
    height: 100,
  }
});

export default App;
