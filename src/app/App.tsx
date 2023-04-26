import { useState } from 'react';
import './global.css';

function App() {
  const [count, setCount] = useState(0);

  const a = 10;

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      <h1>hhello</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default App;
