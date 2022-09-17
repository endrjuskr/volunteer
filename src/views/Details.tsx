import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import PagerView from 'react-native-pager-view';

import server from '../../server.json';
import Feed from './Feed';

const Details: React.FC<any> = ({ navigation }) => {
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            background: '#000'
        }
    });
    return (
        <View style={styles.view}>
            <Button onPress={() => navigation.goBack()} title="back" />
            <Text>Blabla</Text>
        </View>
    );
};

export default Details;
