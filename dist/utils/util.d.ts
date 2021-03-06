import { Cluster } from 'prisma-yml';
export declare const consoleURL: (token: string, projectName?: string | undefined) => string;
export declare function sortByTimestamp(a: any, b: any): 1 | -1;
/**
 * Print a list of [['key', 'value'],...] pairs properly padded
 * @param {string[][]} arr1
 * @param {number} spaceLeft
 * @param {number} spaceBetween
 */
export declare const prettyProject: (p: any) => string;
export declare function prettyTime(time: number): string;
export declare function concatName(cluster: Cluster, name: string, workspace: string | null): string;
export declare const defaultDataModel = "type User {\n  id: ID! @id\n  name: String!\n}\n";
export declare const defaultMongoDataModel = "type User {\n  id: ID! @id\n  name: String!\n}\n";
export declare const defaultDockerCompose = "version: '3'\nservices:\n  prisma:\n    image: prismagraphql/prisma:1.34\n    restart: always\n    ports:\n    - \"4466:4466\"\n    environment:\n      PRISMA_CONFIG: |\n        port: 4466\n        # uncomment the next line and provide the env var PRISMA_MANAGEMENT_API_SECRET=my-secret to activate cluster security\n        # managementApiSecret: my-secret\n";
export declare const printAdminLink: (link: any) => string;
