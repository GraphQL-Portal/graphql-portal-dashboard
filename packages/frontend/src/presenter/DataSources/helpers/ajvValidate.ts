import Ajv, { ErrorObject } from 'ajv';

const getFirstMessage = (errors: ErrorObject[]) => errors[0].message;

export const validateAjv = (schemaTemplate: any) => (validationObject: any) => (
  data: any
) => {
  const schema = Object.assign({}, schemaTemplate, validationObject);
  const validate = new Ajv().compile(schema);

  if (validate(data)) {
    console.log('DATA', data);
    return { pass: true, message: '' };
  } else {
    console.log('VALIDATE ERRORS: ', validate.errors);
    return {
      pass: false,
      message: () => getFirstMessage(validate.errors!) || '',
    };
  }
};
