const LoadingScreen = () => {
  return (
    <div className="loading-screen flex items-center justify-center h-screen w-full bg-white">
      <div className="spinner border-4 border-t-4 border-gray-300 border-solid rounded-full w-12 h-12 animate-spin"></div>
      <style>{`
        .spinner {
          border-top-color: #3498db;
          border-radius: 50%;
          border-width: 4px;
          border-style: solid;
          width: 3rem;
          height: 3rem;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
