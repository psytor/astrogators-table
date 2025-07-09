-- Add unique constraint to prevent duplicate slicing costs for the same action and material
ALTER TABLE "SlicingCost" ADD CONSTRAINT "SlicingCost_action_id_material_id_key" UNIQUE ("action_id", "material_id");
