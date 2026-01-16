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
        // WEB: Use IntersectionObserver
        if (Platform.OS === 'web') {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAppeared) {
                            setHasAppeared(true);
                            opacity.value = withDelay(delay, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));
                            translateY.value = withDelay(delay, withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) }));
                            // Unobserve after triggering
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.05, rootMargin: '100px' } // Trigger earlier (100px before coming into view)
            );

            // We need to cast the ref to any or Element for the observer
            // On RN Web, the ref.current is the specific DOM node mostly or has setNativeProps
            // safer way for Expo Web is to select by ID or use findNodeHandle, but ref usually works on div
            if (viewRef.current) {
                // @ts-ignore
                observer.observe(viewRef.current);
            }

            return () => observer.disconnect();
        } else {
            // MOBILE: Fallback to simple mount animation (or implement elaborate scroll tracking)
            // For now, simpler is better for stability
            opacity.value = withDelay(delay, withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }));
            translateY.value = withDelay(delay, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
        }
    }, [delay]);

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
