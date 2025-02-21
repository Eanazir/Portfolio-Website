import React from 'react';
import { BacklightEffect } from './components/BacklightEffect';

function App() {
  return (
    <>
      <BacklightEffect />
      <div style={{ position: 'relative', zIndex: 0 }}>
        test
      </div>
    </>
  );
}

export default App; 