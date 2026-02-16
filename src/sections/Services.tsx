import { useEffect, useRef, useState } from 'react';
import {
  Monitor,
  Server,
  MessageSquare,
  Database,
  Cloud,
  CloudCog,
  Zap,
  ShieldCheck,
} from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Frontend (React/Next.js)',
    description:
      'Build fast, accessible UIs with solid SEO and Core Web Vitals.',
  },
  {
    icon: Server,
    title: 'Backend API (Node/NestJS)',
    description:
      'Design secure REST/GraphQL APIs with authentication and rate limiting.',
  },
  {
    icon: MessageSquare,
    title: 'Microservices & Messaging',
    description:
      'Decouple services and scale with asynchronous communication.',
  },
  {
    icon: Database,
    title: 'Database & ORM',
    description: 'Schema design and query optimization for high throughput.',
  },
  {
    icon: CloudCog,
    title: 'DevOps & CI/CD',
    description:
      'Reliable deployments with automated pipelines and rollbacks.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description:
      'Hardened environments with monitoring, logging, and SSL.',
  },
  {
    icon: Zap,
    title: 'Performance & SEO',
    description: 'Speed audits and search visibility for business impact.',
  },
  {
    icon: ShieldCheck,
    title: 'Testing & Quality',
    description: 'Confidence before release with automated testing.',
  },
];

function ServiceCard({ service, index, isVisible }: { service: typeof services[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${index * 75}ms`,
        animationDelay: `${index * 75}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-orange-400 to-primary opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl" />
      </div>
      
      {/* Background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-400/10 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animation */}
        <div className="relative w-14 h-14 mb-5">
          {/* Icon background */}
          <div className={`absolute inset-0 rounded-xl bg-primary/10 transition-all duration-500 ${isHovered ? 'scale-110 bg-primary/20' : ''}`} />
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <service.icon 
              className={`w-7 h-7 text-primary transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`} 
            />
          </div>
          
          {/* Orbiting dot */}
          <div 
            className={`absolute w-2 h-2 bg-primary rounded-full transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animation: isHovered ? 'spin 2s linear infinite' : 'none',
              transformOrigin: '28px 28px',
              top: '0',
              left: '50%',
              marginLeft: '-4px',
            }}
          />
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
          {service.description}
        </p>
        
        {/* Learn more link */}
        <div className={`mt-4 flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <span>Learn more</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Corner decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full transition-all duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 lg:py-28 bg-gray-50 dark:bg-gray-800/50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            Services
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur. Tristique amet sed massa nibh lectus
            netus in. Aliquet donec morbi convallis pretium
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
