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
        <View style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
            <View style={[
                styles.dock,
                isMobile && styles.mobileDock
            ]}>
                {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => onNavigate(item.id)}
                            style={[
                                styles.iconButton,
                                isActive && styles.activeButton,
                                isMobile && { padding: 8 } // Smaller touch target padding
                            ]}
                            activeOpacity={0.7}
                        >
                            <FontAwesome5
                                name={item.icon as any}
                                size={isMobile ? 18 : 20}
                                color={isActive ? Colors.dark.primary : Colors.dark.secondary}
                            />
                            {/* Dot indicator styling for horizontal layout */}
                            {isActive && <View style={[
                                styles.dot,
                                isMobile && {
                                    top: undefined,
                                    bottom: -4,
                                    left: '50%',
                                    marginLeft: -2,
                                    marginTop: 0
                                }
                            ]} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    desktopContainer: {
        position: 'absolute',
        right: 30, // Right side
        top: 0,
        bottom: 0,
        justifyContent: 'center', // Center vertically
        zIndex: 1000,
        pointerEvents: 'box-none',
    },
    mobileContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        alignItems: 'center', // Center horizontally
        zIndex: 1000,
        pointerEvents: 'box-none',
        // Explicitly NO 'top' here
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
    mobileDock: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 20,
        borderRadius: 30,
        ...Platform.select({
            web: {
                boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.5)', // Shadow upwards
            }
        })
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
