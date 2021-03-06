import { Client, Config, Output } from 'prisma-cli-engine';
import { PrismaDefinitionClass } from 'prisma-yml';
export declare class Seeder {
    definition: PrismaDefinitionClass;
    client: Client;
    out: Output;
    config: Config;
    constructor(definition: PrismaDefinitionClass, client: Client, out: Output, config: Config);
    seed(serviceName: string, stageName: string, reset?: boolean, workspaceSlug?: string): Promise<void>;
    getOperations(query: any): string[];
    executeQuery(filePath: string, serviceName: string, stageName: string, token?: string, workspaceSlug?: string): Promise<void>;
    reset(serviceName: any, stageName: any): Promise<void>;
    private run;
    private import;
}
