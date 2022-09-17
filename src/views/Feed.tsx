import React from 'react';
import { Animated, Easing } from 'react-native';
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
        <>
            {/* <LinearGradient
                colors={['rgba(0,0,0,.3)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '70%',
                }}
            /> */}
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
            {/* <LinearGradient
                colors={['transparent', 'rgba(0,0,0,.4)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '50%',
                }}
            /> */}
        </>
    );
};

export default Feed;
