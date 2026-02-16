import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO of Acme Inc.',
    avatar: '/avatar-1.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    avatar: '/avatar-2.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    role: 'Software Engineer',
    avatar: '/avatar-3.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-800/50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            What Clients Say
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur. Tristique amet sed massa nibh lectus
            netus in.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-600 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div 
                    className={`max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden transition-all duration-500 ${
                      index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                    }`}
                  >
                    {/* Quote decoration */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <Quote className="w-24 h-24 text-primary" />
                    </div>
                    
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                    
                    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
                      {/* Avatar with ring */}
                      <div className="flex-shrink-0 relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Animated ring */}
                        <div className="absolute inset-0 -m-2 border-2 border-dashed border-primary/30 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        {/* Rating */}
                        <div className="flex items-center justify-center sm:justify-start gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-scale-in" 
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        {/* Quote */}
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">
                          "{testimonial.quote}"
                        </p>
                        
                        {/* Author */}
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-primary font-medium">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="group p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="group p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`relative h-3 rounded-full transition-all duration-300 overflow-hidden ${
                  index === currentIndex
                    ? 'w-10 bg-primary'
                    : 'w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {index === currentIndex && (
                  <span className="absolute inset-0 bg-white/30 animate-shimmer" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
