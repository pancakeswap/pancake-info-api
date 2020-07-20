import { gqlPluckFromCodeString, gqlPluckFromCodeStringSync } from '@graphql-tools/graphql-tag-pluck';
import simplegit from 'simple-git/promise';
import simplegitSync from 'simple-git';
import { parseGraphQLSDL, parseGraphQLJSON } from '@graphql-tools/utils';

const createLoadError = (error) => new Error('Unable to load schema from git: ' + error);
const createCommand = ({ ref, path }) => {
    return [`${ref}:${path}`];
};
async function loadFromGit(input) {
    try {
        const git = simplegit();
        return await git.show(createCommand(input));
    }
    catch (error) {
        throw createLoadError(error);
    }
}
function loadFromGitSync(input) {
    try {
        const git = simplegitSync();
        return git.show(createCommand(input));
    }
    catch (error) {
        throw createLoadError(error);
    }
}

function parse({ path, pointer, content, options, }) {
    if (/\.(gql|graphql)s?$/i.test(path)) {
        return parseGraphQLSDL(pointer, content, options);
    }
    if (/\.json$/i.test(path)) {
        return parseGraphQLJSON(pointer, content, options);
    }
}

// git:branch:path/to/file
function extractData(pointer) {
    const parts = pointer.replace(/^git\:/i, '').split(':');
    if (!parts || parts.length !== 2) {
        throw new Error('Schema pointer should match "git:branchName:path/to/file"');
    }
    return {
        ref: parts[0],
        path: parts[1],
    };
}
const createInvalidExtensionError = (path) => new Error(`Invalid file extension: ${path}`);
class GitLoader {
    loaderId() {
        return 'git-loader';
    }
    async canLoad(pointer) {
        return this.canLoadSync(pointer);
    }
    canLoadSync(pointer) {
        return typeof pointer === 'string' && pointer.toLowerCase().startsWith('git:');
    }
    async load(pointer, options) {
        const { ref, path } = extractData(pointer);
        const content = await loadFromGit({ ref, path });
        const parsed = parse({ path, options, pointer, content });
        if (parsed) {
            return parsed;
        }
        const rawSDL = await gqlPluckFromCodeString(pointer, content, options.pluckConfig);
        return ensureSource({ rawSDL, pointer, path });
    }
    loadSync(pointer, options) {
        const { ref, path } = extractData(pointer);
        const content = loadFromGitSync({ ref, path });
        const parsed = parse({ path, options, pointer, content });
        if (parsed) {
            return parsed;
        }
        const rawSDL = gqlPluckFromCodeStringSync(pointer, content, options.pluckConfig);
        return ensureSource({ rawSDL, pointer, path });
    }
}
function ensureSource({ rawSDL, pointer, path }) {
    if (rawSDL) {
        return {
            location: pointer,
            rawSDL,
        };
    }
    throw createInvalidExtensionError(path);
}

export { GitLoader };
//# sourceMappingURL=index.esm.js.map
