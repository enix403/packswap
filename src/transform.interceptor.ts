import { Injectable } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from "@nestjs/common";
import { map, type Observable } from "rxjs";

@Injectable()
export class TransformToPlainInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<any> {
    return next.handle().pipe(map(result => instanceToPlain(result)));
  }
}
