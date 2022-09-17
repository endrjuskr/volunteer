import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import PagerView from 'react-native-pager-view';

import server from '../../server.json';
import Feed from './Feed';

const Home: React.FC<any> = ({ navigation }) => {
    const [active, setActive] = useState(0);
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            background: 'red'
        }
    });
    return (
        <View style={styles.view}>
            <PagerView
                orientation="vertical"
                style={{ flex: 1 }}
                initialPage={0}
            >
                {server.feed.map(item => (
                    <View key={item.id}>
                        <TouchableHighlight style={{flex: 1}}
                            onPress={() => navigation.navigate('Details')}>
                            <Feed item={item} play={Number(item.id) === active} />
                        </TouchableHighlight>
                    </View>
                ))}
            </PagerView>
        </View>
    );
};

export default Home;
