import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export interface Invoice {
  id: string;
  status: 'UNPAID' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  amount: number;
  currency: string;
  invoiceNumber: string;
  paymentUrl?: string;
}

export function useInvoiceStatus(invoiceId: string, initialStatus: string) {
  return useQuery<Invoice>({
    queryKey: ['invoice', invoiceId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/billing/invoices/${invoiceId}`);
      return data;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'UNPAID' ? 3000 : false;
    },
    refetchIntervalInBackground: false,
    initialData: { id: invoiceId, status: initialStatus } as unknown as Invoice,
  });
}
