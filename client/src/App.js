import './App.css';
import { useEffect } from 'react';

// Step 1 - Install client socket io

// Step 2 - Import socket io
import socketToClient from 'socket.io-client';

// Step 3 - Declare your backend
const ENDPOINT = 'http://localhost:9001/';

// Step 4 - Connect!
const connection = socketToClient(ENDPOINT);

function App() {
  useEffect(() => {}, [connection])

  return (
    <div className="App">
      <h1>Hello World! 🌍</h1>
    </div>
  );
}

export default App;
