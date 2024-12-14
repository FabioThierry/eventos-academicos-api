-- CreateEnum
CREATE TYPE "EducationEnum" AS ENUM ('ELEMENTARY_COMPLETED', 'ELEMENTARY_INCOMPLETE', 'HIGH_SCHOOL_COMPLETED', 'HIGH_SCHOOL_INCOMPLETE', 'HIGHER_EDUCATION_COMPLETED', 'HIGHER_EDUCATION_INCOMPLETE', 'POSTGRADUATE_LATO_SENSU_COMPLETED', 'POSTGRADUATE_LATO_SENSU_INCOMPLETE', 'POSTGRADUATE_STRICTO_SENSU_MASTER_COMPLETED', 'POSTGRADUATE_STRICTO_SENSU_MASTER_INCOMPLETE', 'POSTGRADUATE_STRICTO_SENSU_DOCTORATE_COMPLETED', 'POSTGRADUATE_STRICTO_SENSU_DOCTORATE_INCOMPLETE');

-- CreateEnum
CREATE TYPE "EventEnum" AS ENUM ('SPEAKER', 'LISTENER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "StateEnum" AS ENUM ('PROSPECT', 'REGISTERED', 'PARTICIPANT', 'EX_PARTICIPANT');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,
    "requisiteId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityRequisit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ActivityRequisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emissao_date" TIMESTAMP(3) NOT NULL,
    "modelId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "cidade" TEXT NOT NULL,
    "square" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequency" (
    "id" TEXT NOT NULL,
    "presence" BOOLEAN NOT NULL,
    "checked_by" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "register_frequency_datetime" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "eventId" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequents" (
    "participantId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "frequencyId" TEXT NOT NULL,
    "confirmation" BOOLEAN NOT NULL,
    "confirmated_at" TIMESTAMP(3),

    CONSTRAINT "Frequents_pkey" PRIMARY KEY ("participantId","activityId","frequencyId")
);

-- CreateTable
CREATE TABLE "ModelCertificate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ModelCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "eventId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("eventId","activityId","organizationId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "education_lvl" "EducationEnum" NOT NULL,
    "state_lvl" "StateEnum" NOT NULL,
    "event_lvl" "EventEnum" NOT NULL,
    "inscription_id" INTEGER NOT NULL,
    "inscription_datetime" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recive" (
    "participantId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "Recive_pkey" PRIMARY KEY ("participantId","activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_requisiteId_fkey" FOREIGN KEY ("requisiteId") REFERENCES "ActivityRequisit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ModelCertificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequents" ADD CONSTRAINT "Frequents_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequents" ADD CONSTRAINT "Frequents_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "Frequency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Frequents" ADD CONSTRAINT "Frequents_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recive" ADD CONSTRAINT "Recive_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recive" ADD CONSTRAINT "Recive_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
