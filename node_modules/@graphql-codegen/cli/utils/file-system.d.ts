export declare function writeSync(filepath: string, content: string): void;
export declare function readSync(filepath: string): string;
export declare function fileExists(filePath: string): boolean;
export declare function unlinkFile(filePath: string, cb?: (err?: Error) => any): void;
