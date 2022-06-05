export const formError = <T>(errors: any, touched: any, initialValue: T) => {
  const isError = (field: keyof typeof initialValue) => {
    if (errors[field] && touched[field]) return true;
    return false;
  };
  const helperText = (field: keyof typeof initialValue) => {
    if (errors[field] && touched[field]) return errors[field];
  };

  return { isError, helperText };
};
