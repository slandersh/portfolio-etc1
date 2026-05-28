import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { XenditWebhookController } from './webhooks/xendit-webhook.controller';
import { PaymentWorker } from './queues/payment.worker';
import { XenditAdapter } from './infrastructure/xendit.adapter';
import { PrismaService } from '../../database/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payment-processing',
    }),
  ],
  controllers: [XenditWebhookController],
  providers: [
    PaymentWorker,
    PrismaService,
    {
      provide: 'IPaymentGateway',
      useClass: XenditAdapter,
    },
  ],
  exports: ['IPaymentGateway'],
})
export class PaymentsModule {}
