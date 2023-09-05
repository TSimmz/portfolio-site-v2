import About from '~/sections/About/About';
import Contact from '~/sections/Contact/Contact';
import Hero from '~/sections/Hero/Hero';
import Portfolio from '~/sections/Portfolio/Portfolio';
import StarField from '~/components/three-js/StarField';

function HomePage() {
  return (
    <main
      id="home"
      className="relative mx-auto flex min-h-screen max-w-4xl flex-auto flex-col items-center justify-center overflow-x-hidden px-2 md:max-w-5xl"
    >
      <StarField />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </main>
  );
}

export default HomePage;
