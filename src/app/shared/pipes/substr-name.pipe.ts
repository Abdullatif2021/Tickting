import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substrname'
})

export class SubstrNamePipe implements PipeTransform {

  transform(text: string): String {
    text = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    return text.match(/\b(\w)/g).join('');
  }

}
