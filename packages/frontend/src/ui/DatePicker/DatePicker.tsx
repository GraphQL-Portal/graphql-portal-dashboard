import {
  DatePicker as MaterialDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';

export const DatePicker: React.FC<DatePickerProps> = (props) => (
  <MaterialDatePicker {...props} />
);
