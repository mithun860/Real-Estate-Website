import React from 'react';

const SignIn = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <iframe
        src="http://localhost:5174/login"
        title="Admin Login"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default SignIn;