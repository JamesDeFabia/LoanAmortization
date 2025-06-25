import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PaymentRow {
  paymentNumber: number;
  paymentAmount: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

interface AmortizationTableProps {
  payments: PaymentRow[];
  totalInterest: number;
  totalPayments: number;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ 
  payments, 
  totalInterest, 
  totalPayments 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className="w-full shadow-xl border-2 border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">
          Amortization Schedule
        </CardTitle>
        <div className="flex justify-around text-sm mt-2">
          <div className="text-center">
            <div className="font-semibold">Total Interest</div>
            <div className="text-lg">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Total Payments</div>
            <div className="text-lg">{formatCurrency(totalPayments)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50">
              <TableRow>
                <TableHead className="font-bold text-gray-800">#</TableHead>
                <TableHead className="font-bold text-gray-800">Payment</TableHead>
                <TableHead className="font-bold text-gray-800">Principal</TableHead>
                <TableHead className="font-bold text-gray-800">Interest</TableHead>
                <TableHead className="font-bold text-gray-800">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow 
                  key={payment.paymentNumber}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <TableCell className="font-medium">{payment.paymentNumber}</TableCell>
                  <TableCell className="text-blue-600 font-semibold">
                    {formatCurrency(payment.paymentAmount)}
                  </TableCell>
                  <TableCell className="text-green-600">
                    {formatCurrency(payment.principalPayment)}
                  </TableCell>
                  <TableCell className="text-red-600">
                    {formatCurrency(payment.interestPayment)}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(payment.remainingBalance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;