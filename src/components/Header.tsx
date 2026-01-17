import React from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { Colors } from '../constants/Colors';
import { GlobalStyles } from '../styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import { AnimatedSection } from './AnimatedSection';
import { useResponsive } from '../hooks/useResponsive';

export const Hero = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    // Responsive font sizes
    const roleTextSize = isMobile ? 48 : isTablet ? 80 : 120;
    const roleLineHeight = isMobile ? 54 : isTablet ? 90 : 130;
    const greetingSize = isMobile ? 14 : 16;
    const bioSize = isMobile ? 16 : 18;

    return (
        <View style={[styles.container, { paddingTop: isMobile ? 80 : 120 }]}>
            <AnimatedSection delay={100}>
                <Text style={[styles.greeting, { fontSize: greetingSize }]}>HI, I'M ABDUL WASEH</Text>
            </AnimatedSection>

            <AnimatedSection delay={200}>
                <Text style={[styles.roleText, { fontSize: roleTextSize, lineHeight: roleLineHeight }]}>SOFTWARE</Text>
            </AnimatedSection>
            <AnimatedSection delay={300}>
                <Text style={[
                    styles.roleText,
                    styles.highlightText,
                    { fontSize: roleTextSize, lineHeight: roleLineHeight }
                ]}>ENGINEER</Text>
            </AnimatedSection>

            <AnimatedSection delay={400} style={[styles.bioContainer, isMobile ? styles.bioContainerMobile : {}]}>
                <View style={[styles.line, isMobile ? { height: 80, minHeight: 0 } : {}]} />
                <Text style={[styles.bio, { fontSize: bioSize }]}>
                    I build high-performance applications with a focus on cybersecurity and modern architecture.
                </Text>
            </AnimatedSection>

            <AnimatedSection delay={600} style={styles.socialRow}>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Abdul-Waseh')}>
                    <FontAwesome5 name="github" size={isMobile ? 24 : 28} color={Colors.dark.text} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/abdul-waseh-65195827a/')}>
                    <FontAwesome5 name="linkedin" size={isMobile ? 24 : 28} color={Colors.dark.text} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:waseh905@gmail.com')}>
                    <FontAwesome5 name="envelope" size={isMobile ? 24 : 28} color={Colors.dark.text} style={styles.icon} />
                </TouchableOpacity>
            </AnimatedSection>

            <AnimatedSection delay={800} style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.resumeButton}
                    onPress={() => {
                        if (Platform.OS === 'web') {
                            window.open('/resume.pdf', '_blank');
                        } else {
                            Linking.openURL('/resume.pdf');
                        }
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.resumeButtonText}>View Resume</Text>
                </TouchableOpacity>
            </AnimatedSection>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
        paddingBottom: 80,
        justifyContent: 'center',
    },
    greeting: {
        fontFamily: 'Inter_400Regular',
        color: Colors.dark.primary,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    roleText: {
        fontFamily: 'Anton_400Regular',
        color: Colors.dark.textHighlight,
        textTransform: 'uppercase',
    },
    highlightText: {
        color: Colors.dark.textHighlight,
        ...Platform.select({
            web: {
                WebkitTextStroke: `2px ${Colors.dark.primary}`,
                color: 'transparent',
            }
        })
    },
    bioContainer: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: 600,
    },
    bioContainerMobile: {
        marginTop: 30,
    },
    line: {
        width: 2,
        height: '100%',
        backgroundColor: Colors.dark.primary,
        marginRight: 20,
        minHeight: 60,
    },
    bio: {
        ...GlobalStyles.text,
        color: Colors.dark.secondary,
        flex: 1,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 24,
    },
    icon: {
        opacity: 0.8,
    },
    buttonContainer: {
        marginTop: 40,
    },
    resumeButton: {
        borderWidth: 1,
        borderColor: Colors.dark.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 255, 157, 0.05)',
    },
    resumeButtonText: {
        fontFamily: 'Inter_400Regular',
        color: Colors.dark.primary,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    }
});

