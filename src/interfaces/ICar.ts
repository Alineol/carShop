import { z } from 'zod';
import { vehicleZodShema } from './IVehicle';

const carSchema = vehicleZodShema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().max(7).min(2),
});

export type ICar = z.infer<typeof carSchema>;

export { carSchema };