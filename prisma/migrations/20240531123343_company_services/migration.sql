-- CreateTable
CREATE TABLE "companies_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type_required" "SpecialtyTypes"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "companies_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "companies_services" ADD CONSTRAINT "companies_services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
