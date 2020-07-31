class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictionary = {
      USD: "$",
      EUR: "€",
    };
    // this.lastSearchCurrency = null;
  }

  get currecyValue() {
    return this.currency.value;
  }

  // getCurrencySymbol() {
  //   return this.dictionary[this.currecyValue];
  // }

  getCurrencySymbol2(key) {
    // console.log(key);
    return this.dictionary[key];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
