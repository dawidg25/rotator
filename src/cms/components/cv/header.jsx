import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from '@react-pdf/renderer';

import cvImage from '../../assets/cv/cv.jpg';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#F8CB4C',
        padding: 30,
        color: '#31333F',
    },
    headerInfo: {
       
    },
    headerInfoName: {
        borderBottom: '2 solid #31333F',
        textTransform: 'uppercase',
        fontSize: 25,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 2,
        fontWeight: 'bold'
    },
    image: {
        width: 113,
        height: 113,
        border: '4 solid #fff',
        borderRadius: '60'
    },
    nameContainer: {
        marginLeft: 80,
        marginTop: 15
    },  
    vitaeText: {
        fontSize: 17,
        marginTop: 10,
        textTransform: 'uppercase',
        marginLeft: 67
    }
})
export default class header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View>
                    <Image src={cvImage} style={styles.image}/>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.headerInfoName}>
                        Dawid Górszczyk
                    </Text>
                    <Text style={styles.vitaeText}>
                        Curriculum Vitae
                    </Text>
                </View>
            </View>
        )
    }
}
