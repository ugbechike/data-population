export function toMillion(value: string | number) {
  const _value = parseFloat(value?.toString());
  return (_value / 1_000_000).toFixed(2);
}
