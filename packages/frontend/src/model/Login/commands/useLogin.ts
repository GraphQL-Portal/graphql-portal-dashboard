import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../commands';



export const useLogin = (options: any) => {
  const [onLogin] = useMutation(LOGIN, options);

  return { onLogin };
}
