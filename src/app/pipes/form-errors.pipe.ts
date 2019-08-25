import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formErrors'
})
export class FormErrorsPipe implements PipeTransform {

  transform(value: FormControl): string[] {
    const errors = [];

    Object.keys(value.errors).forEach(key => {
      let message: string;
      const error = (value.errors[key]);

      switch (key) {
        case 'required':
          message = `This field is ${key}.`;
          break;
        case 'min':
          message = `No smaller than ${error.min}.`;
          break;
        case 'minlength':
          message = `No shorter than ${error.requiredLength}.`;
          break;
        case 'maxlength':
          message = `No longer than ${error.requiredLength}.`;
          break;
        default:
          message = `This field error by '${key}'.`;
          break;
      }

      errors.push(message);
    });

    return errors;
  }

}
