import { useEffect, useRef, useState } from 'react';
import { Facebook, Github, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/useScrollAnimation';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Github, href: '#', label: 'Github' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { displayText: typedName, isComplete: nameComplete } = useTypewriter('Truong Nguyen', 80, 500);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-[72px] bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Greeting with fade in */}
            <p
              className={`text-lg text-gray-600 dark:text-gray-400 mb-2 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Hi I am
            </p>
            
            {/* Name with typewriter effect */}
            <h2
              className={`text-2xl sm:text-3xl font-semibold text-primary mb-4 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {typedName}
              {!nameComplete && (
                <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-blink" />
              )}
            </h2>
            
            {/* Title with letter spacing animation */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100 tracking-normal' : 'opacity-0 tracking-[0.5em]'
              }`}
            >
              Full Stack
              <br />
              <span className="relative">
                Developer
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full transform origin-left animate-scale-in" style={{ animationDelay: '1.5s' }} />
              </span>
            </h1>
            
            {/* Description with fade in */}
            <p
              className={`text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 transition-all duration-700 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              veritatis corrupti nostrum repudiandae sapiente, rem asperiores
              impedit maiores ut deserunt similique quam rerum, assumenda est
              excepturi placeat voluptatum obcaecati sed.
            </p>
            
            {/* CTA Button with bounce in */}
            <div
              className={`transition-all duration-700 delay-1000 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 btn-shine btn-ripple animate-glow"
              >
                <span className="relative z-10">Hire Me</span>
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            {/* Profile image with multiple animations */}
            <div
              className={`relative transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-[-10deg]'
              }`}
            >
              {/* Animated rings around image */}
              <div className="absolute inset-0 -m-4">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow" />
              </div>
              <div className="absolute inset-0 -m-8">
                <div className="absolute inset-0 border border-dashed border-primary/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              </div>
              
              {/* Main image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:shadow-primary/30 group-hover:scale-[1.02]">
                  <img
                    src="/profile-hero.jpg"
                    alt="Truong Nguyen"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg">
                  Available
                </div>
                
                <div className="absolute -bottom-2 -left-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  5+ Years Exp
                </div>
              </div>
            </div>

            {/* Social Links with stagger animation */}
            <div
              className={`flex items-center gap-4 mt-10 transition-all duration-700 delay-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 overflow-hidden transition-all duration-300 hover:text-white hover:scale-110 hover:-translate-y-1"
                  style={{ 
                    animationDelay: `${1200 + index * 100}ms`,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {/* Background fill on hover */}
                  <span className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl origin-center" />
                  
                  {/* Icon */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
                    <social.icon className="w-5 h-5" />
                  </span>
                  
                  {/* Glow effect */}
                  <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-primary/50" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400">Scroll down</span>
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
