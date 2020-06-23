import { Injectable, NestInterceptor, CallHandler, ExecutionContext, HttpStatus } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept( context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          meta: {
            msg: '请求成功',
            status: 0
          }
        };
      }),
    );
  }
}