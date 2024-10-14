import { relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const enumBloodType: [string, ...string[]] = ['A', 'B', 'AB', 'O'];
export const enumDegree: [string, ...string[]] = [
  'Cao đẳng',
  'Đại học',
  'Thạc sĩ',
  'Tiến sĩ',
  'Giáo sư',
  'Phó giáo sư',
];
export const enumEnglishCertification: [string, ...string[]] = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
];
export const enumTechnologyCertification: [string, ...string[]] = [
  'A',
  'B',
  'C',
];

export const religions = pgTable('religions', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ranks = pgTable('ranks', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  name: text('name').notNull().unique(),
  code: text('code').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const languages = pgTable('languages', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const records = pgTable('records', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  fullName: text('full_name'),
  religionId: uuid('religion_id'),
  birthday: timestamp('birthday'),

  bloodType: text('blood_type', {
    enum: enumBloodType,
  }),
  rankId: uuid('rank_id'),
  englishCertification: text('english_certification', {
    enum: enumEnglishCertification,
  }),
  technologyCertification: text('technology_certification', {
    enum: enumTechnologyCertification,
  }),
  isPartyMember: boolean('is_party_member'),
  degree: text('degree', {
    enum: enumDegree,
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => {
      return new Date();
    })
    .notNull(),
});
export const recordsToLanguages = pgTable(
  'records_to_languages',
  {
    recordId: uuid('record_id')
      .notNull()
      .references(() => records.id),
    languageId: uuid('language_id')
      .notNull()
      .references(() => languages.id),
  },
  t => ({
    pk: primaryKey({ columns: [t.recordId, t.languageId] }),
  }),
);
export const recordsToLanguagesRelations = relations(
  recordsToLanguages,
  ({ one }) => ({
    records: one(records, {
      fields: [recordsToLanguages.recordId],
      references: [records.id],
    }),
    languages: one(languages, {
      fields: [recordsToLanguages.languageId],
      references: [languages.id],
    }),
  }),
);
export const recordsRelations = relations(records, ({ one, many }) => ({
  religion: one(religions, {
    fields: [records.religionId],
    references: [religions.id],
  }),
  rank: one(ranks, {
    fields: [records.rankId],
    references: [ranks.id],
  }),
  recordsToLanguages: many(recordsToLanguages),
}));

export const roles = pgTable('roles', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const permissions = pgTable('permissions', {
  id: uuid('id')
    .$default(() => uuidv4())
    .primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rolePermissions = pgTable('role_permissions', {
  roleId: uuid('role_id')
    .references(() => roles.id)
    .notNull(),
  permissionId: uuid('permission_id')
    .references(() => permissions.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const languagesRelations = relations(languages, ({ many }) => ({
  recordsToLanguages: many(recordsToLanguages),
}));

export type Religions = typeof religions.$inferSelect;
export type Languages = typeof languages.$inferSelect;
export type Ranks = typeof ranks.$inferSelect;
export type Records = typeof records.$inferSelect;
export type RecordsLanguages = typeof recordsToLanguages.$inferSelect;
export type EnumDegree = typeof records.$inferSelect.degree;
export type EnumBloodType = typeof records.$inferSelect.bloodType;
export type Roles = typeof roles.$inferSelect;
export type Permissions = typeof permissions.$inferSelect;
export type RolePermissions = typeof rolePermissions.$inferSelect;
