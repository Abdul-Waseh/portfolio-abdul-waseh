import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useResponsive } from '../hooks/useResponsive';

export type SectionId = 'hero' | 'about' | 'projects' | 'skills' | 'certs' | 'contact';

interface NavBarProps {
    activeSection: SectionId;
    onNavigate: (section: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; icon: string }[] = [
    { id: 'hero', icon: 'arrow-up' },
    { id: 'about', icon: 'user' },
    { id: 'projects', icon: 'briefcase' },
    { id: 'skills', icon: 'code' },
    { id: 'certs', icon: 'award' },
    { id: 'contact', icon: 'envelope' },
];

export const NavBar = ({ activeSection, onNavigate }: NavBarProps) => {
    const { isMobile } = useResponsive();

    // On mobile, hide the nav or change style?
    // Let's keep it but make it smaller or move to bottom right corner

    return (
        <View style={[styles.container, isMobile && { right: 10, bottom: 20, top: undefined }]}>
            <View style={[styles.dock, isMobile && { paddingVertical: 12, gap: 16 }]}>
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => onNavigate(item.id)}
                            style={[styles.iconButton, isActive && styles.activeButton]}
                            activeOpacity={0.7}
                        >
                            <FontAwesome5
                                name={item.icon as any}
                                size={isMobile ? 16 : 20}
                                color={isActive ? Colors.dark.primary : Colors.dark.secondary}
                            />
                            {isActive && <View style={styles.dot} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 30, // Right side
        top: 0,
        bottom: 0,
        justifyContent: 'center', // Center vertically
        zIndex: 1000,
        pointerEvents: 'box-none',
    },
    dock: {
        flexDirection: 'column', // Vertical stack
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        paddingVertical: 24,
        paddingHorizontal: 12,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        gap: 24,
        ...Platform.select({
            web: {
                backdropFilter: 'blur(10px)',
                boxShadow: '-4px 0 30px rgba(0, 0, 0, 0.5)', // Shadow to the left
            },
            default: {
                shadowColor: '#000',
                shadowOffset: { width: -5, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 10,
            }
        }),
    },
    iconButton: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    activeButton: {
        transform: [{ scale: 1.1 }],
    },
    dot: {
        position: 'absolute',
        left: 8, // Move slightly inward
        top: '50%',
        marginTop: -2,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.dark.primary,
    }
});
