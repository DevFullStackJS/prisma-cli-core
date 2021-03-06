import { Command, Flags } from 'prisma-cli-engine';
import { Cluster } from 'prisma-yml';
export interface Service {
    project: {
        name: string;
        stage: string;
    };
    cluster: Cluster;
}
export default class InfoCommand extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static printVersionSyncWarning: boolean;
    static flags: Flags;
    run(): Promise<void>;
    printStage(name: string, stage: string, cluster: Cluster, secrets: string[] | null, workspace?: string, printJson?: boolean): Promise<string>;
}
