import { Types } from '@graphql-codegen/plugin-helpers';
import { CodegenContext } from './config';
export declare const defaultLoader: (mod: string) => Promise<any>;
export declare function executeCodegen(input: CodegenContext | Types.Config): Promise<Types.FileOutput[]>;
