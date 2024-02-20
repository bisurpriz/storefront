import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: [
        {
            [process.env.HASURA_URL!]: {
                headers: {
                    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
                },
            },
        },
    ],
    config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
            numeric: "number",
        },
    },
    documents: "graphql/queries/**/*.graphql",
    generates: {
        "graphql/generated.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
            ],
        },
    }
};

export default config;
