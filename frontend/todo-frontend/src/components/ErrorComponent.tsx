import React from 'react';
import '../styles.css';

type Props = {
  message: string;
  onClearError: () => void; 
};

const ErrorComponent: React.FC<Props> = ({ message, onClearError }) => {
  return (
    <div className='error'>
      Error: {message}
      <button onClick={onClearError}>Luk</button> {}
    </div>
  );
};

export default ErrorComponent;
