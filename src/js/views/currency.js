class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictionary = {
      USD: "$",
      EUR: "€",
    };
    this.lastSearchCurrency = null;
  }

  get currecyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictionary[this.currecyValue];
  }

  get currencySymbol() {
    return this.dictionary[this.lastSearchCurrency];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
