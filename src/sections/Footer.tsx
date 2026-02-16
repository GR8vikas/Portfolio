import { useState, useEffect } from 'react';
import { Facebook, Github, Linkedin, Youtube, ArrowUp, Heart } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-500' },
  { icon: Github, href: '#', label: 'Github', color: 'hover:bg-gray-800' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-500' },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main footer content */}
        <div className="flex flex-col items-center">
          {/* Logo with animation */}
          <div className="mb-8 group cursor-default">
            <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase transition-all duration-300 group-hover:text-primary">
              Coding With Truong
            </h3>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300 py-1"
              >
                {link.name}
                {/* Underline animation */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    hoveredLink === link.name ? 'w-full' : 'w-0'
                  }`} 
                />
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`group relative p-3.5 rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Background on hover */}
                <span className={`absolute inset-0 ${social.color} scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl`} />
                
                {/* Icon */}
                <span className="relative z-10 transition-all duration-300 group-hover:text-white group-hover:scale-110 inline-block">
                  <social.icon className="w-5 h-5" />
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8" />

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-center gap-1">
            <span>© 2025 Code by</span>
            <a href="#" className="text-primary hover:underline font-medium">
              Truong Nguyen
            </a>
            <span>& Design by</span>
            <a href="#" className="text-primary hover:underline font-medium">
              Fawziuiux
            </a>
          </p>
          
          {/* Made with love */}
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with 
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> 
            in Vietnam
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-500 z-40 group ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        {/* Background pulse */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        
        {/* Icon */}
        <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
        
        {/* Shine effect */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </span>
      </button>
    </footer>
  );
}
