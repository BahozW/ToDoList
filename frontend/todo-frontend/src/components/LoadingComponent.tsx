import React from 'react';
import '../styles.css';

const LoadingComponent: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingComponent;
