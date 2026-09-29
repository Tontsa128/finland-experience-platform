-- Data integrity hardening for values that must never be negative or internally inconsistent.
-- Constraints are added as NOT VALID first so an existing production dataset can be
-- audited and cleaned before validation. New writes are enforced immediately.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'availability_capacity_nonnegative'
      AND conrelid = 'public.availability'::regclass
  ) THEN
    ALTER TABLE public.availability
      ADD CONSTRAINT availability_capacity_nonnegative
      CHECK (capacity >= 0) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'availability_booked_nonnegative'
      AND conrelid = 'public.availability'::regclass
  ) THEN
    ALTER TABLE public.availability
      ADD CONSTRAINT availability_booked_nonnegative
      CHECK (booked >= 0) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'availability_booked_not_over_capacity'
      AND conrelid = 'public.availability'::regclass
  ) THEN
    ALTER TABLE public.availability
      ADD CONSTRAINT availability_booked_not_over_capacity
      CHECK (booked <= capacity) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'seasonal_pricing_valid_range'
      AND conrelid = 'public.seasonal_pricing'::regclass
  ) THEN
    ALTER TABLE public.seasonal_pricing
      ADD CONSTRAINT seasonal_pricing_valid_range
      CHECK (end_date >= start_date) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'seasonal_pricing_multiplier_positive'
      AND conrelid = 'public.seasonal_pricing'::regclass
  ) THEN
    ALTER TABLE public.seasonal_pricing
      ADD CONSTRAINT seasonal_pricing_multiplier_positive
      CHECK (price_multiplier >= 0) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'experience_group_size_valid'
      AND conrelid = 'public.experiences'::regclass
  ) THEN
    ALTER TABLE public.experiences
      ADD CONSTRAINT experience_group_size_valid
      CHECK (min_group_size >= 1 AND max_group_size >= min_group_size) NOT VALID;
  END IF;
END $$;
