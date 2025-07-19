import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: 'paypal' | 'payoneer';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  created_at: string;
  profiles: {
    email: string;
    full_name?: string;
  };
}

const PaymentsManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          profiles:profiles!payments_user_id_fkey (
            email,
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data as unknown as Payment[] || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Error al cargar pagos');
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, newStatus: 'pending' | 'completed' | 'failed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ status: newStatus })
        .eq('id', paymentId);

      if (error) throw error;
      
      toast.success('Estado del pago actualizado');
      fetchPayments();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Error al actualizar el estado del pago');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      case 'cancelled':
        return 'secondary';
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
      case 'failed':
        return 'Fallido';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando pagos...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Pagos</CardTitle>
        <CardDescription>
          Administra todos los pagos del sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {payment.profiles?.full_name || payment.profiles?.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {payment.profiles?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${payment.amount?.toFixed(2)} {payment.currency}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {payment.payment_method === 'paypal' ? 'PayPal' : 'Payoneer'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(payment.status) as any}>
                      {getStatusText(payment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.description || 'Sin descripción'}
                  </TableCell>
                  <TableCell>
                    {new Date(payment.created_at).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    {payment.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePaymentStatus(payment.id, 'completed')}
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => updatePaymentStatus(payment.id, 'failed')}
                        >
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {payments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No hay pagos registrados
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsManagement;