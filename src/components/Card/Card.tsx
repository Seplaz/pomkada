import styles from "./Card.module.css";
import { useRef, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

type CardProps = {
  ref: RefObject<HTMLDivElement | null>;
  image: string;
  title: string;
  rating: string;
  year: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Card = (props: CardProps) => {
  const { ref, image, title, rating, year, description, onClick } = props;
  const imageRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ratingRef = useRef<HTMLParagraphElement | null>(null);
  const yearRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    if (
      imageRef.current &&
      titleRef.current &&
      ratingRef.current &&
      yearRef.current &&
      descriptionRef.current
    ) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          delay: 0.3,
          duration: 0.2,
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.3,
          duration: 0.2,
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        ratingRef.current,
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.6,
          duration: 0.2,
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        yearRef.current,
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.9,
          duration: 0.2,
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          delay: 1.2,
          duration: 0.2,
          ease: "power1.out",
        }
      );
    }
  }, [image, title, rating, year, description]);

  return (
    <div ref={ref} className={styles.card} onClick={onClick}>
      <img
        ref={imageRef}
        className={styles.image}
        src={image}
        alt={`Постер к фильму ${title}`}
      />
      <div className={styles.about}>
        <h2 ref={titleRef} className={styles.title}>
          {title}
        </h2>
        <div className={styles.ratings}>
          <p
            ref={ratingRef}
            className={styles.rating}
          >{`Рейтинг: ${rating}`}</p>
          <p ref={yearRef} className={styles.rating}>{`Год: ${year}`}</p>
        </div>
        <p ref={descriptionRef} className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  );
};
