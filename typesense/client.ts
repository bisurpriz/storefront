import { Client, SearchClient } from "typesense";

const searchClient = new SearchClient({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
});

export const typesenseClient = new Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
});

export default searchClient;
