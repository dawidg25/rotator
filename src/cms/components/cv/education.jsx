import React, {Component} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';

import commonStyles from './commonStyles';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
        marginLeft: '20'
    },
    years: {
        fontSize: '15',
        marginTop: '2'
    },
    withMargin: {
        marginLeft: 13
    },
    title: {
        paddingTop: 1,
        paddingBottom: 1,
    },
    grade: {
        fontSize: '14',
        fontWeight: 'bold'
    }

})
export default class Education extends Component {
    render() {
        return (
            <View style={commonStyles.wrapper}>
                <View style={commonStyles.bar}>
                    <Text style={commonStyles.barText}>Wykształcenie</Text>
                </View>
                <View style={commonStyles.content}>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <View style={commonStyles.mark}></View>
                            <Text style={styles.years}>2012 - 2016</Text>
                        </View>
                        <View style={styles.withMargin}>
                            <Text style={styles.title}>Państwowa Wyższa Szkoła Zawodowa w Nowym Sączu</Text>
                            <Text style={styles.grade}>inż. informatyk</Text>
                            {/* <Text>opis...</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
