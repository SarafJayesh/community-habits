import { NavLink } from 'react-router-dom';
import { Home, Target, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Goals', to: '/goals', icon: Target },
  { name: 'Groups', to: '/groups', icon: Users },
];

const Sidebar = () => {
  return (
    <div className="w-64 border-r bg-background h-[calc(100vh-4rem)]">
      <nav className="space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2',
                  'text-sm font-medium transition-all hover:bg-accent',
                  isActive ? 'bg-accent' : 'transparent'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;