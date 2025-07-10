import { getProductsById } from '@/utils/serverUtils';

export async function getProductsByIdAction(products: string[]) {
    return await getProductsById(products)
  }
  