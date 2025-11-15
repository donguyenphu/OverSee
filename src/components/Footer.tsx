const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--header-bg))] text-[hsl(var(--header-foreground))] py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">logo</div>
          <div className="text-sm opacity-80">
            © 2024. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;