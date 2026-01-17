import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
    const { width, height } = useWindowDimensions();

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const isLargeDesktop = width >= 1440;

    return {
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        // Helping values for conditional styles
        paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
        contentWidth: isDesktop ? 1200 : '100%',
    };
};
