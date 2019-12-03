import React, {Component} from 'react';
import {Text, View, StyleSheet, Link} from '@react-pdf/renderer';

import commonStyles from './commonStyles';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    content: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 16
    },
    link: {
        textDecoration: 'none'
    },  
    tel: {
        flexDirection: 'row',
        marginLeft: 80
    },
    mail: {
        flexDirection: 'row',
        marginLeft: 50
    },
    linkedin: {
        flexDirection: 'row',
        marginLeft: 120,
        marginTop: 10
    },  
    icon: {
        marginRight: 20
    }
})
export default class Contact extends Component {
    render() {
        return (
            <View style={commonStyles.wrapper}>
                <View style={commonStyles.bar}>
                    <Text style={commonStyles.barText}>Kontakt</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <View style={styles.tel}>
                            <Text style={styles.icon}>o</Text>
                            <Text>507 804 924</Text>
                        </View>
                        <View style={styles.mail}>
                            <Text style={styles.icon}>o</Text>
                            <Link style={styles.link} src={'mailto:dawidg25@gmail.com'}>dawidg25@gmail.com</Link>
                        </View>
                    </View>
                    <View>
                        <View style={styles.linkedin}>
                            <Text style={styles.icon}>o</Text>
                            <Link style={styles.link} src={'www.linkedin.com/in/d-gorszczyk'}>www.linkedin.com/in/d-gorszczyk</Link>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
