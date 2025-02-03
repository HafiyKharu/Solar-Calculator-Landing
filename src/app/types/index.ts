export interface CalculatorInput {
    solarPanelCount: number;
    averageElectricityBill: number;
    savingsPercentage: number;
  }
  
  export interface CalculatorResult {
    estimatedSavings: number;
    paybackPeriod: number;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
  }