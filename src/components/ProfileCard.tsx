interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  image?: string;
}

const ProfileCard = ({ name, title, description, image }: ProfileCardProps) => {
  return (
    <div className="card-transparent p-6 fade-in">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full profile-gradient-border p-1">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {image ? (
                <img 
                  src={image} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Photo</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <p className="text-white/90 text-xs leading-relaxed">{description}</p>
          <p className="text-white font-medium text-sm">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;