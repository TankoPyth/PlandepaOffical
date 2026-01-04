import { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          { rootMargin: '-20% 0px -70% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 w-14 h-14 bg-brand-black text-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-800 transition-colors"
        aria-label="Toggle Table of Contents"
      >
        <List className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed lg:sticky top-24 left-0 lg:left-auto z-40 lg:z-10 bg-white lg:bg-transparent border-r lg:border-r-0 border-slate-200 p-6 h-[calc(100vh-200px)] overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64 lg:w-auto`}
      >
        <div className="lg:sticky lg:top-32">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider mb-4">
            Table of Contents
          </h3>
          <ul className="space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full text-sm transition-colors hover:text-brand-red ${
                    activeSection === section.id
                      ? 'text-brand-red font-semibold border-l-2 border-brand-red pl-3'
                      : 'text-brand-gray pl-3'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
