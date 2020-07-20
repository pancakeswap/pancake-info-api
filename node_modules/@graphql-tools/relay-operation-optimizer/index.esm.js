import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { concatAST, parse } from 'graphql';
import { transform as transform$2 } from 'relay-compiler/lib/transforms/SkipRedundantNodesTransform';
import { transform as transform$3 } from 'relay-compiler/lib/transforms/InlineFragmentsTransform';
import { transform as transform$1 } from 'relay-compiler/lib/transforms/ApplyFragmentArgumentTransform';
import { transformWithOptions } from 'relay-compiler/lib/transforms/FlattenTransform';
import CompilerContext from 'relay-compiler/lib/core/CompilerContext';
import { transform } from 'relay-compiler/lib/core/RelayParser';
import { print } from 'relay-compiler/lib/core/IRPrinter';
import { create } from 'relay-compiler/lib/core/Schema';

function optimizeDocuments(schema, documents, options = {}) {
    // @TODO way for users to define directives they use, otherwise relay will throw an unknown directive error
    // Maybe we can scan the queries and add them dynamically without users having to do some extra stuff
    // transformASTSchema creates a new schema instance instead of mutating the old one
    const adjustedSchema = create(printSchemaWithDirectives(schema, options));
    const documentAsts = concatAST(documents);
    const relayDocuments = transform(adjustedSchema, documentAsts.definitions);
    const result = [];
    if (options.includeFragments) {
        const fragmentCompilerContext = new CompilerContext(adjustedSchema)
            .addAll(relayDocuments)
            .applyTransforms([
            transform$1,
            transformWithOptions({ flattenAbstractTypes: false }),
            transform$2,
        ]);
        result.push(...fragmentCompilerContext
            .documents()
            .filter(doc => doc.kind === 'Fragment')
            .map(doc => parse(print(adjustedSchema, doc), options)));
    }
    const queryCompilerContext = new CompilerContext(adjustedSchema)
        .addAll(relayDocuments)
        .applyTransforms([
        transform$1,
        transform$3,
        transformWithOptions({ flattenAbstractTypes: false }),
        transform$2,
    ]);
    result.push(...queryCompilerContext.documents().map(doc => parse(print(adjustedSchema, doc), options)));
    return result;
}

export { optimizeDocuments };
//# sourceMappingURL=index.esm.js.map
