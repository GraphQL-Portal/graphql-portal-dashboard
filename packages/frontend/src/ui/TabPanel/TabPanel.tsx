import { ReactNode } from 'react';

export const TabPanel: React.FC<any> = (props: { index: number, children?: ReactNode, value: number }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}
