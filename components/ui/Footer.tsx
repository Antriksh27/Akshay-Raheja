export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Now', href: '#now' },
    { label: 'Recreations', href: '#recreations' },
    { label: 'Filmography', href: '#filmography' },
    { label: 'Sound', href: '#sound' },
    { label: 'Press', href: '#press' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="w-full py-16 px-6 md:px-16 border-t border-hairline bg-bg-base">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        
        <div className="flex flex-col gap-4">
          <a href="#hero" className="font-display text-2xl text-text-primary hover:text-accent-flash transition-colors focus:outline-none tracking-tighter">
            Akshay & IP
          </a>
          <a href="mailto:studio@akshayraheja.com" className="font-structural text-xs text-text-secondary hover:text-accent-flash uppercase tracking-[0.2em] transition-colors focus:outline-none">
            studio@akshayraheja.com
          </a>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            {navLinks.slice(0, 3).map((link) => (
              <a key={link.label} href={link.href} className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] hover:text-text-primary transition-colors focus:outline-none">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.slice(3).map((link) => (
              <a key={link.label} href={link.href} className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] hover:text-text-primary transition-colors focus:outline-none">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex gap-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] hover:text-text-primary transition-colors focus:outline-none">Instagram</a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] hover:text-text-primary transition-colors focus:outline-none">Spotify</a>
          </div>
          <p className="font-structural text-[10px] text-text-secondary/50 uppercase tracking-[0.2em]">
            © {currentYear} Akshay & IP. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
