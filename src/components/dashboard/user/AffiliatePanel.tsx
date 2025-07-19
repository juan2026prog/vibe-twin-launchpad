import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Share2, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';

interface AffiliateReferral {
  id: string;
  commission_amount: number;
  status: string;
  created_at: string;
  profiles: {
    email: string;
    full_name?: string;
  };
}

interface AffiliatePanelProps {
  affiliateCode: string;
}

const AffiliatePanel: React.FC<AffiliatePanelProps> = ({ affiliateCode }) => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingEarnings: 0,
    totalReferrals: 0,
  });

  const affiliateUrl = `${window.location.origin}/?ref=${affiliateCode}`;

  useEffect(() => {
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  const fetchReferrals = async () => {
    try {
      // First get the affiliate ID
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('user_id', user!.id)
        .single();

      if (!affiliate) return;

      // Fetch referrals with user info
      const { data: referralsData, error } = await supabase
        .from('affiliate_referrals')
        .select(`
          *,
          profiles:profiles!affiliate_referrals_referred_user_id_fkey (
            email,
            full_name
          )
        `)
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReferrals(referralsData as unknown as AffiliateReferral[] || []);

      // Calculate stats
      const totalEarnings = referralsData?.reduce((sum, ref) => 
        ref.status === 'completed' ? sum + (ref.commission_amount || 0) : sum, 0) || 0;
      
      const pendingEarnings = referralsData?.reduce((sum, ref) => 
        ref.status === 'pending' ? sum + (ref.commission_amount || 0) : sum, 0) || 0;

      setStats({
        totalEarnings,
        pendingEarnings,
        totalReferrals: referralsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast.error('Error al cargar referidos');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Enlace copiado al portapapeles');
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Únete a VRT System',
        text: 'Únete usando mi código de afiliado',
        url: affiliateUrl,
      });
    } else {
      copyToClipboard(affiliateUrl);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium">Ganancias Pendientes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referidos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Link */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Enlace de Afiliado</CardTitle>
          <CardDescription>
            Comparte este enlace para ganar comisiones por cada referido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={affiliateUrl}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(affiliateUrl)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareLink}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Tu código:</strong> <span className="font-mono">{affiliateCode}</span></p>
            <p>Ganas comisión por cada usuario que se registre usando tu enlace.</p>
          </div>
        </CardContent>
      </Card>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Referidos</CardTitle>
          <CardDescription>
            Lista de todos tus referidos y comisiones
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando referidos...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario Referido</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {referral.profiles?.full_name || referral.profiles?.email}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {referral.profiles?.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${referral.commission_amount?.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(referral.status) as any}>
                          {getStatusText(referral.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(referral.created_at).toLocaleDateString('es-ES')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {referrals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aún no tienes referidos. ¡Comparte tu enlace para empezar a ganar!
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliatePanel;