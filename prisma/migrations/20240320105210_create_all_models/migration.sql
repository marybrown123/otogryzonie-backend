-- CreateEnum
CREATE TYPE "RodentType" AS ENUM ('GUINEA_PIG', 'HAMSTER', 'RAT', 'MOUSE', 'CHINCHILLA', 'DEGUS');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('BREEDER', 'PRIVATE_PERSON');

-- CreateEnum
CREATE TYPE "AdvertismentType" AS ENUM ('BREEDING', 'ADOPTIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rodent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RodentType" NOT NULL,
    "features_id" INTEGER NOT NULL,

    CONSTRAINT "rodent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AdvertismentType" NOT NULL,
    "location" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rodent_id" INTEGER NOT NULL,

    CONSTRAINT "advertisment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "domestication" TEXT NOT NULL,
    "hair_length" TEXT NOT NULL,
    "neutered" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rodent_image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rodent_id" INTEGER NOT NULL,

    CONSTRAINT "rodent_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rodent_features_id_key" ON "rodent"("features_id");

-- CreateIndex
CREATE UNIQUE INDEX "advertisment_rodent_id_key" ON "advertisment"("rodent_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_image_user_id_key" ON "user_image"("user_id");

-- AddForeignKey
ALTER TABLE "rodent" ADD CONSTRAINT "rodent_features_id_fkey" FOREIGN KEY ("features_id") REFERENCES "features"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisment" ADD CONSTRAINT "advertisment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisment" ADD CONSTRAINT "advertisment_rodent_id_fkey" FOREIGN KEY ("rodent_id") REFERENCES "rodent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rodent_image" ADD CONSTRAINT "rodent_image_rodent_id_fkey" FOREIGN KEY ("rodent_id") REFERENCES "rodent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
