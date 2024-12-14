import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const eventId = 1; // ID fixo para o evento único
  const defaultEvent = {
    id: eventId,
    title: "Meu Evento",
    description: "Descrição do evento único",
    start_date: new Date(),
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    cidade: "Nome da cidade",
    square: "Nome do quadrante",
    reference: "Nome da referência",
    cep: "00000-000",
    neighborhood: "Nome do bairro",
    // location: "Auditório Principal",
    // capacity: 100,
    // image: "https://picsum.photos/200/300",
    // createdAt: new Date(),
    // updatedAt: new Date(),
    // deletedAt: null,
    // publishedAt: new Date(),
    // published: true,
    // canceled: false,
    // canceledAt: null,
    // canceledBy: null,
    // canceledReason: null,
  };

  // Upsert: cria ou atualiza o evento
  await prisma.event.upsert({
    where: { id: eventId }, // Verifica se o evento existe
    update: defaultEvent, // Atualiza, caso exista
    create: defaultEvent, // Cria, caso não exista
  });

  console.log("Seed executada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
