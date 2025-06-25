import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface LoanFormProps {
  onCalculate: (data: {
    loanAmount: number;
    interestRate: number;
    years: number;
    paymentsPerYear: number;
  }) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [paymentsPerYear, setPaymentsPerYear] = useState('12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      years: parseInt(years),
      paymentsPerYear: parseInt(paymentsPerYear)
    };
    
    if (data.loanAmount > 0 && data.interestRate >= 0 && data.years > 0 && data.paymentsPerYear > 0) {
      onCalculate(data);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="loanAmount" className="text-sm font-semibold text-gray-700">Loan Amount ($)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="100000"
              className="mt-1 border-2 border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="interestRate" className="text-sm font-semibold text-gray-700">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="5.5"
              className="mt-1 border-2 border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="years" className="text-sm font-semibold text-gray-700">Number of Years</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
              className="mt-1 border-2 border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="paymentsPerYear" className="text-sm font-semibold text-gray-700">Payments Per Year</Label>
            <Input
              id="paymentsPerYear"
              type="number"
              value={paymentsPerYear}
              onChange={(e) => setPaymentsPerYear(e.target.value)}
              placeholder="12"
              className="mt-1 border-2 border-gray-300 focus:border-blue-500"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Calculate Amortization
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanForm;