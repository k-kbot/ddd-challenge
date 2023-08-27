import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const teams: Prisma.TeamCreateInput[] = [
  {
    id: '1',
    name: '001',
    pairs: {
      create: [
        {
          id: '1',
          name: 'a',
        },
        {
          id: '2',
          name: 'b',
        },
      ],
    },
  },
  {
    id: '2',
    name: '002',
    pairs: {
      create: [
        {
          id: '3',
          name: 'a',
        },
        {
          id: '4',
          name: 'b',
        },
      ],
    },
  },
  {
    id: '3',
    name: '003',
    pairs: {
      create: [
        {
          id: '5',
          name: 'a',
        },
        {
          id: '6',
          name: 'b',
        },
      ],
    },
  },
  {
    id: '4',
    name: '004',
    pairs: {
      create: [
        {
          id: '7',
          name: 'a',
        },
        {
          id: '8',
          name: 'b',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of teams) {
    const team = await prisma.team.upsert({
      where: { id: u.id },
      update: {},
      create: u,
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
