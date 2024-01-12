import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import * as Font from "expo-font";
import CustomCountdown from "./src/CustomCountdown";
import * as SplashScreen from 'expo-splash-screen';

const windowWidth = Dimensions.get('window').width;


interface TimeRemaining {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


// GOOGLE ADMOB
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitIdBannerAdHeader = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
    "ca-app-pub-2225753085204049/9660357854" :
    "ca-app-pub-2225753085204049/6545425146"


const adUnitIdBannerAdFooter = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios" ?
    "ca-app-pub-2225753085204049/5721112841" :
    "ca-app-pub-2225753085204049/1293098467"


const App : React.FC = () => {
  
  const [appLoaded, setAppLoaded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null as TimeRemaining
  );

  const bannerRefHeader = useRef(null);
  const bannerRefFooter = useRef(null);


  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          GTA: require("./assets/fonts/pricedow.ttf"),
        });

        setAppLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare()
      .then(() => console.log("Fonts successfully loaded"));
  }, []);

  useEffect(() => {
    if (appLoaded) {
      setTimeRemaining(calculateTimeRemaining());
    }
  }, [appLoaded]);


  const timer = useCallback(() => {
    if (appLoaded && timeRemaining) {
      return(
        <CustomCountdown timeRemaining={timeRemaining} />
      )
    }else {
      return(
        <ActivityIndicator size={"large"} color={"white"} />
      );

    }
  }, [appLoaded, timeRemaining]);


  const targetDate = new Date("2025-01-04T00:00:00-00:00").getTime();

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const c_days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let years = 0;
      if (c_days > 365) {
        years = Math.floor(c_days / 365);
      }

      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365);

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(
        { years, days, hours, minutes, seconds }
      )

    } else {
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }


  useEffect(() => {
    if (appLoaded) {
      const interval = setInterval(() => {
        calculateTimeRemaining();
      }, 1000);
      return () => clearInterval(interval);
    }

  }, [timeRemaining, appLoaded]);


  return (
    <SafeAreaView
      style={styles.container}>

      <View style={styles.topBanner}>
        <BannerAd
          unitId={adUnitIdBannerAdHeader}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdFailedToLoad={() => {
            bannerRefHeader.current?.loadAd();
          }}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Release Countdown</Text>
      </View>

      {timer()}

      <View style={styles.bottomBanner}>
        <BannerAd
          unitId={adUnitIdBannerAdFooter}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdFailedToLoad={() => {
            bannerRefFooter.current?.loadAd();
          }}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}/>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1b",
    flexDirection: "column"
  },
  titleContainer: {
    width: windowWidth,
    paddingVertical: 40,
    zIndex: 49,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  titleNumber: {
    fontSize: 450,
    color: "orange",
    marginBottom: 20,
    fontFamily: "GTA",
    position: "absolute",
  },
  title: {
    zIndex: 50,
    fontSize: 50,
    color: "white",
    fontFamily: "GTA",
    textAlign: "center"
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0,
    width: windowWidth,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  topBanner: {
    top: 20,
    position: "absolute",
    width: windowWidth,
  }
});

export default App;
