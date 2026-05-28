import { Controller, Post, Body, Headers, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { PrismaService } from '../../../database/prisma.service';
import { WebhookStatus } from '@prisma/client';

@Controller('webhooks/xendit')
export class XenditWebhookController {
  constructor(
    @InjectQueue('payment-processing') private readonly queue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('x-callback-token') callbackToken: string,
    @Body() payload: any,
  ) {
    if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      throw new UnauthorizedException('Invalid callback token');
    }

    const eventId = payload.id;
    const eventType = payload.status;

    const existingLog = await this.prisma.webhookLog.findUnique({
      where: { eventId },
    });

    if (existingLog) {
      return { status: 'duplicate', message: 'Event already processed' };
    }

    await this.prisma.webhookLog.create({
      data: {
        provider: 'XENDIT',
        eventId,
        eventType,
        payload,
        status: WebhookStatus.RECEIVED,
      },
    });

    await this.queue.add('process-xendit-payment', { eventId, payload }, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
    });

    return { status: 'queued' };
  }
}
