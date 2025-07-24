-- CreateTable
CREATE TABLE "GameVersion" (
    "id" SERIAL NOT NULL,
    "metadata_key" TEXT NOT NULL,
    "metadata_value" TEXT NOT NULL,
    "last_checked" TIMESTAMP(3) NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "game_id" TEXT NOT NULL,
    "name_key" TEXT NOT NULL,
    "alignment" TEXT NOT NULL,
    "factions" TEXT[],
    "roles" TEXT[],
    "raids" TEXT[],
    "unit_type" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameVersion_metadata_key_key" ON "GameVersion"("metadata_key");

-- CreateIndex
CREATE UNIQUE INDEX "Character_game_id_key" ON "Character"("game_id");

-- RenameIndex
ALTER INDEX "slicing_path" RENAME TO "SlicingAction_from_rarity_id_from_quality_id_to_rarity_id_t_key";
