import { Outlet } from 'react-router';
import Navbar from '~/components/Navbar';

export default function PostAuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Outlet />
    </div>
  );
}
