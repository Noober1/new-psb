import TextField, { TextFieldProps } from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTime from "@mui/lab/MobileDateTimePicker";
import idLocale from "date-fns/locale/id";
import PropTypes from "prop-types";
import { useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { DatePicker, MobileDatePicker } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
} from "@mui/material";
import { Label } from "@mui/icons-material";

export type DateTimePickerProps = {
  value?: any;
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange: (
    date: any | undefined,
    keyboardInputValue: string | undefined
  ) => void;
  required?: boolean;
};

const DateTimePicker = ({
  value,
  onChange,
  label,
  error,
  helperText,
  required,
}: DateTimePickerProps) => {
  // const { languange, default:defaultText } = useLocalization()
  const [dateValue, setDateValue] =
    useState<DateTimePickerProps["value"]>(value);

  return (
    <LocalizationProvider locale={idLocale} dateAdapter={AdapterDateFns} f>
      <FormControl error={error} fullWidth>
        <InputLabel shrink={true} required={required}>
          {label}
        </InputLabel>
        <MobileDatePicker
          InputProps={{
            error: error,
            required,
          }}
          inputFormat="d MMMM y"
          onChange={onChange}
          value={value}
          showDaysOutsideCurrentMonth
          renderInput={({ fullWidth, ...params }) => <TextField {...params} />}
          cancelText="Batalkan"
          okText="Pilih"
          label={label || "Pilih Tanggal"}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
