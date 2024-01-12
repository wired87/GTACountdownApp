import React from "react";
import {View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator} from "react-native";

interface CountdownProps {
  timeRemaining: any;
}





const CustomCountdown: React.FC<CountdownProps> = (
  {
    timeRemaining,
  }
) => {

  const renderItem = ({ item }) => (
    <View style={styles.unitContainer}>
      <Text style={styles.label}>{item[0].toUpperCase()}</Text>
      <Text style={styles.value}>{item[1]}</Text>
    </View>
  );

  return(
    <View style={styles.container}>
      <FlatList
        horizontal
        data={Object.entries(timeRemaining)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 0,
  },

  unitContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    fontFamily: "GTA",
    color: "white",
    textAlign: "center"
  },
  value: {
    textAlign: "center",
    fontSize: 50,
    fontFamily: "GTA",
    color: "white",
  },
});

export default CustomCountdown;
