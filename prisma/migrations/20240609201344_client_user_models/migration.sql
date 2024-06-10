-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateTable
CREATE TABLE "users_clients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_clients_profiles" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "gender" "Genders" NOT NULL,
    "nickname" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_clients_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clients_email_key" ON "users_clients"("email");
