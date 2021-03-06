import { Command, Flags } from 'prisma-cli-engine';
export default class Delete extends Command {
    static topic: string;
    static description: string;
    static group: string;
    static printVersionSyncWarning: boolean;
    static flags: Flags;
    run(): Promise<void>;
    private askForConfirmation;
}
