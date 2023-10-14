import { useRef } from 'react';

import { Navbar } from './components/Components';

import './App.css';

function App() {
  const treeViewRef = useRef<HTMLUListElement>(null)
  return (
    <main className='main'>
      <Navbar treeViewRef={treeViewRef} />

    </main>
  );
}

export default App;
