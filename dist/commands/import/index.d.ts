import { Command, Flags } from 'prisma-cli-engine';
export default class Import extends Command {
    static topic: string;
    static description: string;
    static printVersionSyncWarning: boolean;
    static flags: Flags;
    run(): Promise<void>;
    import(source: string, serviceName: string, stage: string, token?: string, workspaceSlug?: string): Promise<void>;
}
