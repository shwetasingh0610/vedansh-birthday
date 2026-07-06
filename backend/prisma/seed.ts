import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.wish.count();
  if (count > 0) {
    console.log('Wishes already present — skipping seed.');
    return;
  }
  await prisma.wish.createMany({
    data: [
      { name: 'Nani & Nana', message: 'Our little tiger, you fill our world with roars of joy!' },
      { name: 'The Sharmas', message: 'Happy 1st birthday, brave explorer! 🎂' },
    ],
  });
  console.log('Seeded starter wishes 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
