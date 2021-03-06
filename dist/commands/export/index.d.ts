import { Command, Flags } from 'prisma-cli-engine';
export default class Export extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static printVersionSyncWarning: boolean;
    static flags: Flags;
    run(): Promise<void>;
    export(serviceName: string, stage: string, exportPath: string, token?: string, workspaceSlug?: string): Promise<void>;
}
