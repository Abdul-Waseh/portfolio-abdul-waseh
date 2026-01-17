import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import { GlobalStyles } from '../styles/GlobalStyles';
import * as Linking from 'expo-linking';

interface ProjectCardProps {
    index: string; // "01", "02"
    title: string;
    techStack: string;
    description: string;
    link?: string;
}

import { useResponsive } from '../hooks/useResponsive';

export const ProjectCard = ({ index, title, techStack, description, link }: ProjectCardProps) => {
    const [hovered, setHovered] = useState(false);
    const { isMobile } = useResponsive();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => link && Linking.openURL(link)}
            {...Platform.select({
                web: {
                    onMouseEnter: () => setHovered(true),
                    onMouseLeave: () => setHovered(false),
                }
            })}
            style={[
                styles.container,
                hovered && styles.containerHover
            ]}
        >
            <View style={styles.topRow}>
                <Text style={[styles.index, hovered && styles.textHighlight]}>{index}.</Text>
                <View style={styles.textColumn}>
                    <Text style={[styles.title, hovered && styles.titleHover, { fontSize: isMobile ? 24 : 32 }]}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.techStack}>{techStack}</Text>
                </View>
            </View>
            <View style={[styles.separator, hovered && styles.separatorHighlight]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingVertical: 20,
        opacity: 0.7, // Default to slightly dim
        transition: 'all 0.3s ease', // Web transition
    } as any, // 'transition' is web-only
    containerHover: {
        opacity: 1,
        transform: [{ translateX: 10 }], // Slide right on hover
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    index: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: Colors.dark.secondary,
        marginRight: 24,
        fontWeight: 'bold',
    },
    textColumn: {
        flex: 1,
    },
    title: {
        fontFamily: 'Anton_400Regular',
        fontSize: 32,
        color: Colors.dark.textHighlight,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    titleHover: {
        color: Colors.dark.primary,
    },
    description: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: Colors.dark.secondary,
        maxWidth: '90%',
        lineHeight: 24,
        marginBottom: 12,
    },
    techStack: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.dark.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    separator: {
        height: 1,
        backgroundColor: Colors.dark.border,
        width: '100%',
        marginTop: 10,
    },
    separatorHighlight: {
        backgroundColor: Colors.dark.primary,
    },
    textHighlight: {
        color: Colors.dark.primary,
    }
});
