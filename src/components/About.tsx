import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useResponsive } from '../hooks/useResponsive';

export const About = () => {
    const { isMobile } = useResponsive();

    return (
        <View style={[styles.container, { marginBottom: isMobile ? 60 : 80, marginTop: isMobile ? 20 : 40 }]}>
            <Text style={GlobalStyles.subheading}>INTRODUCTION</Text>
            <Text style={[styles.heading, { fontSize: isMobile ? 32 : 48 }]}>ABOUT ME</Text>
            <Text style={GlobalStyles.text}>
                I am a passionate Software Engineer based in Islamabad, dedicated to building high-performance applications that solve real-world problems. With a rigorous academic background and hands-on experience in full-stack development, I thrive on turning complex requirements into seamless, user-centric digital solutions.
            </Text>
            <Text style={[GlobalStyles.text, { marginTop: 20 }]}>
                My technical arsenal is diverse, spanning from modern web technologies like React and Tailwind to robust mobile applications using Flutter and native Android. I believe in writing clean, maintainable code and am constantly exploring new tools to optimize performance and user experience.
            </Text>
            <Text style={[GlobalStyles.text, { marginTop: 20 }]}>
                Beyond coding, I have a deep-rooted interest in Cybersecurity. My certification in Google Cybersecurity and Ethical Hacking drives me to advocate for secure architecture in every project I touch. I am eager to contribute to innovative teams where I can leverage my skills in both development and security to create impactful software.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 80,
        marginTop: 40,
    },
    heading: {
        fontFamily: 'Anton_400Regular',
        color: Colors.dark.textHighlight,
        marginBottom: 24,
        textTransform: 'uppercase',
    }
});
