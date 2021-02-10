import { useEffect } from 'react';
import { isPOJO } from '../../utils';
import { DeepObject } from '../../types';
import { useToast } from '../providers';

const getMessagesFromObject = (object: DeepObject): string[] =>
  Object.keys(object).reduce((acc: string[], key: string) => {
    if (isPOJO(object[key]))
      acc.push(...getMessagesFromObject(object[key] as DeepObject));
    if (key === 'message') acc.push(object[key] as string);
    return acc;
  }, []);

export const useFormErrors = (errors: any) => {
  const { showErrorToast } = useToast();
  useEffect(() => {
    const messages = getMessagesFromObject(errors);
    if (messages.length) {
      showErrorToast(messages);
    }
  }, [errors, showErrorToast]);
};
