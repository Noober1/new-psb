import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteValue,
  CircularProgress,
  TextField,
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
  labelSelector: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  onBlur?: (event: SyntheticEvent) => void;
  onChange?: (
    event: SyntheticEvent,
    value: any,
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
  helperText,
  onChange,
}: ServerSideSelectProps) => {
  const [open, setopen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [valueFromFetch, setvalueFromFetch] = useState<any>(undefined);

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
    value,
    reason,
    details
  ) => {
    if (onChange && value) {
      onChange(event, value[valueSelector], reason, details);
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

  useEffect(() => {
    if (!open) {
      setData([]);
    }
  }, [open]);

  //   TODO: harusnya tetep pake isOptionEqualValue,

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
