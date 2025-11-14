import { Outlet } from 'react-router-dom';
import { useAppState } from '../../context/AppStateContext';
import BottomNav from './BottomNav';
import TopBar from './TopBar';
import TutorialOverlay from '../TutorialOverlay';

const MainLayout = () => {
  const { showTutorial, completeTutorial } = useAppState();

  return (
    <div className="layout">
      <TopBar />
      <main className="layout__content">
        <Outlet />
      </main>
      <BottomNav />
      {showTutorial && <TutorialOverlay onClose={completeTutorial} />}
    </div>
  );
};

export default MainLayout;
