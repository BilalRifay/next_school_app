const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        {/* Outer ring with pulse */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spinPulse"></div>
        
        {/* Inner ring with rotation */}
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spinFade"></div>
      </div>
    </div>
  );
};

export default Loader;
