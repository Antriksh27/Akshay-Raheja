import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import NowFeed from '@/components/sections/NowFeed';
import Recreations from '@/components/sections/Recreations';
import FilmographyLegacy from '@/components/sections/FilmographyLegacy';
import SoundIdentity from '@/components/sections/SoundIdentity';
import Press from '@/components/sections/Press';
import Contact from '@/components/sections/Contact';
import LiveTransition from '@/components/sections/LiveTransition';
import RunwayPerformances from '@/components/sections/RunwayPerformances';
import RedBreak from '@/components/sections/RedBreak';
import MarqueeTicker from '@/components/ui/MarqueeTicker';
import SectionStrobe from '@/components/ui/SectionStrobe';

export default function Home() {
  return (
    <>
      <SectionStrobe />
      <Nav />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <div className="relative z-10 bg-bg-base">
          <RunwayPerformances />
          <RedBreak />
          <NowFeed />
          <MarqueeTicker />
          <Recreations />
          <FilmographyLegacy />
          <SoundIdentity />
          <LiveTransition />
          <Press />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
