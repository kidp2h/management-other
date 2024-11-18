import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

import { ethnicities } from '@/lib/zod/schemas/application-schema';

export const roles = pgTable('roles', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const applications = pgTable(
  'applications',
  {
    id: uuid('id')
      .$default(() => uuidv4())
      .primaryKey(),
    objectsOfApplication: text('objects_of_application').notNull(),
    code: text('code').notNull().unique(),
    fullName: text('full_name').notNull(),
    email: text('email'),
    identityCard: text('identity_card').notNull(),
    issueDate: timestamp('issue_date').notNull(),
    placeOfIssue: text('place_of_issue').notNull(),
    gender: text('gender').notNull(),
    phoneNumber: text('phone_number').notNull(),
    ethnicity: text('ethnicity', {
      enum: ethnicities,
    }).notNull(),
    address: text('address').notNull(),
    province: text('province').notNull(),
    district: text('district').notNull(),
    ward: text('ward').notNull(),
    fieldOfApplication: text('field_of_application').notNull(),
    national: text('national').notNull(),
    occupation: text('occupation').notNull(),
    kindOfApplication: text('kind_of_application').notNull(),
    provinceOfIncidentOccured: text('province_of_incident_occured').notNull(),
    districtOfIncidentOccured: text('district_of_incident_occured').notNull(),
    wardOfIncidentOccured: text('ward_of_incident_occured').notNull(),
    addressOfIncidentOccured: text('address_of_incident_occured').notNull(),
    content: text('content').notNull(),
    contentDetail: text('content_detail').notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$defaultFn(() => {
        return new Date();
      }),
    files: text('files')
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    receptionistId: text('receptionist_id'),
    acceptorId: text('acceptor_id'),
    researcherId: text('researcher_id'),
    reporterId: text('reporter_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    status: text('status', {
      enum: ['PENDING', 'REPORTED', 'RESEARCHING', 'COMPLETED'],
    })
      .default('PENDING')
      .notNull(),
  },
  t => ({
    unq: unique('unq').on(
      t.identityCard,
      t.kindOfApplication,
      t.fieldOfApplication,
    ),
  }),
);

export const enumStatusMapped = {
  PENDING: 'Chờ xử lý',
  REPORTED: 'Đã báo cáo lãnh đạo',
  RESEARCHING: 'Đang điều tra',
  COMPLETED: 'Hoàn tất',
};

// export const applicationsApproval = pgTable('applications_approval', {
//   id: uuid('id')
//     .$default(() => uuidv4())
//     .primaryKey(),
//   applicationId: uuid('application_id')
//     .references(() => applications.id)
//     .notNull(),
//   userId: text('user_id').notNull(),
//   status: text('status', {
//     enum: ['PENDING', 'ACCEPTED', 'REPORTED', 'RESEARCHING'],
//   }).notNull(),

//   updatedAt: timestamp('updated_at')
//     .defaultNow()
//     .notNull()
//     .$defaultFn(() => {
//       return new Date();
//     }),
//   createdAt: timestamp('created_at').defaultNow().notNull(),
// });

export type Roles = typeof roles.$inferSelect;
export type Applications = typeof applications.$inferSelect;
