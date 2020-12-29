import { useEffect } from 'react';
import { useToast } from '../model/providers';

export const useFormErrors = (errors: any) => {
  const { showErrorToast } = useToast();
  useEffect(() => {
    const messages = Object.keys(errors).map((key) => errors[key].message);
    if (messages.length) {
      showErrorToast(messages);
    }
  }, [errors, showErrorToast])
}
