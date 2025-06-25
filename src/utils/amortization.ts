export interface PaymentRow {
  paymentNumber: number;
  paymentAmount: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface AmortizationResult {
  payments: PaymentRow[];
  totalInterest: number;
  totalPayments: number;
  monthlyPayment: number;
}

export const calculateAmortization = (
  loanAmount: number,
  annualInterestRate: number,
  years: number,
  paymentsPerYear: number
): AmortizationResult => {
  const totalPayments = years * paymentsPerYear;
  const periodicRate = (annualInterestRate / 100) / paymentsPerYear;
  
  // Calculate monthly payment using amortization formula
  const monthlyPayment = periodicRate === 0 
    ? loanAmount / totalPayments
    : (loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
      (Math.pow(1 + periodicRate, totalPayments) - 1);

  const payments: PaymentRow[] = [];
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalPayments; i++) {
    const interestPayment = remainingBalance * periodicRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    remainingBalance = Math.max(0, remainingBalance - principalPayment);
    totalInterestPaid += interestPayment;

    payments.push({
      paymentNumber: i,
      paymentAmount: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance
    });

    if (remainingBalance <= 0.01) break;
  }

  return {
    payments,
    totalInterest: totalInterestPaid,
    totalPayments: monthlyPayment * payments.length,
    monthlyPayment
  };
};