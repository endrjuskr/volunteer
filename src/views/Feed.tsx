import React from 'react';
import { Animated, Easing, Image, Text, TextBase } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

interface Item {
    id: number;
    username: string;
    tags: string;
    music: string;
    likes: number;
    comments: number;
    uri: string;
}

interface Props {
    play: boolean;
    item: Item;
}

const Feed: React.FC<Props> = ({ play, item }) => {
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start();

    const styles = StyleSheet.create({
        view: {
            background: '#fff',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
    });

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
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>
            <View style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                marginTop: '160%',
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
                        color: 'white',
                        marginLeft: '2%'
                    }}>{item.username}</Text>
                </View>
                <Text style={{
                    marginTop: '2%',
                    color: 'white'
                }}>
                    {item.tags}
                </Text>
            </View>
        </View>
    );
};

export default Feed;
