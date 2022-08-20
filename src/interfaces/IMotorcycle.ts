import { z } from 'zod';
import { vehicleZodShema } from './IVehicle';

const motorcycleSchema = vehicleZodShema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().max(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleSchema>;

export { motorcycleSchema as motoSchema };