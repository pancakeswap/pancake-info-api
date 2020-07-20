import { IResolvers, IFieldResolver } from 'graphql-tools';
export declare type ResolversComposition<Resolver extends IFieldResolver<any, any> = IFieldResolver<any, any>> = (next: Resolver) => Resolver;
export declare type ResolversComposerMapping<Resolvers extends IResolvers = IResolvers> = {
    [TypeName in keyof Resolvers]?: {
        [FieldName in keyof Resolvers[TypeName]]: Resolvers[TypeName][FieldName] extends IFieldResolver<any, any> ? ResolversComposition<Resolvers[TypeName][FieldName]> | Array<ResolversComposition<Resolvers[TypeName][FieldName]>> : ResolversComposition | ResolversComposition[];
    };
} | {
    [path: string]: ResolversComposition | ResolversComposition[];
};
/**
 * Wraps the resolvers object with the resolvers composition objects.
 * Implemented as a simple and basic middleware mechanism.
 *
 * @param resolvers - resolvers object
 * @param mapping - resolvers composition mapping
 * @hidden
 */
export declare function composeResolvers<Resolvers extends IResolvers>(resolvers: Resolvers, mapping?: ResolversComposerMapping<Resolvers>): Resolvers;
