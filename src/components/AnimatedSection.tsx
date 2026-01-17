import React, { useEffect, useRef, useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing
} from 'react-native-reanimated';
import { ViewStyle, Platform, View } from 'react-native';

interface AnimatedSectionProps {
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle | ViewStyle[];
}

export const AnimatedSection = ({ children, delay = 0, style }: AnimatedSectionProps) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(50);
    const [hasAppeared, setHasAppeared] = useState(false);

    // Ref for the view
    const viewRef = useRef<View>(null);

    useEffect(() => {
        // SIMPLIFIED DEBUG: Always animate in on mount
        // This removes the IntersectionObserver crash risk on resize
        setHasAppeared(true);
        opacity.value = withDelay(delay, withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }));
        translateY.value = withDelay(delay, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <Animated.View ref={viewRef as any} style={[style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};
