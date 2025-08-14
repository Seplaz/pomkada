import "./App.css";
import { type Movie } from "./data/Movies.interface";
import data from "./data/movies.json";
import { Header } from "./components/Header/Header";
import { Button } from "./components/Button/Button";
import { Card } from "./components/Card/Card";
import { Footer } from "./components/Footer/Footer";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function App() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = () => {
    const randomMovie = data[Math.floor(Math.random() * data.length)];
    setCurrentMovie(randomMovie);
  };

  useLayoutEffect(() => {
    if (currentMovie && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          height: 0,
        },
        {
          opacity: 1,
          height: "auto",
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }
  }, [currentMovie]);

  return (
    <>
      <Header />
      <div className="main">
        <Button title={"Рандомый фильм"} onClick={handleButtonClick} />
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
      </div>
        <Footer text={'Made in 2025 with'} />
    </>
  );
}

export default App;
