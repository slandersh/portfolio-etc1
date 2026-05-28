'use client';

import React from 'react';
import { useInvoiceStatus } from '../hooks/useInvoiceStatus';
import { Spinner, Flex, Text } from '@once-ui-system/core';

interface Props {
  invoiceId: string;
  initialStatus: string;
  onSuccess: () => void;
}

export const PaymentStatusModal: React.FC<Props> = ({ invoiceId, initialStatus, onSuccess }) => {
  const { data: invoice } = useInvoiceStatus(invoiceId, initialStatus);

  React.useEffect(() => {
    if (invoice?.status === 'PAID') {
      onSuccess();
    }
  }, [invoice?.status, onSuccess]);

  return (
    <Flex 
      direction="column" 
      horizontal="center" 
      vertical="center" 
      padding="xl" 
      background="surface" 
      border="neutral-alpha-weak" 
      style={{ borderRadius: 'var(--border-radius-playful)', maxWidth: '360px', margin: '0 auto' }}
    >
      {invoice?.status === 'UNPAID' && (
        <>
          <Spinner className="mb-16" size="m" />
          <Text as="h3" size="l" weight="strong" className="mb-8">Awaiting Payment</Text>
          <Text size="s" onBackground="neutral-weak" align="center">
            We are processing your payment via Virtual Account/QRIS. Please do not close this window.
          </Text>
        </>
      )}

      {invoice?.status === 'PAID' && (
        <>
          <Flex 
            style={{ width: '48px', height: '48px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgb(34, 197, 94)', borderRadius: '50%' }} 
            horizontal="center" 
            vertical="center" 
            className="mb-16"
          >
            <span style={{ color: 'rgb(34, 197, 94)', fontSize: '20px' }}>✓</span>
          </Flex>
          <Text as="h3" size="l" weight="strong" className="mb-8">Payment Succeeded!</Text>
          <Text size="s" onBackground="neutral-weak" align="center">
            Your subscription has been activated. Redirecting you to the dashboard...
          </Text>
        </>
      )}

      {invoice?.status === 'EXPIRED' && (
        <>
          <Flex 
            style={{ width: '48px', height: '48px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgb(239, 68, 68)', borderRadius: '50%' }} 
            horizontal="center" 
            vertical="center" 
            className="mb-16"
          >
            <span style={{ color: 'rgb(239, 68, 68)', fontSize: '20px' }}>✗</span>
          </Flex>
          <Text as="h3" size="l" weight="strong" className="mb-8">Payment Expired</Text>
          <Text size="s" onBackground="neutral-weak" align="center">
            The payment window has closed. Please generate a new invoice to try again.
          </Text>
        </>
      )}
    </Flex>
  );
};
