import { useDataSourceContext } from '../../model/providers';

export const useAddDataSource = () => {
  const { source, clearSource } = useDataSourceContext();


  console.log(source, clearSource);

  return { source };
}
