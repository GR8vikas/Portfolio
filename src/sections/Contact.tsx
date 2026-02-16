import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mail, Sparkles } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-28 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary/10 rounded-full animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 animate-float">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            Let's work together
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur. Tristique amet sed massa nibh lectus
            netus in.
          </p>

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-4 max-w-lg mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative flex-1">
              {/* Input with animated border */}
              <div className={`relative rounded-xl transition-all duration-300 ${
                isFocused ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : 'ring-1 ring-gray-200 dark:ring-gray-700'
              }`}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  disabled={isSubmitting || isSubmitted}
                  className="h-14 px-5 rounded-xl border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                
                {/* Animated border on focus */}
                <div className={`absolute inset-0 rounded-xl border-2 border-primary transition-all duration-300 pointer-events-none ${
                  isFocused ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
              
              {/* Sparkle effect on focus */}
              {isFocused && (
                <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-pulse" />
              )}
            </div>
            
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || isSubmitted}
              className={`relative overflow-hidden h-14 px-8 rounded-xl transition-all duration-500 ${
                isSubmitted 
                  ? 'bg-green-500 hover:bg-green-500' 
                  : 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30'
              } text-white font-medium btn-shine disabled:opacity-100`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center gap-2 animate-scale-in">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Contact me</span>
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
              
              {/* Ripple effect */}
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-white/20 rounded-full transition-all duration-500 group-active:w-64 group-active:h-64" />
              </span>
            </Button>
          </form>
          
          {/* Success message */}
          {isSubmitted && (
            <p className="mt-4 text-green-500 text-sm animate-fade-in-up">
              Thank you! We'll get back to you soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
