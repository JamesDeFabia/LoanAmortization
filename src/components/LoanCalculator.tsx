import React, { useState } from 'react';
import LoanForm from './LoanForm';
import AmortizationTable from './AmortizationTable';
import { calculateAmortization, AmortizationResult } from '@/utils/amortization';
import { Card, CardContent } from '@/components/ui/card';

const LoanCalculator: React.FC = () => {
  const [result, setResult] = useState<AmortizationResult | null>(null);

  const handleCalculate = (data: {
    loanAmount: number;
    interestRate: number;
    years: number;
    paymentsPerYear: number;
  }) => {
    const calculationResult = calculateAmortization(
      data.loanAmount,
      data.interestRate,
      data.years,
      data.paymentsPerYear
    );
    setResult(calculationResult);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Loan Amortization Calculator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <LoanForm onCalculate={handleCalculate} />
            
            {result && (
              <Card className="mt-6 shadow-lg border-2 border-yellow-200">
                <CardContent className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Payment Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Monthly Payment:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(result.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Total Interest:</span>
                      <span className="text-lg font-bold text-red-600">
                        {formatCurrency(result.totalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Total Payments:</span>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(result.totalPayments)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {result ? (
              <AmortizationTable 
                payments={result.payments}
                totalInterest={result.totalInterest}
                totalPayments={result.totalPayments}
              />
            ) : (
              <Card className="h-96 flex items-center justify-center shadow-lg border-2 border-gray-200">
                <CardContent className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    Ready to Calculate!
                  </h3>
                  <p className="text-gray-500">
                    Enter your loan details to see the amortization schedule
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;