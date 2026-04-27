import type { ApiCategory, ApiEndpoint, ApiProduct, CategoryMeta } from '@/types/api';

import { categories } from './categories';
import { ecs } from './products/ecs';
import { aec2 } from './products/aec2';
import { bms } from './products/bms';
import { acp } from './products/acp';
import { cci } from './products/cci';
import { ccr } from './products/ccr';
import { cms } from './products/cms';
import { abs } from './products/abs';
import { aoss } from './products/aoss';
import { afs } from './products/afs';
import { ads } from './products/ads';
import { vpc } from './products/vpc';
import { eip } from './products/eip';
import { aidmp } from './products/aidmp';
import { modelstudioDev } from './products/modelstudio-dev';
import { modelstudioInference } from './products/modelstudio-inference';
import { modelstudioKnowledge } from './products/modelstudio-knowledge';
import { boss } from './products/boss';
import { iam } from './products/iam';
import { rm } from './products/rm';

export { categories };

const allProducts: ApiProduct[] = [
  ecs,
  aec2,
  bms,
  acp,
  cci,
  ccr,
  cms,
  abs,
  aoss,
  afs,
  ads,
  vpc,
  eip,
  aidmp,
  modelstudioDev,
  modelstudioInference,
  modelstudioKnowledge,
  boss,
  iam,
  rm,
];

export function getAllProducts(): ApiProduct[] {
  return allProducts;
}

export function getProductById(id: string): ApiProduct | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByCategory(catId: ApiCategory): ApiProduct[] {
  return allProducts.filter((p) => p.category === catId);
}

export function getCategoryByProductId(productId: string): CategoryMeta | undefined {
  return categories.find((c) => c.products.includes(productId));
}

export function getAllEndpoints(): Array<ApiEndpoint & { productId: string; productName: string }> {
  const result: Array<ApiEndpoint & { productId: string; productName: string }> = [];
  for (const product of allProducts) {
    for (const group of product.groups) {
      for (const endpoint of group.endpoints) {
        result.push({
          ...endpoint,
          productId: product.id,
          productName: product.name,
        });
      }
    }
  }
  return result;
}

export function getTotalEndpointCount(): number {
  let count = 0;
  for (const product of allProducts) {
    for (const group of product.groups) {
      count += group.endpoints.length;
    }
  }
  return count;
}

// Search function for Command+K
export interface SearchResults {
  products: ApiProduct[];
  endpoints: Array<ApiEndpoint & { productId: string; productName: string }>;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Direct substring match
  if (lowerText.includes(lowerQuery)) {
    return true;
  }

  // Character-by-character fuzzy match
  let qi = 0;
  for (let ti = 0; ti < lowerText.length && qi < lowerQuery.length; ti++) {
    if (lowerText[ti] === lowerQuery[qi]) {
      qi++;
    }
  }
  return qi === lowerQuery.length;
}

export function searchAll(query: string): SearchResults {
  if (!query.trim()) {
    return { products: [], endpoints: [] };
  }

  const matchedProducts: ApiProduct[] = [];
  const matchedEndpoints: Array<ApiEndpoint & { productId: string; productName: string }> = [];

  for (const product of allProducts) {
    const productMatches =
      fuzzyMatch(product.name, query) ||
      fuzzyMatch(product.abbreviation, query) ||
      fuzzyMatch(product.description, query);

    if (productMatches && matchedProducts.length < 3) {
      matchedProducts.push(product);
    }

    for (const group of product.groups) {
      for (const endpoint of group.endpoints) {
        if (matchedEndpoints.length >= 8) break;

        const endpointMatches =
          fuzzyMatch(endpoint.displayName, query) ||
          fuzzyMatch(endpoint.description, query) ||
          fuzzyMatch(endpoint.path, query);

        if (endpointMatches) {
          matchedEndpoints.push({
            ...endpoint,
            productId: product.id,
            productName: product.name,
          });
        }
      }
    }
  }

  return {
    products: matchedProducts,
    endpoints: matchedEndpoints,
  };
}
