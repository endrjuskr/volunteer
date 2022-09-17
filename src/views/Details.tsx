import React, { useState } from 'react';
import { Button } from "@react-native-material/core";
import { Image, StyleSheet, Text, View } from 'react-native';
import ImageView from "react-native-image-viewing";
import GridImageView from 'react-native-grid-image-viewer';



const Details: React.FC<any> = ({ route, navigation }) => {
    const styles = StyleSheet.create({
        view: {
            
        }
    });
    const { item } = route.params;
    const [visible, setIsVisible] = useState(false);
    const images = [
        {
          uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
        },
        {
          uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
        },
        {
          uri: "https://media2.giphy.com/media/l4RKn5iJiOEsECiJhf/giphy.gif?cid=ecf05e4771fae016fbb199effb55842f9d9857eb417b0707&rid=giphy.gif&ct=g",
        },
      ];
    return (
        <View style={{
            display: 'flex',
            height: '100%'
        }}>
            <View style={styles.view}>
                <View style={{
                    width: '100%',
                    display: 'flex',
                    marginTop: '20%',
                    paddingLeft: '5%',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                            }}
                            source={{
                                uri: 'https://avatars3.githubusercontent.com/u/45601574',
                            }}
                        />
                        <Text style={{
                            fontSize: 18,
                            color: 'black',
                            marginLeft: '2%'
                        }}>{item.username}</Text>
                    </View>
                    <Text style={{
                        marginTop: '5%',
                        fontSize: 18,
                        color: 'black'
                    }}>
                        {item.description}
                    </Text>
                </View>
            </View>
            <Button style={{ alignSelf: "center", marginTop: 40 }} onPress={() => navigation.navigate('Submittion')} title="I'm interested"></Button>
            <View style={{display: 'flex', flex: 1, marginLeft: '5%', marginRight: '5%', marginTop: '10%'}}>
            <GridImageView data={images.map(a => a.uri)} />
            </View>
        </View>
    );
};

export default Details;
