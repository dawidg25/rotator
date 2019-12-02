import React, {Component} from 'react';
import {PDFViewer, Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import '../../scss/vitae.scss'

import Header from './header';
import Profile from './profile';

import RobotoRegular from '../../assets/cv/Roboto-Regular.ttf';
import RobotoBold from '../../assets/cv/Roboto-Bold.ttf';
Font.register({family: 'Roboto', src: RobotoRegular, fontStyle: 'normal', fontWeight: 'normal'});
Font.register({family: 'Roboto', src: RobotoBold, fontStyle: 'normal', fontWeight: 'bold'});




const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontFamily: 'Roboto',
        color: '#31333F'
    }
});

export default class Vitae extends Component {
    render() {
        return (
            <section className="cv container">
                <PDFViewer>
                    <Document title="Curriculum Vitae" author='Dawid Górszczyk' creator='Dawid Górszczyk'>
                        <Page size="A4" style={styles.page}>
                            <Header />
                            <Profile />
                        </Page>
                    </Document>
                </PDFViewer>
            </section>   
        )
    }
}