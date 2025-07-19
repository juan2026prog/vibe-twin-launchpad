import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Affiliate {
  id: string;
  user_id: string;
  affiliate_code: string;
  commission_rate: number;
  total_earnings: number;
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  profiles: {
    email: string;
    full_name?: string;
  };
}

const AffiliatesManagement = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select(`
          *,
          profiles:profiles!affiliates_user_id_fkey (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAffiliates(data as unknown as Affiliate[] || []);
    } catch (error) {
      console.error('Error fetching affiliates:', error);
      toast.error('Error al cargar afiliados');
    } finally {
      setLoading(false);
    }
  };

  const updateAffiliateStatus = async (affiliateId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ status: newStatus })
        .eq('id', affiliateId);

      if (error) throw error;
      
      toast.success('Estado del afiliado actualizado');
      fetchAffiliates();
    } catch (error) {
      console.error('Error updating affiliate status:', error);
      toast.error('Error al actualizar el estado del afiliado');
    }
  };

  const updateCommissionRate = async (affiliateId: string, newRate: number) => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ commission_rate: newRate })
        .eq('id', affiliateId);

      if (error) throw error;
      
      toast.success('Tasa de comisión actualizada');
      fetchAffiliates();
    } catch (error) {
      console.error('Error updating commission rate:', error);
      toast.error('Error al actualizar la tasa de comisión');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'suspended':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'suspended':
        return 'Suspendido';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando afiliados...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Afiliados</CardTitle>
        <CardDescription>
          Administra el programa de afiliados y comisiones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Afiliado</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Comisión %</TableHead>
                <TableHead>Ganancias Totales</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {affiliate.profiles?.full_name || affiliate.profiles?.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {affiliate.profiles?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {affiliate.affiliate_code}
                  </TableCell>
                  <TableCell>
                    {affiliate.commission_rate}%
                  </TableCell>
                  <TableCell className="font-medium">
                    ${affiliate.total_earnings?.toFixed(2) || '0.00'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(affiliate.status) as any}>
                      {getStatusText(affiliate.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(affiliate.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {affiliate.status === 'active' ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => updateAffiliateStatus(affiliate.id, 'suspended')}
                        >
                          Suspender
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateAffiliateStatus(affiliate.id, 'active')}
                        >
                          Activar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {affiliates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No hay afiliados registrados
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliatesManagement;