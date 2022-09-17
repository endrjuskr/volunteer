import React from "react";
import { Animated, Easing, Image, Text, TextBase } from "react-native";
import { StyleSheet, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Item } from "../common";

interface FeedProps {
  play: boolean;
  item: Item;
}

const Feed: React.FC<FeedProps> = ({ play, item }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  return (
    <View style={styles.view}>
      <View style={styles.view}>
        <Video
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={play}
          isLooping
          style={styles.video}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerHeader}>
          <Image
            style={styles.logo}
            source={{
              uri: item.logo,
            }}
          />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.tags}>{item.tags}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    background: "#fff",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  footer: {
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: "160%",
    paddingLeft: "5%",
  },
  footerHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username: {
    fontSize: 18,
    color: "white",
    marginLeft: "2%",
  },
  tags: {
    marginTop: "2%",
    color: "white",
  },
});

export default Feed;
