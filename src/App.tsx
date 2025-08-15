import "./App.css";
import { type Movie } from "./data/Movies.interface";
import { Header } from "./components/Header/Header";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Footer } from "./components/Footer/Footer";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const moviesRef = useRef<Movie[] | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = async () => {
    if (!moviesRef.current) {
      const { default: data } = await import('./data/movies.json');
      moviesRef.current = data as Movie[];
    }

    const data = moviesRef.current!;
    const randomMovie = data[Math.floor(Math.random() * data.length)];
    setCurrentMovie(randomMovie);

    if (buttonRef.current) {
      gsap.to(window, {
        scrollTo: {
          y: buttonRef.current,
          offsetY: 24
        },
        duration: 0.2,
        ease: 'power1.out'
      })
    }
  };

  useLayoutEffect(() => {
    if (currentMovie && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }
  }, [currentMovie]);

  return (
    <>
      <Header />
      <main className="main">
        <Button
          ref={buttonRef}
          title={"Рандомый фильм"}
          onClick={handleButtonClick}
        />
        {currentMovie && (
          <Card
            ref={cardRef}
            image={currentMovie.image}
            title={currentMovie.title}
            rating={currentMovie.rating}
            year={currentMovie.year}
            description={currentMovie.description}
            onClick={() => {}}
          />
        )}
      </main>
      <Footer text={"Made in 2025 with"} />
    </>
  );
}

export default App;
