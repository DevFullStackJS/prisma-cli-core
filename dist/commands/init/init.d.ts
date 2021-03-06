import { Command, Flags } from 'prisma-cli-engine';
export default class Init extends Command {
    static topic: string;
    static description: string;
    static printVersionSyncWarning: boolean;
    static args: {
        name: string;
        description: string;
    }[];
    static flags: Flags;
    run(): Promise<void>;
    runInit({ endpoint }: {
        endpoint: any;
    }): Promise<void>;
    getGeneratorConfig(generator: string): string;
}
