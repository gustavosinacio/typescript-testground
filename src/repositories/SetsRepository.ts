import { v4 as uuidV4 } from 'uuid';

import { Set } from '../model/Set';

// DTO: Data Transfer Object
interface ICreateSetDTO {
  session_name: string;
  exercise_name: string;
  set_order: number;
  weight_kg: number;
  reps: number;
  distance_meters: number;
  seconds: number;
  notes: string[];
  session_notes: string[];
  set_notes: string[];
  rpe: number;
}

class SetsRepository {
  private sets: Set[] = [];

  constructor() {
    this.sets = [];
  }

  create({
    session_name,
    exercise_name,
    set_order,
    weight_kg,
    reps,
    distance_meters,
    seconds,
    notes,
    session_notes,
    set_notes,
    rpe,
  }: ICreateSetDTO): Set {
    const created_at = new Date();
    const set = new Set();

    Object.assign(set, {
      session_name,
      exercise_name,
      set_order,
      weight_kg,
      reps,
      distance_meters,
      seconds,
      notes,
      session_notes,
      set_notes,
      rpe,
      created_at,
    });

    this.sets.push(set);
    return set;
  }

  list(): Set[] {
    return this.sets;
  }
}

export { SetsRepository };
