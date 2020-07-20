'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const graphqlTagPluck = require('@graphql-tools/graphql-tag-pluck');
const simplegit = _interopDefault(require('simple-git/promise'));
const simplegitSync = _interopDefault(require('simple-git'));
const utils = require('@graphql-tools/utils');

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
        return utils.parseGraphQLSDL(pointer, content, options);
    }
    if (/\.json$/i.test(path)) {
        return utils.parseGraphQLJSON(pointer, content, options);
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
        const rawSDL = await graphqlTagPluck.gqlPluckFromCodeString(pointer, content, options.pluckConfig);
        return ensureSource({ rawSDL, pointer, path });
    }
    loadSync(pointer, options) {
        const { ref, path } = extractData(pointer);
        const content = loadFromGitSync({ ref, path });
        const parsed = parse({ path, options, pointer, content });
        if (parsed) {
            return parsed;
        }
        const rawSDL = graphqlTagPluck.gqlPluckFromCodeStringSync(pointer, content, options.pluckConfig);
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

exports.GitLoader = GitLoader;
//# sourceMappingURL=index.cjs.js.map
