import HeroSection from '@/components/features/home/hero-section';
import GalleryMasonry from '@/components/features/home/gallery';
import Testimonials from '@/components/features/home/testimonials';
import RoomsSuites from '@/components/features/home/room-suites';
import ActivitiesSlider from '@/components/features/home/activities-slider';
import AboutSection from '@/components/features/home/about';
import ExperiencesSlider from '@/components/features/home/experience-slider';
import {getExperienceSlides} from '@/lib/constants/home';
import {getTranslations} from 'next-intl/server';

export default async function HomePage() {
    const t = await getTranslations('ExperiencesSlider');

    const sliderContent = getExperienceSlides(t);
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ExperiencesSlider sliderContent={sliderContent} />
            <RoomsSuites />
            <ActivitiesSlider />
            <Testimonials />
            <GalleryMasonry />
        </>
    );
}
