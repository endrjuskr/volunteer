import React from "react";
import { Button } from "@react-native-material/core";
import { Image, StyleSheet, Text, View } from "react-native";
import GridImageView from "react-native-grid-image-viewer";
import { RootStackParamList } from "../common";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface DetailsProps
  extends NativeStackScreenProps<RootStackParamList, "Details"> {}

const Details: React.FC<DetailsProps> = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              style={styles.logo}
              source={{
                uri: item.logo,
              }}
            />
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <Button
        style={styles.apply}
        onPress={() => navigation.navigate("Submission")}
        title="I'm interested"
      />
      <View style={styles.galery}>
        <GridImageView data={item.reviews} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  header: {
    width: "100%",
    display: "flex",
    marginTop: "20%",
    paddingLeft: "5%",
  },
  headerTop: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "20%",
    paddingLeft: "5%",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username: {
    fontSize: 18,
    color: "black",
    marginLeft: "2%",
  },
  description: {
    marginTop: "5%",
    fontSize: 18,
    color: "black",
  },
  apply: { alignSelf: "center", marginTop: 40, backgroundColor: "#8A81F5" },
  galery: {
    display: "flex",
    flex: 1,
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "10%",
  },
});

export default Details;
