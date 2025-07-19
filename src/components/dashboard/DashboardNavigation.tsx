import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardNavigationProps {
  isAdmin: boolean;
  profile: any;
  onSignOut: () => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  isAdmin,
  profile,
  onSignOut,
}) => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 
            className="text-xl font-bold text-gradient cursor-pointer"
            onClick={() => navigate('/')}
          >
            VRT System
          </h1>
          {isAdmin && (
            <div className="flex items-center space-x-2 text-sm text-primary">
              <Shield className="w-4 h-4" />
              <span>Administrador</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.full_name?.charAt(0)?.toUpperCase() || 
                 profile?.email?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">
                {profile?.full_name || profile?.email}
              </p>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? 'Administrador' : 'Usuario'}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavigation;