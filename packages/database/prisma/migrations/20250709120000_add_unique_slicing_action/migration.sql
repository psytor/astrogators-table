-- Add unique constraint to prevent duplicate slicing actions
ALTER TABLE "SlicingAction" ADD CONSTRAINT "slicing_path" UNIQUE ("from_rarity_id", "from_quality_id", "to_rarity_id", "to_quality_id");
