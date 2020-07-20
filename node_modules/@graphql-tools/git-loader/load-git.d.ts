declare type Input = {
    ref: string;
    path: string;
};
export declare function loadFromGit(input: Input): Promise<string | never>;
export declare function loadFromGitSync(input: Input): string | never;
export {};
