const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-1 py-3 bg-secondary w-16 justify-center rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default TypingIndicator;
