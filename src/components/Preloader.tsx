import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        !isLoading ? "opacity-0 pointer-events-none" : "opacity-180"
      }`}
    >
      <div className='relative'>
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" style={{ width: "80px", height: "80px" }}></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex item-centers justify-center">
          <div className="h-20 w-20 rounded-full bg-primary animate-pulse"></div>
        </div>
        {/* Center dot */}
        <div className="absolute inset-0 flex item-centers justify-center">
          <div className="h-4 w-4 rounded-full bg-primary-foreground"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;