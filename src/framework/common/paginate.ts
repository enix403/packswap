import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export const DEFAULT_LIMIT = 5;

export class PaginationOptions {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  opts?: PaginationOptions
): Promise<Paginated<T>> {
  let page = opts?.page ?? 1;
  let limit = opts?.limit ?? DEFAULT_LIMIT;

  let [items, totalCount] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  let totalPages = Math.ceil(totalCount / limit);

  return {
    items,
    page,
    limit,
    totalCount,
    totalPages
  };
}
