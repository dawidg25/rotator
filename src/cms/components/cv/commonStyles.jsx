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
        paddingTop: 23,
        paddingBottom: 23,
        paddingLeft: 30,
        paddingRight: 30,
    },
    row: {
        flexDirection: 'row'
    },
    mark: {
        width: 7,
        height: 7,
        marginRight: 8,
        marginTop: 7,
        backgroundColor: '#31333F'
    }
})
export default styles;