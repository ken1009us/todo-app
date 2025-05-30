import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-4 text-sm text-green-500 font-mono bg-gray-900 border-t border-green-700 mt-auto">
      Ken Wu, Software Engineer, Tokyo, Japan,&nbsp;
      <a
        href="https://github.com/ken1009us"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-green-300"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
