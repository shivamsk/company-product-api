export function getValueByPath(obj, path) {
  return path.split('.')
    .reduce((previousValue, currentValue) => (previousValue ?
     previousValue[currentValue] : undefined), obj);
}
