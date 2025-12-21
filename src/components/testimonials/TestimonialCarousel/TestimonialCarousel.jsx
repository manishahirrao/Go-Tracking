import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TestimonialCard from '../TestimonialCard/TestimonialCard';
import './TestimonialCarousel.css';

const TestimonialCarousel = ({ testimonials, autoAdvance = true, interval = 45000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoAdvanceRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const trackRef = useRef(null);

  // Create double array for seamless loop: [...original, ...original]
  const extendedTestimonials = [...testimonials, ...testimonials];

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleUserInteraction = () => {
    // Stop auto-rotation immediately
    setIsAutoRotating(false);
    
    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    // Resume auto-rotation after 5 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      console.log('Resuming auto-rotation');
      setIsAutoRotating(true);
    }, 5000);
  };

  // Handle infinite loop seamless reset
  useEffect(() => {
    if (currentIndex === testimonials.length) {
      // After showing the last card, instantly reset to start
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Wait for transition to complete

      return () => clearTimeout(timer);
    } else if (currentIndex < 0) {
      // If going backward past start, jump to end
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length - 1);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, testimonials.length]);

  // Auto-advance - only forward direction
  useEffect(() => {
    if (!autoAdvance || isPaused || !isAutoRotating) return;

    autoAdvanceRef.current = setInterval(() => {
      goToNext();
    }, interval);

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
      // Don't clear resumeTimeoutRef here - let it run its course
    };
  }, [autoAdvance, interval, isPaused, isAutoRotating]);

  // Touch support
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
      handleUserInteraction();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
      handleUserInteraction();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Calculate which dot should be active
  const activeDotIndex = currentIndex % testimonials.length;

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
            ref={trackRef}
            className={`carousel-track ${!isTransitioning ? 'instant-transition' : ''}`}
            style={{
              transform: `translateX(-${currentIndex * 30}vw)`,
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="carousel-slide">
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
            className={`dot ${index === activeDotIndex ? 'active' : ''}`}
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