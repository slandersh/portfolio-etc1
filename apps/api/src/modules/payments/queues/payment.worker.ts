import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from '../../../database/prisma.service';
import { WebhookStatus, InvoiceStatus, PaymentStatus } from '@prisma/client';

@Processor('payment-processing')
export class PaymentWorker {
  constructor(private readonly prisma: PrismaService) {}

  @Process('process-xendit-payment')
  async processPayment(job: Job<{ eventId: string; payload: any }>) {
    const { eventId, payload } = job.data;

    await this.prisma.$transaction(async (tx) => {
      const invoiceNumber = payload.external_id;
      const status = payload.status; 

      const invoice = await tx.invoice.findUnique({
        where: { invoiceNumber },
        include: { organization: true },
      });

      if (!invoice) throw new Error(`Invoice ${invoiceNumber} not found`);

      if (status === 'PAID') {
        await tx.invoice.update({
          where: { id: invoice.id },
          data: {
            status: InvoiceStatus.PAID,
            paidAt: new Date(payload.updated),
          },
        });

        await tx.payment.create({
          data: {
            invoiceId: invoice.id,
            amount: payload.amount,
            status: PaymentStatus.SUCCESS,
            provider: 'XENDIT',
            providerTxId: payload.id,
          },
        });

        if (invoice.subscriptionId) {
          const subscription = await tx.subscription.update({
            where: { id: invoice.subscriptionId },
            data: { status: 'ACTIVE' },
            include: { plan: true },
          });

          const planFeatures = subscription.plan.features as any;
          if (planFeatures && planFeatures.quotas) {
            for (const key of Object.keys(planFeatures.quotas)) {
              await tx.subscriptionUsage.upsert({
                where: {
                  subscriptionId_featureKey: {
                    subscriptionId: subscription.id,
                    featureKey: key,
                  },
                },
                update: {
                  limit: planFeatures.quotas[key],
                  resetAt: subscription.currentPeriodEnd,
                },
                create: {
                  subscriptionId: subscription.id,
                  featureKey: key,
                  limit: planFeatures.quotas[key],
                  resetAt: subscription.currentPeriodEnd,
                },
              });
            }
          }
        }

        await tx.billingEvent.create({
          data: {
            organizationId: invoice.organizationId,
            type: 'INVOICE_PAID',
            description: `Invoice ${invoiceNumber} settled via Xendit.`,
            amount: payload.amount,
          },
        });
      } else if (status === 'EXPIRED') {
        await tx.invoice.update({
          where: { id: invoice.id },
          data: { status: InvoiceStatus.EXPIRED },
        });
      }

      await tx.webhookLog.update({
        where: { eventId },
        data: {
          status: WebhookStatus.PROCESSED,
          processedAt: new Date(),
        },
      });
    });
  }
}
