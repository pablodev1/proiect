import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline, IoCodeSlashOutline, IoMailOutline, IoPersonCircleOutline } from 'react-icons/io5';
// REPARAȚIE: Am actualizat calea de import pentru a folosi noul fișier al hook-ului.
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Acasă', icon: IoHomeOutline, path: '/' },
  { name: 'Servicii', icon: IoCodeSlashOutline, path: '/servicii' },
  { name: 'Contact', icon: IoMailOutline, path: '/contact' },
  { name: 'Client', icon: IoPersonCircleOutline, path: '/login' },
];

const ITEM_WIDTH = 100;

export function Navigation() {
  const { session } = useAuth();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/client')) {
      setActiveIndex(3);
    } else {
      const activeItemIndex = navItems.findIndex(item => item.path === currentPath);
      if (activeItemIndex !== -1) {
        setActiveIndex(activeItemIndex);
      }
    }
  }, [location]);

  const clientPath = session ? '/client/dashboard' : '/login';

  return (
    <div className="relative font-body w-[400px] h-[70px] bg-surface/80 border border-border backdrop-blur-lg flex justify-center items-center rounded-xl z-50">
      <ul className="flex w-full">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          const path = index === 3 ? clientPath : item.path;

          return (
            <li key={item.name} className="relative flex-1 h-[70px] z-[2] cursor-pointer">
              <Link to={path} className="relative flex justify-center items-center flex-col w-full h-full text-center font-medium transition-colors duration-300">
                <span className={`block text-2xl transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-slate-400'}`}>
                  <Icon />
                </span>
                <span className={`text-xs font-normal tracking-wider transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-slate-500'}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
        <div
          className="absolute top-0 left-0 h-full w-[100px] bg-accent-gradient rounded-lg transition-transform duration-500 ease-in-out z-[1]"
          style={{ transform: `translateX(calc(${ITEM_WIDTH}px * ${activeIndex}))` }}
        />
      </ul>
    </div>
  );
}