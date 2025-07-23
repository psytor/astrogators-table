-- Drop the incorrect CalibrationInfo table
DROP TABLE "CalibrationInfo";

-- Create the new, correct CalibrationCost table
CREATE TABLE "CalibrationCost" (
    "attempt_number" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CalibrationCost_pkey" PRIMARY KEY ("attempt_number"),
    CONSTRAINT "CalibrationCost_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
