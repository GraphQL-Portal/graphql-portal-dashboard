import Ajv, { ErrorObject } from 'ajv';

const getFirstMessage = (errors: ErrorObject[]) => errors[0].message;

export const validateAvj = (schemaTemplate: any) => (validationObject: any) => (data: any) => {
  const schema = Object.assign({}, schemaTemplate, validationObject);
  const validate = (new Ajv()).compile(schema);

  if (validate(data)) {
    return { pass: true, message: '' };
  } else {
    return {
      pass: false,
      message: () => getFirstMessage(validate.errors!) || ''
    };
  }
}
