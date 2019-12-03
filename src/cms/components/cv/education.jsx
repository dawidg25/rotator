import React, {Component} from 'react';
import {Text, View} from '@react-pdf/renderer';

import commonStyles from './commonStyles';

export default class Education extends Component {
    render() {
        return (
            <View style={commonStyles.wrapper}>
                <View style={commonStyles.bar}>
                    <Text style={commonStyles.barText}>Wykształcenie</Text>
                </View>
                <View style={commonStyles.content}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi soluta vitae esse ut quos ad? Quibusdam nisi, odit quasi error enim quas quos fugit fugiat ab sit? Est, perferendis blanditiis.</Text>
                </View>
            </View>
        )
    }
}
