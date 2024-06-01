import {
  ArgumentsHost,
  Catch,
  NotFoundException
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { EntityNotFoundError } from "typeorm";

@Catch(EntityNotFoundError)
export class TypeOrmNotFoundFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    super.catch(new NotFoundException(), host);
  }
}
