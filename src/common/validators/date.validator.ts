import {
  isDateString,
  isEmpty,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function DateValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'dateValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!isEmpty(value)) return isDateString(value, { strict: true });
          return true;
        },
      },
    });
  };
}
