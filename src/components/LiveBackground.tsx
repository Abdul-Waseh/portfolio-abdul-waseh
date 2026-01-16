import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withDelay,
    Easing,
    withSequence,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const NUM_PARTICLES = 80; // More particles

const Particle = ({ index }: { index: number }) => {
    const initialX = Math.random() * width;
    const initialY = Math.random() * height;
    const size = Math.random() * 3 + 1;

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(Math.random() * 0.5 + 0.2);

    useEffect(() => {
        // Random movement pattern
        const durationX = Math.random() * 5000 + 5000;
        const durationY = Math.random() * 5000 + 5000;

        translateX.value = withRepeat(
            withSequence(
                withTiming(Math.random() * 100 - 50, { duration: durationX, easing: Easing.inOut(Easing.sin) }),
                withTiming(Math.random() * 100 - 50, { duration: durationX, easing: Easing.inOut(Easing.sin) })
            ),
            -1,
            true
        );

        translateY.value = withRepeat(
            withSequence(
                withTiming(Math.random() * 100 - 50, { duration: durationY, easing: Easing.inOut(Easing.sin) }),
                withTiming(Math.random() * 100 - 50, { duration: durationY, easing: Easing.inOut(Easing.sin) })
            ),
            -1,
            true
        );

        opacity.value = withRepeat(
            withTiming(Math.random() * 0.8 + 0.2, { duration: Math.random() * 3000 + 2000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ],
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[
                styles.particle,
                {
                    left: initialX,
                    top: initialY,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
                animatedStyle,
            ]}
        />
    );
};

export const LiveBackground = () => {
    return (
        <View style={styles.container} pointerEvents="none">
            {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        backgroundColor: Colors.dark.background,
        zIndex: -1,
    },
    particle: {
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
});
