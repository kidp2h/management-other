import { faker } from '@faker-js/faker';
import randomatic from 'randomatic';

import {
  ethnicities,
  fieldOfApplication,
  kindOfApplication,
} from '@/lib/zod/schemas/application-schema';

import { db } from '.';
import type { Applications } from './schema';
import { applications } from './schema';

const seed = async () => {
  // Initialize PostgreSQL connection

  // Seed users
  // await db.insert(roles).values([
  //   {
  //     code: 'LANH_DAO',
  //     name: 'Lãnh đạo',
  //   },
  //   {
  //     code: 'CAN_BO_TIEP_DAN',
  //     name: 'Cán bộ tiếp dân',
  //   },
  //   {
  //     code: 'KIEM_SAT_VIEN',
  //     name: 'Kiểm sát viên',
  //   },
  // ]);
  const values: Applications[] = [];

  for (let i = 0; i < 234; i++) {
    values.push({
      code: `A${randomatic('A0A', 10)}${new Date().getSeconds()}${new Date().getFullYear()}`,
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      identityCard: faker.finance.accountNumber(12),
      issueDate: faker.date.soon(),
      placeOfIssue: faker.location.city(),
      gender: faker.helpers.arrayElement(['Nam', 'Nữ']),
      phoneNumber: faker.phone.number(),
      ethnicity: faker.helpers.arrayElement(ethnicities),
      address: faker.location.streetAddress(),
      province: faker.location.state(),
      district: faker.location.city(),
      ward: faker.location.city(),
      fieldOfApplication: faker.helpers.arrayElement(fieldOfApplication),
      objectsOfApplication: faker.helpers.arrayElement([
        'Cá nhân',
        'Tổ chức',
        'Tập thể',
      ]),
      national: faker.location.country(),
      occupation: faker.person.jobTitle(),
      kindOfApplication: faker.helpers.arrayElement(kindOfApplication),
      provinceOfIncidentOccured: faker.location.state(),
      districtOfIncidentOccured: faker.location.city(),
      wardOfIncidentOccured: faker.location.city(),
      addressOfIncidentOccured: faker.location.streetAddress(),
      content: faker.lorem.paragraph(),
      contentDetail: faker.lorem.paragraph(),
      createdAt: faker.date.recent({
        days: 90,
      }),
      id: faker.string.uuid(),
      status: faker.helpers.arrayElement([
        'COMPLETED',
        'RESEARCHING',
        'PENDING',
        'REPORTED',
      ]),
      files: [],
      updatedAt: new Date(),
      receptionistId: 'user_2p3CS4tG9zehOSZZIFKDAluLdtU',
      acceptorId: 'user_2p3CS4tG9zehOSZZIFKDAluLdtU',
      researcherId: 'user_2p3CJ3JoT4uMxGBhSUKsmm0cKxU',
      reporterId: 'user_2p3CUrMqVCpLoNlXOXuozgIp7Gp',
    });
  }

  await db.insert(applications).values(values);
};
seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seeding completed');
    process.exit(0);
  });
