const setDefaultOption = (
  options: { [key: string]: any },
  key: string,
  defaultValue: any
) => {
  if (options?.[key] !== undefined) return;

  options[key] = defaultValue;
};

export default setDefaultOption;
