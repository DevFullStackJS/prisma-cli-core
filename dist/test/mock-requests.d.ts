export declare const projects: {
    request: {
        query: string;
    };
    response: {
        viewer: {
            user: {
                projects: {
                    edges: {
                        node: {
                            name: string;
                            alias: null;
                            version: number;
                            id: string;
                            region: string;
                        };
                    }[];
                };
            };
        };
    };
};
export declare const project: {
    request: {
        query: string;
        variables: {
            projectId: string;
        };
    };
    response: {
        viewer: {
            project: {
                name: string;
                projectDefinitionWithFileContent: string;
                alias: null;
                version: number;
                id: string;
                schema: string;
                region: string;
            };
        };
    };
};
export declare const init: {
    push: {
        request: string;
        response: {
            push: {
                migrationMessages: never[];
                errors: never[];
                project: {
                    id: string;
                    name: string;
                    alias: null;
                    projectDefinitionWithFileContent: string;
                };
            };
        };
    };
    addProject: {
        request: string;
        response: {
            addProject: {
                project: {
                    name: string;
                    projectDefinitionWithFileContent: string;
                    alias: null;
                    id: string;
                    schema: string;
                    region: string;
                };
            };
        };
    };
};
