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

const NUM_PARTICLES = 80;

// Use React.memo to prevent re-renders unless props change (which they shouldn't)
const Particle = React.memo(({ index }: { index: number }) => {
    // Re-calculate initial positions if dimensions change? 
    // Actually, just initial random pos is fine, but bounds should be dynamic?
    // For simplicity, we keep them roaming, but maybe ensure they wrap correctly.
    // Let's just pass dimensions to ensure re-render on resize if needed or just bounds.

    // Simplification: React Native Reanimated might need shared values updated if we want strict bounds.
    // But for "black screen", the issue is likely the Container size not updating or the Canvas equivalent.

    // Wait, the container uses StyleSheet.absoluteFillObject. That should auto-resize.
    // The issue might be the Particles are positioned initially based on small/large screen and don't update?
    // If you minimize, width decreases. Particles at x=1900 might be off screen?
    // The user said "website become black", implying content disappears?
    // OR maybe "black" means the background is there but content is gone?
    // If *everything* is black, maybe the background layer is covering content?
    // zIndex is -1, so it should be behind.

    // Let's ensure the initial random positions use the current dimensions.
    // Use Percentage for initial position!
    // This allows the browser/native layout to handle resize automatically.
    const initialX = Math.random() * 100; // 0-100%
    const initialY = Math.random() * 100; // 0-100%
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
                    left: `${initialX}%`,
                    top: `${initialY}%`,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
                animatedStyle,
            ]}
        />
    );
});

export const LiveBackground = () => {
    // Key by dimensions to force re-render/re-distribute particles on drastic resize?
    // Or just let them be. The "Black" screen might be the particles bunching up or something?
    // Actually, if I minimize, width < old_width. Particles at x > new_width are invisible. 
    // If I maximize, width > old_width. Particles are only in the top-left corner?
    // Re-mounting particles on resizing might be heavy but fixes distribution.

    // No need for window dimensions tracking anymore!
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
