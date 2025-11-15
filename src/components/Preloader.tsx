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
    <div className="preloader">
      <div className="text-center">
        <div className="preloader-spin"></div>
        <p className="mt-4 text-xl font-semibold text-white">Đang tải...</p>
      </div>
    </div>
  );
};

export default Preloader;