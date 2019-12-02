import React, {Component} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column'
    },
    bar: {
        backgroundColor: '#31333F',
        paddingTop: 8,
        paddingBottom: 8
    },
    barText: {
        textTransform: 'uppercase',
        color: '#D4D7E0',
        textAlign: 'center',
        fontSize: 18
    },
    content: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    }
})
export default class Profile extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.bar}>
                    <Text style={styles.barText}>O mnie</Text>
                </View>
                <View style={styles.content}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi soluta vitae esse ut quos ad? Quibusdam nisi, odit quasi error enim quas quos fugit fugiat ab sit? Est, perferendis blanditiis.</Text>
                </View>
            </View>
        )
    }
}
