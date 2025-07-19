import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, Users, CreditCard, User } from 'lucide-react';
import UserProfile from './user/UserProfile';
import AffiliatePanel from './user/AffiliatePanel';
import PaymentHistory from './user/PaymentHistory';
import DashboardNavigation from './DashboardNavigation';

interface UserStats {
  totalEarnings: number;
  totalReferrals: number;
  pendingPayments: number;
  affiliateCode: string;
}

const UserDashboard = () => {
  const { signOut, profile, user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalEarnings: 0,
    totalReferrals: 0,
    pendingPayments: 0,
    affiliateCode: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // Fetch affiliate info
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (affiliate) {
        // Fetch referrals
        const { data: referrals } = await supabase
          .from('affiliate_referrals')
          .select('*')
          .eq('affiliate_id', affiliate.id);

        const totalEarnings = referrals?.reduce((sum, ref) => 
          ref.status === 'completed' ? sum + (ref.commission_amount || 0) : sum, 0) || 0;

        const pendingPayments = referrals?.filter(ref => 
          ref.status === 'pending').length || 0;

        setStats({
          totalEarnings,
          totalReferrals: referrals?.length || 0,
          pendingPayments,
          affiliateCode: affiliate.affiliate_code,
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation 
        isAdmin={false}
        profile={profile}
        onSignOut={handleSignOut}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">
            Bienvenido, {profile?.full_name || profile?.email}
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu perfil y revisa tus ganancias de afiliado
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancias Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referidos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReferrals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Código de Afiliado</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-mono">{stats.affiliateCode}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="affiliate">Afiliados</TabsTrigger>
            <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          <TabsContent value="affiliate">
            <AffiliatePanel affiliateCode={stats.affiliateCode} />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;