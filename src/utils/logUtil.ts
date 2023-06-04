export const logConsole = (...params: Array<string>) => {
  const paramsString = params.join(',');
  console.log(paramsString);
};
