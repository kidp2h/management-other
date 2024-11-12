import { db } from '.';
import { roles } from './schema';

const seed = async () => {
  // Initialize PostgreSQL connection

  // Seed users
  await db.insert(roles).values([
    {
      code: 'LANH_DAO',
      name: 'Lãnh đạo',
    },
    {
      code: 'CAN_BO_TIEP_DAN',
      name: 'Cán bộ tiếp dân',
    },
    {
      code: 'KIEM_SAT_VIEN',
      name: 'Kiểm sát viên',
    },
  ]);
};
seed()
  .catch(e => {
    process.exit(1);
  })
  .finally(() => {
    console.log('Seeding completed');
    process.exit(0);
  });
