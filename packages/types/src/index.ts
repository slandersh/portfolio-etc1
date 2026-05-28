import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string().uuid()).optional(),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;

export const CreateInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  amount: z.number().positive(),
  customerEmail: z.string().email(),
  customerName: z.string().min(2),
  description: z.string(),
  successRedirectUrl: z.string().url(),
  failureRedirectUrl: z.string().url(),
});

export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>;
