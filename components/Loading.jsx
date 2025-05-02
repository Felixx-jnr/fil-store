import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        {/* Grey static circle */}
        <div className="absolute inset-0 rounded-full bg-gray-300" />

        {/* Green spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-transparent animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
