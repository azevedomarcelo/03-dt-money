import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { generateTransactionId } from "../utils/randomId";
// import { api } from "../lib/axios";

interface TransactionContextType {
  transactions: TransactionProps[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransactions: (data: CreateTransactionInput) => Promise<void>;
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

interface CreateTransactionInput {
  description: string,
  type: "income" | "outcome";
  category: string,
  price: number,
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const transactionLocalStorage = localStorage.getItem('@dt-money:transactions');

    if (!transactionLocalStorage) return;

    if (query) {
      transactions.filter(transaction => transaction.description === query);
      // return setTransactions(filteredListTransaction);
    }

    return setTransactions(prevState => [...prevState, JSON.parse(transactionLocalStorage)])
  }, [transactions]);

  const createTransactions = useCallback(async (data: CreateTransactionInput) => {
    const transactionsInfo = {
      id: generateTransactionId(),
      createdAt: new Date().toISOString(),
      ...data,
    }

    setTransactions((prevState) => [...prevState, transactionsInfo]);
  }, []);

  useEffect(() => {
    localStorage.setItem('@dt-money:transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}