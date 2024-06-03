import { ConflictException, HttpException, Type } from "@nestjs/common";
import { PostgresError } from "pg-error-enum";
import { QueryFailedError } from "typeorm";

export function onTypeOrmPostgresError(
  codes: PostgresError[],
  exceptionClass: Type<HttpException>
) {
  return async <T>(
    apiError: string,
    callback: () => T | Promise<T>
  ): Promise<T> => {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (codes.includes((<any>error).code))
          throw new exceptionClass(apiError);
      }

      throw error;
    }
  };
}

export const maybeConflicts = onTypeOrmPostgresError(
  [PostgresError.UNIQUE_VIOLATION],
  ConflictException
);
