import { Product } from "@/graphql/generated-types";

export interface TypesenseSearchResponse {
  hits?: Array<{
    document: Product;
  }>;
}
