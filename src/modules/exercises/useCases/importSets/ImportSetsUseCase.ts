import csv from 'csv-parser';
import fs from 'fs';
import {
  ICreateSetDTO,
  ISetsRepository,
} from '../../repositories/ISetsRepository';

interface IUnformatedStrongSet {
  Data: string;
  ['Nome do treino']: string;
  ['Nome do exercício']: string;
  ['Ordem da série']: string;
  Peso: string;
  Reps: string;
  ['Distância']: string;
  Segundos: string;
  Notas: string;
  ['Notas do treino']: string;
  RPE: string;
}

interface IFormatedSet extends ICreateSetDTO {
  created_at: string;
}

class ImportSetsUseCase {
  constructor(private setsRepository: ISetsRepository) {}

  loadSets(file: Express.Multer.File): Promise<IFormatedSet[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const sets: IFormatedSet[] = [];

      const parserFile = csv();

      stream.pipe(parserFile);
      parserFile
        .on('data', (line: IUnformatedStrongSet) => {
          const {
            Data: created_at,
            'Nome do treino': session_name,
            'Nome do exercício': exercise_name,
            'Ordem da série': set_order,
            Peso: weight_kg,
            Reps: reps,
            Distância: distance_meters,
            Segundos: seconds,
            Notas: notes,
            'Notas do treino': session_notes,
            RPE: rpe,
            ...rest
          } = line;

          const formatedRow: IFormatedSet = {
            created_at,
            session_name,
            exercise_name,
            set_order: parseInt(set_order, 10),
            weight_kg: parseInt(weight_kg, 10),
            reps: parseInt(reps, 10),
            distance_meters: parseInt(distance_meters, 10),
            seconds: parseInt(seconds, 10),
            notes: [notes],
            session_notes: [session_notes],
            rpe: parseInt(rpe, 10),
            ...rest,
          };

          sets.push(formatedRow);
        })
        .on('end', () => {
          resolve(sets);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const sets = await this.loadSets(file);

    sets.map((set) => this.setsRepository.create(set));
  }
}

export { ImportSetsUseCase };