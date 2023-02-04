import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const teamData: Prisma.TeamCreateInput[] = [
  {
    id: '1',
    name: '001',
  },
  {
    id: '2',
    name: '002',
  },
  {
    id: '3',
    name: '003',
  },
  {
    id: '4',
    name: '004',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of teamData) {
    const team = await prisma.team.create({
      data: u,
    });
    console.log(`Created user with id: ${team.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
