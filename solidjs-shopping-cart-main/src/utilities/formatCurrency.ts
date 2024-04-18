const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export default (value: number) => {
  return CURRENCY_FORMATTER.format(value);
};
