import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name']);

export const MemoryScalarFieldEnumSchema = z.enum(['id','name','description','timestamp','image','userId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(3).max(64),
})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  memories: MemoryWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  memories: z.lazy(() => MemoryWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// MEMORY SCHEMA
/////////////////////////////////////////

export const MemorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Memory = z.infer<typeof MemorySchema>

// MEMORY RELATION SCHEMA
//------------------------------------------------------

export type MemoryRelations = {
  user: UserWithRelations;
};

export type MemoryWithRelations = z.infer<typeof MemorySchema> & MemoryRelations

export const MemoryWithRelationsSchema: z.ZodType<MemoryWithRelations> = MemorySchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  memories: z.union([z.boolean(),z.lazy(() => MemoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  memories: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  memories: z.union([z.boolean(),z.lazy(() => MemoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEMORY
//------------------------------------------------------

export const MemoryIncludeSchema: z.ZodType<Prisma.MemoryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const MemoryArgsSchema: z.ZodType<Prisma.MemoryDefaultArgs> = z.object({
  select: z.lazy(() => MemorySelectSchema).optional(),
  include: z.lazy(() => MemoryIncludeSchema).optional(),
}).strict();

export const MemorySelectSchema: z.ZodType<Prisma.MemorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  image: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CREATE MANY USER AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyUserAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyUserAndReturnOutputTypeSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

// CREATE MANY MEMORY AND RETURN OUTPUT TYPE
//------------------------------------------------------

export const CreateManyMemoryAndReturnOutputTypeIncludeSchema: z.ZodType<Prisma.CreateManyMemoryAndReturnOutputTypeInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CreateManyMemoryAndReturnOutputTypeArgsSchema: z.ZodType<Prisma.CreateManyMemoryAndReturnOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CreateManyMemoryAndReturnOutputTypeSelectSchema).optional(),
  include: z.lazy(() => CreateManyMemoryAndReturnOutputTypeIncludeSchema).optional(),
}).strict();

export const CreateManyMemoryAndReturnOutputTypeSelectSchema: z.ZodType<Prisma.CreateManyMemoryAndReturnOutputTypeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  image: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  memories: z.lazy(() => MemoryListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  memories: z.lazy(() => MemoryOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string().email()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string().email(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3).max(64) ]).optional(),
  memories: z.lazy(() => MemoryListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const MemoryWhereInputSchema: z.ZodType<Prisma.MemoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemoryWhereInputSchema),z.lazy(() => MemoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemoryWhereInputSchema),z.lazy(() => MemoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryWhereInput>;

export const MemoryOrderByWithRelationInputSchema: z.ZodType<Prisma.MemoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryOrderByWithRelationInput>;

export const MemoryWhereUniqueInputSchema: z.ZodType<Prisma.MemoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MemoryWhereInputSchema),z.lazy(() => MemoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemoryWhereInputSchema),z.lazy(() => MemoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1).max(255) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.MemoryWhereUniqueInput>;

export const MemoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MemoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MemoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MemoryMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryOrderByWithAggregationInput>;

export const MemoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MemoryScalarWhereWithAggregatesInputSchema),z.lazy(() => MemoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemoryScalarWhereWithAggregatesInputSchema),z.lazy(() => MemoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  name: z.string().min(3).max(64),
  memories: z.lazy(() => MemoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  name: z.string().min(3).max(64),
  memories: z.lazy(() => MemoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memories: z.lazy(() => MemoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  memories: z.lazy(() => MemoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  name: z.string().min(3).max(64)
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const MemoryCreateInputSchema: z.ZodType<Prisma.MemoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMemoriesInputSchema)
}).strict() as z.ZodType<Prisma.MemoryCreateInput>;

export const MemoryUncheckedCreateInputSchema: z.ZodType<Prisma.MemoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.MemoryUncheckedCreateInput>;

export const MemoryUpdateInputSchema: z.ZodType<Prisma.MemoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMemoriesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryUpdateInput>;

export const MemoryUncheckedUpdateInputSchema: z.ZodType<Prisma.MemoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedUpdateInput>;

export const MemoryCreateManyInputSchema: z.ZodType<Prisma.MemoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.MemoryCreateManyInput>;

export const MemoryUpdateManyMutationInputSchema: z.ZodType<Prisma.MemoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUpdateManyMutationInput>;

export const MemoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MemoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const MemoryListRelationFilterSchema: z.ZodType<Prisma.MemoryListRelationFilter> = z.object({
  every: z.lazy(() => MemoryWhereInputSchema).optional(),
  some: z.lazy(() => MemoryWhereInputSchema).optional(),
  none: z.lazy(() => MemoryWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryListRelationFilter>;

export const MemoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MemoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const MemoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryCountOrderByAggregateInput>;

export const MemoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MemoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryMaxOrderByAggregateInput>;

export const MemoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.MemoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.MemoryMinOrderByAggregateInput>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const MemoryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemoryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryCreateWithoutUserInputSchema).array(),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryCreateNestedManyWithoutUserInput>;

export const MemoryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemoryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryCreateWithoutUserInputSchema).array(),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedCreateNestedManyWithoutUserInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const MemoryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemoryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryCreateWithoutUserInputSchema).array(),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemoryScalarWhereInputSchema),z.lazy(() => MemoryScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUpdateManyWithoutUserNestedInput>;

export const MemoryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemoryUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryCreateWithoutUserInputSchema).array(),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemoryWhereUniqueInputSchema),z.lazy(() => MemoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemoryScalarWhereInputSchema),z.lazy(() => MemoryScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedUpdateManyWithoutUserNestedInput>;

export const UserCreateNestedOneWithoutMemoriesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMemoriesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMemoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMemoriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutMemoriesInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutMemoriesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMemoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMemoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMemoriesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMemoriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMemoriesInputSchema),z.lazy(() => UserUpdateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMemoriesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMemoriesNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const MemoryCreateWithoutUserInputSchema: z.ZodType<Prisma.MemoryCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.MemoryCreateWithoutUserInput>;

export const MemoryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MemoryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.MemoryUncheckedCreateWithoutUserInput>;

export const MemoryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MemoryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MemoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.MemoryCreateOrConnectWithoutUserInput>;

export const MemoryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MemoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemoryCreateManyUserInputSchema),z.lazy(() => MemoryCreateManyUserInputSchema).array() ]),
}).strict() as z.ZodType<Prisma.MemoryCreateManyUserInputEnvelope>;

export const MemoryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemoryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MemoryUpdateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MemoryCreateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.MemoryUpsertWithWhereUniqueWithoutUserInput>;

export const MemoryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MemoryUpdateWithoutUserInputSchema),z.lazy(() => MemoryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.MemoryUpdateWithWhereUniqueWithoutUserInput>;

export const MemoryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MemoryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MemoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MemoryUpdateManyMutationInputSchema),z.lazy(() => MemoryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.MemoryUpdateManyWithWhereWithoutUserInput>;

export const MemoryScalarWhereInputSchema: z.ZodType<Prisma.MemoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemoryScalarWhereInputSchema),z.lazy(() => MemoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemoryScalarWhereInputSchema),z.lazy(() => MemoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryScalarWhereInput>;

export const UserCreateWithoutMemoriesInputSchema: z.ZodType<Prisma.UserCreateWithoutMemoriesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  name: z.string().min(3).max(64)
}).strict() as z.ZodType<Prisma.UserCreateWithoutMemoriesInput>;

export const UserUncheckedCreateWithoutMemoriesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMemoriesInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email(),
  name: z.string().min(3).max(64)
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutMemoriesInput>;

export const UserCreateOrConnectWithoutMemoriesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMemoriesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMemoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutMemoriesInput>;

export const UserUpsertWithoutMemoriesInputSchema: z.ZodType<Prisma.UserUpsertWithoutMemoriesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMemoriesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutMemoriesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutMemoriesInput>;

export const UserUpdateToOneWithWhereWithoutMemoriesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMemoriesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMemoriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMemoriesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMemoriesInput>;

export const UserUpdateWithoutMemoriesInputSchema: z.ZodType<Prisma.UserUpdateWithoutMemoriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateWithoutMemoriesInput>;

export const UserUncheckedUpdateWithoutMemoriesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMemoriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(3).max(64),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutMemoriesInput>;

export const MemoryCreateManyUserInputSchema: z.ZodType<Prisma.MemoryCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(255),
  description: z.string(),
  timestamp: z.coerce.date(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.MemoryCreateManyUserInput>;

export const MemoryUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemoryUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUpdateWithoutUserInput>;

export const MemoryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemoryUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedUpdateWithoutUserInput>;

export const MemoryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MemoryUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryUncheckedUpdateManyWithoutUserInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const MemoryFindFirstArgsSchema: z.ZodType<Prisma.MemoryFindFirstArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereInputSchema.optional(),
  orderBy: z.union([ MemoryOrderByWithRelationInputSchema.array(),MemoryOrderByWithRelationInputSchema ]).optional(),
  cursor: MemoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemoryScalarFieldEnumSchema,MemoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryFindFirstArgs>;

export const MemoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MemoryFindFirstOrThrowArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereInputSchema.optional(),
  orderBy: z.union([ MemoryOrderByWithRelationInputSchema.array(),MemoryOrderByWithRelationInputSchema ]).optional(),
  cursor: MemoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemoryScalarFieldEnumSchema,MemoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryFindFirstOrThrowArgs>;

export const MemoryFindManyArgsSchema: z.ZodType<Prisma.MemoryFindManyArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereInputSchema.optional(),
  orderBy: z.union([ MemoryOrderByWithRelationInputSchema.array(),MemoryOrderByWithRelationInputSchema ]).optional(),
  cursor: MemoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemoryScalarFieldEnumSchema,MemoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.MemoryFindManyArgs>;

export const MemoryAggregateArgsSchema: z.ZodType<Prisma.MemoryAggregateArgs> = z.object({
  where: MemoryWhereInputSchema.optional(),
  orderBy: z.union([ MemoryOrderByWithRelationInputSchema.array(),MemoryOrderByWithRelationInputSchema ]).optional(),
  cursor: MemoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MemoryAggregateArgs>;

export const MemoryGroupByArgsSchema: z.ZodType<Prisma.MemoryGroupByArgs> = z.object({
  where: MemoryWhereInputSchema.optional(),
  orderBy: z.union([ MemoryOrderByWithAggregationInputSchema.array(),MemoryOrderByWithAggregationInputSchema ]).optional(),
  by: MemoryScalarFieldEnumSchema.array(),
  having: MemoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.MemoryGroupByArgs>;

export const MemoryFindUniqueArgsSchema: z.ZodType<Prisma.MemoryFindUniqueArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MemoryFindUniqueArgs>;

export const MemoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MemoryFindUniqueOrThrowArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MemoryFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserAndReturnCreateManyArgsSchema: z.ZodType<Prisma.UserAndReturnCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() as z.ZodType<Prisma.UserAndReturnCreateManyArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const MemoryCreateArgsSchema: z.ZodType<Prisma.MemoryCreateArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  data: z.union([ MemoryCreateInputSchema,MemoryUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.MemoryCreateArgs>;

export const MemoryUpsertArgsSchema: z.ZodType<Prisma.MemoryUpsertArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereUniqueInputSchema,
  create: z.union([ MemoryCreateInputSchema,MemoryUncheckedCreateInputSchema ]),
  update: z.union([ MemoryUpdateInputSchema,MemoryUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.MemoryUpsertArgs>;

export const MemoryCreateManyArgsSchema: z.ZodType<Prisma.MemoryCreateManyArgs> = z.object({
  data: z.union([ MemoryCreateManyInputSchema,MemoryCreateManyInputSchema.array() ]),
}).strict() as z.ZodType<Prisma.MemoryCreateManyArgs>;

export const MemoryAndReturnCreateManyArgsSchema: z.ZodType<Prisma.MemoryAndReturnCreateManyArgs> = z.object({
  data: z.union([ MemoryCreateManyInputSchema,MemoryCreateManyInputSchema.array() ]),
}).strict() as z.ZodType<Prisma.MemoryAndReturnCreateManyArgs>;

export const MemoryDeleteArgsSchema: z.ZodType<Prisma.MemoryDeleteArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  where: MemoryWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MemoryDeleteArgs>;

export const MemoryUpdateArgsSchema: z.ZodType<Prisma.MemoryUpdateArgs> = z.object({
  select: MemorySelectSchema.optional(),
  include: MemoryIncludeSchema.optional(),
  data: z.union([ MemoryUpdateInputSchema,MemoryUncheckedUpdateInputSchema ]),
  where: MemoryWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.MemoryUpdateArgs>;

export const MemoryUpdateManyArgsSchema: z.ZodType<Prisma.MemoryUpdateManyArgs> = z.object({
  data: z.union([ MemoryUpdateManyMutationInputSchema,MemoryUncheckedUpdateManyInputSchema ]),
  where: MemoryWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MemoryUpdateManyArgs>;

export const MemoryDeleteManyArgsSchema: z.ZodType<Prisma.MemoryDeleteManyArgs> = z.object({
  where: MemoryWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.MemoryDeleteManyArgs>;