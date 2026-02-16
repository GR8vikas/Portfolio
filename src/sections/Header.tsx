import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <a
            href="#home"
            className="group relative text-2xl font-bold text-primary tracking-tight overflow-hidden"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
              LOGO
            </span>
            <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary">
              LOGO
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                  activeLink === link.href
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover background */}
                <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                
                {/* Active indicator */}
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    activeLink === link.href ? 'w-6' : 'w-0 group-hover:w-4'
                  }`} 
                />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white gap-2 group btn-shine"
              size="sm"
            >
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              <span>Download CV</span>
            </Button>
            
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:rotate-12 overflow-hidden group"
              aria-label="Toggle theme"
            >
              <span className="relative z-10 transition-transform duration-500 inline-block">
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </span>
              <span className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 overflow-hidden group"
              aria-label="Toggle menu"
            >
              <span className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 transition-transform duration-300 rotate-0" />
                ) : (
                  <Menu className="w-5 h-5 transition-transform duration-300" />
                )}
              </span>
              <span className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform ${
                isMobileMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-[-20px] opacity-0'
              } ${
                activeLink === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          <Button
            className="mt-4 bg-primary hover:bg-primary/90 text-white gap-2 w-full"
            size="sm"
          >
            <Download className="w-4 h-4" />
            Download CV
          </Button>
        </nav>
      </div>
    </header>
  );
}
