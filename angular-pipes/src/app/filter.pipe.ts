import {Pipe, PipeTransform} from '@angular/core';


/*
 While filtering, updating Arrays or Objects won't trigger the filter again. If they were, Angular would restart the pipe each time
 something changes on the page, costing a lot of performance. Changing the pipe input will triggers the pipe.
*/
@Pipe({
  name: 'filter',
  // Setting 'pure' to true makes the pipe restart whenever anything changes on the page. Default is true.
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const resultArray = [];

    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
