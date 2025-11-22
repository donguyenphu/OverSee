import React from 'react';

// IMPORTANT: Replace 'path/to/your/avatar.png' with the actual path to your profile image.
const avatarUrl = 'path/to/your/avatar.png';

const BlueIdCardSection: React.FC = () => {
  // Define colors based on the HVA GROUP image
  const primaryBlue = 'bg-blue-900';
  const accentColor = 'text-yellow-400';
  const borderColor = 'border-yellow-400';

  return (
    // Outer container for centering the card on a page
    <div className={`flex items-center justify-center min-h-screen ${primaryBlue} p-4`}>
      
      {/* 🖼️ The ID Card Container */}
      {/* Using white background for the card itself, but incorporating blue and yellow accents */}
      <div 
        className="relative w-80 h-96 sm:w-80 sm:h-96 bg-white border-4 border-blue-900 rounded-xl shadow-2xl overflow-hidden p-6 flex flex-col"
      >
        
        {/* 1. Name Section (HỌ VÀ TÊN) - The top block */}
        <div className="flex-none pb-4 mb-4 border-b border-blue-100">
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-widest">
            HỌ VÀ TÊN
          </h1>
          {/* Placeholder for the actual name - using the HVA blue color */}
          <p className="text-3xl font-extrabold text-blue-900 mt-1">
            NGUYỄN VĂN A
          </p>
        </div>

        {/* 2. Detail Lines (Gtải 1, Gtải 2) - Middle text */}
        <div className="flex-none mb-6 text-gray-700 space-y-1">
          <p className="text-sm font-semibold">
            <span className={accentColor}>Gtải 1:</span>
            <span className="font-normal ml-2">Chức Danh 1</span>
          </p>
          <p className="text-sm font-semibold">
            <span className={accentColor}>Gtải 2:</span>
            <span className="font-normal ml-2">Phòng Ban</span>
          </p>
        </div>

        {/* 3. Image Section (Image Nguời đại diện) - The bottom circular area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          <div 
            className={`w-36 h-36 rounded-full border-4 ${borderColor} overflow-hidden bg-gray-100 flex items-center justify-center`}
          >
            {/* Conditional check if image is available, otherwise show placeholder text */}
            {avatarUrl === 'path/to/your/avatar.png' ? (
              <span className="text-center text-xs text-gray-500 p-2">
                Image Nguời đại diện
              </span>
            ) : (
              <img
                src={avatarUrl}
                alt="Image Nguời đại diện"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default BlueIdCardSection;