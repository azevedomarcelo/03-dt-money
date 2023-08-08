import { ReactNode, createContext, useEffect, useState } from "react";

interface TransactionContextType {
  transactions: TransactionProps[]
}

interface TransactionProps {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}