import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import NowFeed from '@/components/sections/NowFeed';
import Recreations from '@/components/sections/Recreations';
import FilmographyLegacy from '@/components/sections/FilmographyLegacy';
import SoundIdentity from '@/components/sections/SoundIdentity';
import Press from '@/components/sections/Press';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <NowFeed />
        <Recreations />
        <FilmographyLegacy />
        <SoundIdentity />
        <Press />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
