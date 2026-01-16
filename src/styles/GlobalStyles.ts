import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';

const { height } = Dimensions.get('window');

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingRight: 100, // Extra padding for right-side navbar
        paddingBottom: 100,
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    headingFont: {
        fontFamily: 'Anton_400Regular',
        textTransform: 'uppercase',
    },
    bodyFont: {
        fontFamily: 'Inter_400Regular',
    },
    sectionTitle: {
        fontFamily: 'Anton_400Regular',
        fontSize: 48, // HUGE section titles
        color: Colors.dark.textHighlight,
        marginTop: 60,
        marginBottom: 20,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    subheading: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: Colors.dark.primary,
        marginBottom: 8,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    text: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: Colors.dark.text,
        lineHeight: 28,
        opacity: 0.8,
    },
    section: {
        minHeight: height, // Full screen height
        justifyContent: 'center', // Center content vertically
        paddingVertical: 20,
    }
});
