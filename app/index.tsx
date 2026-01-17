import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, StyleSheet, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { GlobalStyles } from '../src/styles/GlobalStyles';
import { Hero } from '../src/components/Header';
import { ProjectCard } from '../src/components/ProjectCard';
import { Colors } from '../src/constants/Colors';
import { AnimatedSection } from '../src/components/AnimatedSection';
import { LiveBackground } from '../src/components/LiveBackground';
import { CustomCursor } from '../src/components/CustomCursor';
import { SkillsGrid } from '../src/components/SkillsGrid';
import { Footer } from '../src/components/Footer';
import { About } from '../src/components/About';
import { Certifications } from '../src/components/Certifications';
import { NavBar, SectionId } from '../src/components/NavBar';
import { useResponsive } from '../src/hooks/useResponsive';

export default function App() {
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeSection, setActiveSection] = useState<SectionId>('hero');
    const sectionPositions = useRef<Record<SectionId, number>>({
        hero: 0, about: 0, projects: 0, skills: 0, certs: 0, contact: 0
    });
    const { isMobile, height: windowHeight } = useResponsive();

    // Fix for web overscroll white space
    if (typeof document !== 'undefined') {
        document.body.style.backgroundColor = Colors.dark.background;
    }

    const handleLayout = (id: SectionId) => (event: LayoutChangeEvent) => {
        // Add a small offset/bumber zone
        sectionPositions.current[id] = event.nativeEvent.layout.y;
    };

    const scrollTo = (id: SectionId) => {
        const y = sectionPositions.current[id];
        scrollViewRef.current?.scrollTo({ y: y, animated: true });
        setActiveSection(id);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        const screenHeight = event.nativeEvent.layoutMeasurement.height;
        const triggerPoint = scrollY + (screenHeight / 3); // Trigger when section hits top 1/3 of screen

        const positions = sectionPositions.current;
        if (triggerPoint >= positions.contact) setActiveSection('contact');
        else if (triggerPoint >= positions.certs) setActiveSection('certs');
        else if (triggerPoint >= positions.skills) setActiveSection('skills');
        else if (triggerPoint >= positions.projects) setActiveSection('projects');
        else if (triggerPoint >= positions.about) setActiveSection('about');
        else setActiveSection('hero');
    };

    const sectionStyle = [
        GlobalStyles.section,
        // Ensure minimum height matches window height for desktop "snap" feel, 
        // but allow auto for mobile scrolling.
        { minHeight: isMobile ? 'auto' : windowHeight } as any
    ];

    return (
        <View style={GlobalStyles.container}>
            <StatusBar style="light" />
            {/* <LiveBackground /> */}
            <CustomCursor />

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={[
                    GlobalStyles.contentContainer,
                    isMobile && { paddingRight: 24, paddingHorizontal: 20, paddingBottom: 40 }
                ]}
                onScroll={handleScroll}
                scrollEventThrottle={16} // smooth updates
                showsVerticalScrollIndicator={false}
            >
                {/* HERO */}
                <View onLayout={handleLayout('hero')} style={sectionStyle}>
                    <Hero />
                </View>

                {/* ABOUT */}
                <View onLayout={handleLayout('about')} style={sectionStyle}>
                    <AnimatedSection delay={100}>
                        <About />
                    </AnimatedSection>
                </View>

                {/* PROJECTS */}
                <View onLayout={handleLayout('projects')} style={sectionStyle}>
                    <AnimatedSection delay={200}>
                        <Text style={[GlobalStyles.sectionTitle, isMobile && { fontSize: 36, marginTop: 40 }]}>Selected Works</Text>

                        <ProjectCard
                            index="01"
                            title="Home Services Platform"
                            techStack="HTML • CSS • JS • PHP"
                            description="A responsive platform for booking home services with admin controls."
                        />

                        <ProjectCard
                            index="02"
                            title="Student Management"
                            techStack="Java • Swing • MySQL"
                            description="Desktop application for managing institutional student records and data."
                        />

                        <ProjectCard
                            index="03"
                            title="Library System"
                            techStack="Java • Swing • SQL"
                            description="GUI-based library management for book tracking and user checkouts."
                        />
                    </AnimatedSection>
                </View>

                {/* SKILLS */}
                <View onLayout={handleLayout('skills')} style={sectionStyle}>
                    <AnimatedSection delay={300}>
                        <Text style={[GlobalStyles.sectionTitle, isMobile && { fontSize: 36, marginTop: 40 }]}>My Stack</Text>
                        <SkillsGrid />
                    </AnimatedSection>
                </View>

                {/* CERTIFICATIONS */}
                <View onLayout={handleLayout('certs')} style={sectionStyle}>
                    <AnimatedSection delay={350}>
                        <Text style={[GlobalStyles.sectionTitle, isMobile && { fontSize: 36, marginTop: 40 }]}>Credentials</Text>
                        <Certifications />
                    </AnimatedSection>
                </View>

                {/* FOOTER */}
                <View onLayout={handleLayout('contact')} style={sectionStyle}>
                    <AnimatedSection delay={400}>
                        <Footer />
                    </AnimatedSection>
                </View>

            </ScrollView>

            {/* FLOATING NAV */}
            <NavBar activeSection={activeSection} onNavigate={scrollTo} />
        </View>
    );
}

const styles = StyleSheet.create({
    // Most styles moved to GlobalStyles or Components
});
