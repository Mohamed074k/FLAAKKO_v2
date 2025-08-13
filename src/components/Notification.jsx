const Notification = ({  show, type = 'success' }) => {
  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-2 animate-fade-in`}>
        <span>Added to cart</span>
      {type === 'success' && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    
    </div>
  );
};

export default Notification;