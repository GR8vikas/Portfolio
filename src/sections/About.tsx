import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '@/hooks/useScrollAnimation';

const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'React', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'Next.js', level: 92 },
];

function SkillBar({ skill, index, isVisible }: { skill: typeof skills[0]; index: number; isVisible: boolean }) {
  const { count } = useCountUp(skill.level, 1500, index * 200);
  
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-primary">{count}%</span>
      </div>
      <div className="h-3 bg-orange-100 dark:bg-orange-900/20 rounded-full overflow-hidden relative">
        {/* Background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        
        {/* Progress bar */}
        <div
          className={`h-full bg-gradient-to-r from-primary to-orange-400 rounded-full relative transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 150}ms`,
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          
          {/* Glow at the end */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-primary" />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 3D tilt effect for image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-28 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with animation */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white inline-block relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            About Me
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full animate-scale-in" style={{ animationDelay: '0.5s' }} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Profile Image with 3D tilt */}
          <div 
            className={`animate-on-scroll animate-fade-in-left flex justify-center lg:justify-start transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative group cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-orange-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Rotating border */}
              <div className="absolute -inset-2">
                <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
              </div>
              
              {/* Main image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:shadow-primary/30">
                <img
                  src="/profile-about.jpg"
                  alt="About Truong Nguyen"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.3s' }}>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div 
            className={`animate-on-scroll animate-fade-in-right transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
              quibusdam accusantium, vitae enim maxime illum aperiam quidem ea
              possimus assumenda eos consectetur, illo voluptatibus soluta quo
              quasi facilis nemo at.
            </p>

            {/* Skills with animated bars */}
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  skill={skill} 
                  index={index} 
                  isVisible={isVisible} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
