import { Output, Client, Config } from 'prisma-cli-engine';
import { Cluster, Environment, PrismaDefinitionClass } from 'prisma-yml';
import { MongoClient } from 'mongodb';
import { DatabaseType } from 'prisma-datamodel';
export interface GetEndpointParams {
    folderName: string;
}
export interface DatabaseCredentials {
    type: DatabaseType;
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    alreadyData?: boolean;
    schema?: string;
    ssl?: boolean;
    uri?: string;
    executeRaw?: boolean;
}
export interface GetEndpointResult {
    endpoint: string;
    cluster: Cluster | undefined;
    workspace: string | undefined;
    service: string;
    stage: string;
    localClusterRunning: boolean;
    database?: DatabaseCredentials;
    dockerComposeYml: string;
    datamodel: string;
    newDatabase: boolean;
    managementSecret?: string;
    writeDockerComposeYml: boolean;
    generator?: string;
}
export interface HandleChoiceInput {
    choice: string;
    loggedIn: boolean;
    folderName: string;
    localClusterRunning: boolean;
    clusters?: Cluster[];
}
export interface ConstructorArgs {
    out: Output;
    client: Client;
    env: Environment;
    config: Config;
    definition: PrismaDefinitionClass;
    shouldAskForGenerator: boolean;
}
export declare class EndpointDialog {
    out: Output;
    client: Client;
    env: Environment;
    config: Config;
    definition: PrismaDefinitionClass;
    shouldAskForGenerator: boolean;
    constructor({ out, client, env, config, definition, shouldAskForGenerator, }: ConstructorArgs);
    getEndpoint(): Promise<GetEndpointResult>;
    encodeName(name: any): any;
    decodeName(name: any): any;
    printDatabaseConfig(credentials: DatabaseCredentials): any;
    printDatabaseService(type: DatabaseType): any;
    handleChoice({ choice, loggedIn, folderName, localClusterRunning, clusters, }: HandleChoiceInput): Promise<GetEndpointResult>;
    connectToMongo(credentials: DatabaseCredentials): Promise<MongoClient>;
    replaceLocalhost(host: string): string;
    getDatabase(introspection?: boolean): Promise<DatabaseCredentials>;
    selectSchema(schemas: string[]): Promise<string>;
    private getClusterAndWorkspaceFromChoice;
    private getCloudClusters;
    private projectExists;
    private listFiles;
    private isClusterOnline;
    private getClusterQuestion;
    private getClusterName;
    private getClusterChoice;
    private getDemoCluster;
    private askForDemoCluster;
    private getClusterDescription;
    private askForDatabaseType;
    private convertChoices;
    private askForStage;
    private askForGenerator;
    private askForService;
    private customEndpointSelector;
    private askForExistingDataMongo;
    private askForExistingData;
    private ask;
    private getSillyName;
    private getPublicName;
}
