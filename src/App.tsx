import { useState } from 'react';
import IntroPage from './pages/IntroPage';
import HolmerPage from './pages/HolmerPage';
import RopaPage from './pages/RopaPage';

type PageType = 'intro' | 'holmer' | 'ropa';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('intro');

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
      <div className="min-h-screen">      {currentPage === 'intro' && <IntroPage onNavigate={navigateTo} />}
      {currentPage === 'holmer' && <HolmerPage onBack={() => navigateTo('intro')} />}
      {currentPage === 'ropa' && <RopaPage onBack={() => navigateTo('intro')} />}
    </div>
  );
}

export default App;
