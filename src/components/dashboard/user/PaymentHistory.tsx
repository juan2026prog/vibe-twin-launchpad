import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_method: 'paypal' | 'payoneer';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  created_at: string;
}

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Error al cargar historial de pagos');
    } finally {
      setLoading(false);
    }
  };

  const createTestPayment = async (method: 'paypal' | 'payoneer') => {
    try {
      const { error } = await supabase
        .from('payments')
        .insert({
          user_id: user!.id,
          amount: 50.00,
          currency: 'USD',
          payment_method: method,
          status: 'pending',
          description: `Pago de prueba via ${method === 'paypal' ? 'PayPal' : 'Payoneer'}`,
        });

      if (error) throw error;
      
      toast.success('Pago de prueba creado');
      fetchPayments();
    } catch (error) {
      console.error('Error creating test payment:', error);
      toast.error('Error al crear el pago');
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

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Realizar Nuevo Pago
          </CardTitle>
          <CardDescription>
            Procesa pagos utilizando PayPal o Payoneer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={() => createTestPayment('paypal')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Pagar con PayPal
            </Button>
            <Button 
              onClick={() => createTestPayment('payoneer')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Pagar con Payoneer
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            * Estos son pagos de prueba para demostración
          </p>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Todos tus pagos y transacciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando historial...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {payments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No tienes pagos registrados. ¡Realiza tu primer pago arriba!
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;