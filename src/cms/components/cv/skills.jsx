import React, {Component} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';
import commonStyles from './commonStyles';

const struct = [
    [
        {text: 'HTML'},
        {text: 'CSS'}
    ],
    [
        {text: 'JavaScript'},
        {text: 'React'},
        {text: 'Node.js'},
    ],
    [
        
        {text: 'PHP'},
        {text: 'MySQL'},
        {text: 'MongoDB'}
    ],
    [
        {text: 'Git'},
        {text: 'Angielski B2'}
    ]
]
const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    column: {
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: 2
    },
    mark: {
        width: 7,
        height: 7,
        marginRight: 8,
        marginTop: 7,
        backgroundColor: '#31333F'
    }
})

export default class Skills extends Component {
    render() {
        return (
            <View style={commonStyles.wrapper}>
                <View style={commonStyles.bar}>
                    <Text style={commonStyles.barText}>Umiejętności</Text>
                </View>
                <View style={styles.content}>
                    {struct.map((column, index) => {
                        return (
                            <View key={index} style={styles.column}>
                                {column.map((item, itemIndex) => {
                                    return (
                                        <View style={styles.row}>
                                            <View style={styles.mark}></View>
                                            <Text key={itemIndex}>{item.text}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}
