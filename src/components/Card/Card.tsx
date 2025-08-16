import styles from "./Card.module.css";
import { useRef, useLayoutEffect, forwardRef } from "react";
import gsap from "gsap";

type CardProps = {
  image: string;
  title: string;
  rating: string;
  year: string;
  description: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { image, title, rating, year, description, onClick } = props;
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

      gsap.killTweensOf([
        imageRef.current,
        titleRef.current,
        ratingRef.current,
        yearRef.current,
        descriptionRef.current
      ]);

      const tl = gsap.timeline();
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.2, delay: 0.2, ease: "power1.out" }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" },
          "+=0.05"
        )
        .fromTo(
          ratingRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" },
          "+=0.05"
        )
        .fromTo(
          yearRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" },
          "+=0.05"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" },
          "+=0.05"
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

      </div>
              <p ref={descriptionRef} className={styles.description}>
          {description}
        </p>
    </div>
  );
});
