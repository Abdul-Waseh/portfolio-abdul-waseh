import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface SkillBadgeProps {
    skill: string;
}

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>{skill}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'rgba(0, 255, 157, 0.1)', // Primary with opacity
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    text: {
        color: Colors.dark.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
