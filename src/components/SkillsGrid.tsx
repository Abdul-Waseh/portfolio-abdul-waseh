import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useResponsive } from '../hooks/useResponsive';

// Define icon mapping type
type IconLib = 'FontAwesome5' | 'MaterialCommunityIcons' | 'FontAwesome6' | 'Image';

interface SkillItem {
    name: string;
    icon?: string;
    imageUrl?: string;
    lib: IconLib;
    color: string;
}

const SKILL_DATA: Record<string, SkillItem[]> = {
    FRONTEND: [
        { name: 'React', icon: 'react', lib: 'MaterialCommunityIcons', color: '#61DAFB' },
        { name: 'HTML5', icon: 'html5', lib: 'FontAwesome5', color: '#E34F26' },
        { name: 'CSS3', icon: 'css3-alt', lib: 'FontAwesome5', color: '#1572B6' },
        {
            name: 'JS',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
            lib: 'Image',
            color: '#F7DF1E'
        },
    ],
    BACKEND: [
        { name: 'Python', icon: 'python', lib: 'FontAwesome5', color: '#3776AB' },
        { name: 'Java', icon: 'java', lib: 'FontAwesome5', color: '#007396' },
        { name: 'PHP', icon: 'php', lib: 'FontAwesome5', color: '#777BB4' },
        { name: 'MySQL', icon: 'database', lib: 'FontAwesome5', color: '#4479A1' },
    ],
    'MOBILE DEV': [
        {
            name: 'Flutter',
            imageUrl: 'https://storage.googleapis.com/cms-storage-bucket/0dbfcc7a59cd1cf16282.png',
            lib: 'Image',
            color: '#02569B'
        },
        { name: 'Dart', icon: 'code-braces', lib: 'MaterialCommunityIcons', color: '#0175C2' },
        { name: 'Android', icon: 'android', lib: 'FontAwesome5', color: '#3DDC84' },
    ],
    TOOLS: [
        { name: 'Git', icon: 'git-alt', lib: 'FontAwesome5', color: '#F05032' },
        { name: 'Linux', icon: 'linux', lib: 'FontAwesome5', color: '#FCC624' },
        { name: 'Wireshark', icon: 'network-wired', lib: 'FontAwesome5', color: '#1679A7' },
    ]
};

const SkillIcon = ({ item, isMobile }: { item: SkillItem, isMobile: boolean }) => {
    const size = isMobile ? 28 : 36;

    const renderIcon = () => {
        if (item.lib === 'Image' && item.imageUrl) {
            return (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: size, height: size, resizeMode: 'contain' }}
                />
            );
        }

        const IconComponent = item.lib === 'FontAwesome5' ? FontAwesome5 :
            item.lib === 'FontAwesome6' ? FontAwesome6 :
                MaterialCommunityIcons;
        return <IconComponent name={item.icon as any} size={size} color={item.color} />;
    };

    return (
        <View style={[styles.skillItem, { borderColor: '#222', width: isMobile ? 80 : 100, height: isMobile ? 80 : 100 }]}>
            {renderIcon()}
            <Text style={[styles.skillName, { color: item.color, opacity: 0.8, fontSize: isMobile ? 10 : 12 }]}>{item.name}</Text>
        </View>
    );
};

export const SkillsGrid = () => {
    const { isMobile } = useResponsive();

    return (
        <View style={styles.container}>
            {Object.entries(SKILL_DATA).map(([category, skills]) => (
                <View key={category} style={styles.group}>
                    <Text style={[styles.categoryTitle, { fontSize: isMobile ? 20 : 24 }]}>{category}</Text>
                    <View style={[styles.grid, { gap: isMobile ? 12 : 16 }]}>
                        {skills.map((skill) => (
                            <SkillIcon key={skill.name} item={skill} isMobile={isMobile} />
                        ))}
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
    group: {
        marginBottom: 40,
    },
    categoryTitle: {
        fontFamily: 'Anton_400Regular',
        color: Colors.dark.textHighlight,
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillItem: {
        backgroundColor: '#0a0a0a',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    skillName: {
        fontFamily: 'Inter_400Regular',
        marginTop: 12,
        fontWeight: '600',
        textAlign: 'center',
    }
});
