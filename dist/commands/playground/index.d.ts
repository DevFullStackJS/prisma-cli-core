import { Command, Flags } from 'prisma-cli-engine';
import { GraphQLConfig } from 'graphql-config';
export default class Playground extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static flags: Flags;
    run(): Promise<void>;
    getConfig(): Promise<GraphQLConfig>;
    startServer: ({ config, endpoint, port, }: {
        config: any;
        endpoint: string;
        port: any;
    }) => Promise<string>;
}
