const runDevOnly = (callback: Function) => {
  if (process.env.NODE_ENV == "development") {
    callback();
  }
};

export { runDevOnly };
