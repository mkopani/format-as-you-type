const setDefaultOption = (options, key, defaultValue) => {
  if (options?.[key] !== undefined) return;

  options[key] = defaultValue;
};

export default setDefaultOption;
