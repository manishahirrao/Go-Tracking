import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialCarousel.css';

const TestimonialCarousel = ({ testimonials, autoAdvance = true, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoAdvanceRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= testimonials.length ? 0 : newIndex;
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? testimonials.length - 1 : newIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleUserInteraction = () => {
    setIsAutoRotating(false);
    
    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    // Set timeout to resume auto-rotation after 5 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 5000);
  };

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance || isPaused || !isAutoRotating) return;

    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex >= testimonials.length ? 0 : newIndex;
      });
    }, interval);

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [autoAdvance, interval, isPaused, isAutoRotating, testimonials.length]);

  // Touch/swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="testimonial-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleUserInteraction}
    >
      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={(e) => {
            e.stopPropagation();
            handleUserInteraction();
            goToPrevious();
          }}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>

        <div className="carousel-content">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="carousel-slide">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-button next" 
          onClick={(e) => {
            e.stopPropagation();
            handleUserInteraction();
            goToNext();
          }} 
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleUserInteraction();
              goToSlide(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
