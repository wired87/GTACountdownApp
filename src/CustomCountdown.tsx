import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface CountdownProps {
  targetDate: number;
}

interface TimeRemaining {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CustomCountdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining()
  );
 
 
  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeRemaining();
      setTimeRemaining(remainingTime);

      if (
        remainingTime.years === 0 &&
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
       
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const c_days = Math.floor(difference / (1000 * 60 * 60 * 24));
      var years = 0;
      if (c_days > 365) {
        years = Math.floor(c_days / 365);
      }
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365);

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { years, days, hours, minutes, seconds };
    } else {
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  return (
    <View style={styles.container}>
      {Object.entries(timeRemaining).map(([unit, value]) => (
        <View key={unit} style={styles.unitContainer}>
          <Text style={styles.label}>{unit.toUpperCase()}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  unitContainer: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'pink',
    height: 100,
    width: 75,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 20,
    fontFamily: "GTA",
    color: "white",
    marginBottom: 10,
  },
  value: {
    fontSize: 50,
    fontFamily: "GTA",
    color: "white",
    elevation: 50,
  },
});

export default CustomCountdown;
