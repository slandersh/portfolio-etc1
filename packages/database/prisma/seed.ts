import { PrismaClient, BillingInterval } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const freePlan = await prisma.plan.upsert({
    where: { stripePriceId: 'free-plan-price-id' },
    update: {},
    create: {
      name: 'Free Plan',
      stripePriceId: 'free-plan-price-id',
      price: 0.00,
      interval: BillingInterval.MONTHLY,
      features: {
        quotas: {
          max_projects: 3,
          max_posts: 10,
        },
        flags: {
          custom_domains: false,
          premium_support: false,
        },
      },
    },
  });

  const proPlan = await prisma.plan.upsert({
    where: { stripePriceId: 'pro-plan-price-id' },
    update: {},
    create: {
      name: 'Pro Plan',
      stripePriceId: 'pro-plan-price-id',
      price: 199000.00, // IDR 199,000 / month
      interval: BillingInterval.MONTHLY,
      features: {
        quotas: {
          max_projects: 20,
          max_posts: 100,
        },
        flags: {
          custom_domains: true,
          premium_support: true,
        },
      },
    },
  });

  console.log('Plans seeded successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
