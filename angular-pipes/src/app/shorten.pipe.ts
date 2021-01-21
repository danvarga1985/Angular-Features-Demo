import {Pipe, PipeTransform} from '@angular/core';

/*
  Custom-made pipe needs to be
  A. annotated with '@Pipe'
  B. added to the app-module declarations
*/
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  // 'limit' is a custom parameter
  transform(value: any, limit: number): any {
    if (value.length > limit) {
      return value.substr(0, limit) + ' ...';
    }

    return value;
  }

}
