const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  // ... dummy queries for testing
  // run with `npx ts-node index.ts`
  const allMovies = await prisma.movies.findMany();
  console.log(allMovies);
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
