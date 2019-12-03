import {StyleSheet} from '@react-pdf/renderer';

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
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
    },
    row: {
        flexDirection: 'row'
    }
})
export default styles;