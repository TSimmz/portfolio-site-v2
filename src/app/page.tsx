import About from '~/sections/About/About';
import Contact from '~/sections/Contact/Contact';
import Hero from '~/sections/Hero/Hero';
import Portfolio from '~/sections/Portfolio/Portfolio';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </>
  );
}

export default HomePage;
