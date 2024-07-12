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
  documents: "graphql/queries/**/*.(graphql|gql)",
  generates: {
    "graphql/generated-types.ts": {
      plugins: ["typescript"],
    },
    "graphql/generated-schema.graphql": {
      plugins: ["schema-ast"],
    },
    "graphql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "generated-types.ts",
      },
      plugins: ["typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        urqlImportFrom: "@urql/svelte",
      },
    },
  },
};

export default config;
