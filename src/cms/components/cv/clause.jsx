import React, {Component} from 'react';
import {Text, View, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    wrapper: {
	   fontSize: '12',
	   paddingLeft: 33,
	   paddingRight: 33,
	   paddingTop: 30	   
    }
});
export default class Clause extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text>
					Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb rekrutacji (zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)).
				</Text>
            </View>
        )
    }
}
