import Header from '../components/Header.tsx';
import GlassyOverlay from '../components/GlassyOverlay';
import CanvasAnimation from '../components/CanvasAnimation';

export default function Home() {
  return (
    <div>
      <Header />
      <GlassyOverlay />
      <CanvasAnimation />
    </div>
  );
}