import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: any): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product;

    return Promise.resolve(mockProduct);
  }
  update(data: any): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }
  delete(id: any) {
    return Promise.resolve(id);
  }
  find(limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([]);
  }
  findOne(id: number): Promise<Product> {
    return Promise.resolve({ id } as unknown as Product);
  }
}
