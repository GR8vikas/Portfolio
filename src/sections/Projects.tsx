import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const categories = ['All', 'React', 'Next.js', 'Backend System', 'Dashboard System'];

const projects = [
  {
    id: 1,
    title: 'Booking Dashboard',
    image: '/project-1.jpg',
    tags: ['React', 'Next.js', 'TypeScript', 'Dashboard System', 'Tailwind'],
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'E-commerce API',
    image: '/project-2.jpg',
    tags: ['Backend System', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker'],
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'Realtime Chat App',
    image: '/project-3.jpg',
    tags: ['Next.js', 'React', 'TypeScript', 'Redis', 'WebSocket'],
    github: '#',
    demo: '#',
  },
];

function ProjectCard({ project, index, isVisible }: { project: typeof projects[0]; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Project Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Action buttons */}
          <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href={project.github}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110"
              aria-label="View Code"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.demo}
              className="p-3 bg-primary rounded-full text-white hover:bg-primary/90 transition-all duration-300 hover:scale-110"
              aria-label="View Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          
          {/* Shimmer effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-full' : ''}`} />
        </div>

        {/* Project Info */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full transition-all duration-300 hover:bg-primary hover:text-white cursor-default"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* View project link */}
          <div className={`mt-3 flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <span>View Project</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(activeCategory));

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory || isAnimating) return;
    setIsAnimating(true);
    setActiveCategory(category);
    setTimeout(() => setIsAnimating(false), 500);
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 lg:py-28 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            My Projects
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur. Tristique amet sed massa nibh lectus
            netus in. Aliquet donec morbi convallis pretium
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory === category && (
                <span className="absolute inset-0 bg-white/20 animate-shimmer" />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
