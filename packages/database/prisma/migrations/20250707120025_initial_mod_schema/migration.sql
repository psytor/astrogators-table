-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_percentage" BOOLEAN NOT NULL,
    "can_be_primary" BOOLEAN NOT NULL,
    "can_be_secondary" BOOLEAN NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModSet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "required_mods" INTEGER NOT NULL,
    "bonus_description" TEXT NOT NULL,

    CONSTRAINT "ModSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModShape" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "formal_name" TEXT NOT NULL,

    CONSTRAINT "ModShape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModQuality" (
    "id" SERIAL NOT NULL,
    "tier_letter" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,
    "initial_secondaries" INTEGER NOT NULL,

    CONSTRAINT "ModQuality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModRarity" (
    "dot_value" INTEGER NOT NULL,

    CONSTRAINT "ModRarity_pkey" PRIMARY KEY ("dot_value")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModShapePrimaryStat" (
    "shape_id" INTEGER NOT NULL,
    "stat_id" INTEGER NOT NULL,

    CONSTRAINT "ModShapePrimaryStat_pkey" PRIMARY KEY ("shape_id","stat_id")
);

-- CreateTable
CREATE TABLE "StatRollInfo" (
    "stat_id" INTEGER NOT NULL,
    "rarity_id" INTEGER NOT NULL,
    "min_roll" DOUBLE PRECISION NOT NULL,
    "max_roll" DOUBLE PRECISION NOT NULL,
    "target_roll" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StatRollInfo_pkey" PRIMARY KEY ("stat_id","rarity_id")
);

-- CreateTable
CREATE TABLE "LevelingCost" (
    "rarity_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "credit_cost" INTEGER NOT NULL,

    CONSTRAINT "LevelingCost_pkey" PRIMARY KEY ("rarity_id","level")
);

-- CreateTable
CREATE TABLE "SlicingAction" (
    "id" SERIAL NOT NULL,
    "from_rarity_id" INTEGER NOT NULL,
    "from_quality_id" INTEGER NOT NULL,
    "to_rarity_id" INTEGER NOT NULL,
    "to_quality_id" INTEGER NOT NULL,

    CONSTRAINT "SlicingAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlicingCost" (
    "action_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SlicingCost_pkey" PRIMARY KEY ("action_id","material_id")
);

-- CreateTable
CREATE TABLE "CalibrationInfo" (
    "stat_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CalibrationInfo_pkey" PRIMARY KEY ("stat_id","material_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stat_name_key" ON "Stat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModSet_name_key" ON "ModSet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModShape_name_key" ON "ModShape"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModShape_formal_name_key" ON "ModShape"("formal_name");

-- CreateIndex
CREATE UNIQUE INDEX "ModQuality_tier_letter_key" ON "ModQuality"("tier_letter");

-- CreateIndex
CREATE UNIQUE INDEX "ModQuality_color_name_key" ON "ModQuality"("color_name");

-- CreateIndex
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");

-- AddForeignKey
ALTER TABLE "ModShapePrimaryStat" ADD CONSTRAINT "ModShapePrimaryStat_shape_id_fkey" FOREIGN KEY ("shape_id") REFERENCES "ModShape"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModShapePrimaryStat" ADD CONSTRAINT "ModShapePrimaryStat_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatRollInfo" ADD CONSTRAINT "StatRollInfo_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatRollInfo" ADD CONSTRAINT "StatRollInfo_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "ModRarity"("dot_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelingCost" ADD CONSTRAINT "LevelingCost_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "ModRarity"("dot_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingAction" ADD CONSTRAINT "SlicingAction_from_rarity_id_fkey" FOREIGN KEY ("from_rarity_id") REFERENCES "ModRarity"("dot_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingAction" ADD CONSTRAINT "SlicingAction_from_quality_id_fkey" FOREIGN KEY ("from_quality_id") REFERENCES "ModQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingAction" ADD CONSTRAINT "SlicingAction_to_rarity_id_fkey" FOREIGN KEY ("to_rarity_id") REFERENCES "ModRarity"("dot_value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingAction" ADD CONSTRAINT "SlicingAction_to_quality_id_fkey" FOREIGN KEY ("to_quality_id") REFERENCES "ModQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingCost" ADD CONSTRAINT "SlicingCost_action_id_fkey" FOREIGN KEY ("action_id") REFERENCES "SlicingAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlicingCost" ADD CONSTRAINT "SlicingCost_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationInfo" ADD CONSTRAINT "CalibrationInfo_stat_id_fkey" FOREIGN KEY ("stat_id") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalibrationInfo" ADD CONSTRAINT "CalibrationInfo_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
