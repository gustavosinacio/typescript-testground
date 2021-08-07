import { Router } from 'express';

// import { SetsRepository } from '../modules/exercises/repositories/SetsRepository';
import { createSetController } from '../modules/exercises/useCases/createSet';
import { listSetsController } from '../modules/exercises/useCases/listSets';

const setsRoutes = Router();
// const setsRepository = new SetsRepository();

setsRoutes.get('/', (req, res) => {
  return listSetsController.handle(req, res);
});

setsRoutes.post('/', (req, res) => {
  return createSetController.handle(req, res);
});

// setsRoutes.get('/bydate', (req, res) => {
//   const { year, month, day } = req.query;

//   if (
//     typeof year === 'string' &&
//     typeof month === 'string' &&
//     typeof day === 'string'
//   ) {
//     const numberedYear = parseInt(year, 10);
//     const numberedMonth = parseInt(month, 10);
//     const numberedDay = parseInt(day, 10);

//     const found = setsRepository.findByDate(
//       numberedYear,
//       numberedMonth,
//       numberedDay,
//     );

//     return res.json(found);
//   }
// });

export { setsRoutes };
