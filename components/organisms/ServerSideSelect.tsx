import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteValue,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, {
  useEffect,
  useState,
  MouseEvent,
  SyntheticEvent,
  useRef,
} from "react";

type ServerSideSelectProps = {
  url: string;
  fullWidth?: boolean;
  label?: string;
  resultDataKey?: string;
  valueSelector: string;
  value?: string;
  labelSelector: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  onBlur?: (event: SyntheticEvent) => void;
  onChange?: (
    event: SyntheticEvent,
    newValue: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
};

const ServerSideSelect = ({
  url,
  resultDataKey,
  valueSelector,
  labelSelector,
  placeholder,
  label,
  fullWidth,
  error,
  onBlur,
  value,
  helperText,
  onChange,
}: ServerSideSelectProps) => {
  const theme = useTheme();
  const [open, setopen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [valueFromFetch, setvalueFromFetch] = useState<any>(undefined);

  // if initial value is not empty
  useEffect(() => {
    if (value) {
      (async () => {
        try {
          const fetching = await axios
            .get(url)
            .then((response) => response.data);
          const findDataByInitialValue = fetching.find(
            (item: any) => item[valueSelector] === value
          );
          if (findDataByInitialValue) {
            setvalueFromFetch(findDataByInitialValue);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const fetchingData = async (active: boolean) => {
    try {
      const fetching = await axios.get(url);
      if (resultDataKey) {
        setData(fetching.data[resultDataKey]);
      } else {
        setData(fetching.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isLoading = open && data.length === 0;

  const handleEvent: ServerSideSelectProps["onChange"] = (
    event,
    newValue,
    reason,
    details
  ) => {
    if (onChange && newValue) {
      onChange(event, newValue[valueSelector], reason, details);
      if (value) {
        setvalueFromFetch(newValue);
      }
    }
  };

  const RenderInput = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label={label ?? "No label"}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    );
  };

  useEffect(() => {
    let active = true;

    if (!isLoading) {
      return undefined;
    }

    fetchingData(active);

    return () => {
      active = false;
    };
  }, [isLoading]);

  //   TODO: harusnya tetep pake isOptionEqualValue,

  if (!valueFromFetch && value)
    return (
      <TextField label={label} value="Memuat" disabled fullWidth={fullWidth} />
    );

  return (
    <Autocomplete
      fullWidth={fullWidth}
      onBlur={onBlur}
      open={open}
      disableClearable
      value={valueFromFetch}
      noOptionsText="Tidak ada opsi"
      onOpen={() => setopen(true)}
      onClose={() => setopen(false)}
      renderInput={RenderInput}
      options={data}
      isOptionEqualToValue={(option, value) =>
        option[valueSelector] == value[valueSelector]
      }
      getOptionLabel={(options) => options[labelSelector]}
      onChange={handleEvent}
    />
  );
};

export default ServerSideSelect;
