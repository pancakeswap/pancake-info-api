import { GraphQLSchema } from 'graphql';
import { AsyncExecutor, SyncExecutor } from '@graphql-tools/delegate';
export declare function introspectSchema(executor: AsyncExecutor, context?: Record<string, any>): Promise<GraphQLSchema>;
export declare function introspectSchemaSync(executor: SyncExecutor, context?: Record<string, any>): GraphQLSchema;
