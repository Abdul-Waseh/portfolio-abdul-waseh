import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useResponsive } from '../hooks/useResponsive';

interface CertItem {
    year: string;
    title: string;
    issuer: string;
}

const CERT_DATA: CertItem[] = [
    { year: '2025', title: 'Google Cybersecurity Professional', issuer: 'Coursera' },
    { year: '2024', title: 'Ethical Hacking', issuer: 'EHunar' },
    { year: '2023', title: 'Programming Essentials in Python', issuer: 'Virtual University' },
];

export const Certifications = () => {
    const { isMobile } = useResponsive();

    return (
        <View style={styles.container}>
            {CERT_DATA.map((item, index) => (
                <View key={index} style={[styles.row, isMobile && { flexDirection: 'column', alignItems: 'flex-start' }]}>
                    <Text style={[styles.year, isMobile && { marginBottom: 4 }]}>{item.year}</Text>
                    <View style={styles.info}>
                        <Text style={[styles.title, { fontSize: isMobile ? 20 : 24 }]}>{item.title}</Text>
                        <Text style={styles.issuer}>{item.issuer}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark.border,
        alignItems: 'baseline',
    },
    year: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.dark.primary,
        width: 80, // Fixed width for alignment
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
    },
    title: {
        fontFamily: 'Anton_400Regular',
        color: Colors.dark.textHighlight,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    issuer: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.dark.secondary,
    }
});
