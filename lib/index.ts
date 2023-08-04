const divider = "============================";

const runDevOnly = (callback: () => void, label?: string) => {
  if (process.env.NODE_ENV == "development") {
    console.log(divider);
    if (label) {
      console.log(label);
      console.log(divider);
    }
    if (typeof callback === "function") {
      callback();
    }
    console.log(divider);
  }
};

export { runDevOnly };
