import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import PagerView from "react-native-pager-view";

import server from "../../server.json";
import Feed from "./Feed";
import { RootStackParamList } from "../common";

export interface HomeProps
  extends NativeStackScreenProps<RootStackParamList, "Home"> {}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const styles = StyleSheet.create({
    view: {
      flex: 1,
    },
  });
  return (
    <View style={styles.view}>
      <PagerView
        onPageSelected={(e) => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {server.feed.map((item) => (
          <View key={item.id}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={() => navigation.navigate("Details", { item })}
            >
              <Feed item={item} play={Number(item.id) === active} />
            </TouchableHighlight>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default Home;
