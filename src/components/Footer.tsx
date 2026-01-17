import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { Colors } from '../constants/Colors';
import { useResponsive } from '../hooks/useResponsive';

export const Footer = () => {
    const { isMobile } = useResponsive();

    return (
        <View style={[styles.container, { marginTop: isMobile ? 60 : 100 }]}>
            <Text style={styles.sub}>GOT A PROJECT?</Text>
            <Text style={[styles.heading, { fontSize: isMobile ? 36 : 60 }]}>LET'S WORK</Text>
            <Text style={[styles.heading, styles.highlight, { fontSize: isMobile ? 36 : 60 }]}>TOGETHER</Text>

            <TouchableOpacity onPress={() => Linking.openURL('mailto:waseh905@gmail.com')}>
                <Text style={[styles.email, { fontSize: isMobile ? 16 : 18 }]}>waseh905@gmail.com</Text>
            </TouchableOpacity>
            <Text style={styles.copyright}>© 2026 Abdul Waseh</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        alignItems: 'center',
        paddingVertical: 60,
    },
    sub: {
        fontFamily: 'Inter_400Regular',
        color: Colors.dark.primary,
        letterSpacing: 2,
        marginBottom: 20,
    },
    heading: {
        fontFamily: 'Anton_400Regular',
        color: Colors.dark.textHighlight,
    },
    highlight: {
        color: Colors.dark.secondary, // Or outline
        opacity: 0.5,
    },
    email: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: Colors.dark.text,
        marginTop: 40,
    },
    copyright: {
        marginTop: 80,
        color: '#333',
    }
});
