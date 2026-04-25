/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO <><> holy guacamole, this file is a mess, needs a refactor
/* eslint-disable @typescript-eslint/no-explicit-any */
const DEFAULT_CURRENCY = "GBP";

export const currency_list_from_db: any = {
  "1": { code: "GBP" },
  "2": { code: "USD" },
  "3": { code: "EUR" },
  "4": { code: "AUD" },
  "5": { code: "NZD" },
  "6": { code: "SGD" },
  "7": { code: "CAD" },
};

export type possible_currency =
  | "AUD"
  | "BGN"
  | "BRL"
  | "CAD"
  | "CHF"
  | "CNY"
  | "CZK"
  | "DKK"
  | "EUR"
  | "GBP"
  | "HKD"
  | "HRK"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "JPY"
  | "KRW"
  | "LTL"
  | "LVL"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "PLN"
  | "RON"
  | "RUB"
  | "SEK"
  | "SGD"
  | "THB"
  | "TRY"
  | "USD"
  | "ZAR";

type currency_settings = {
  from?: possible_currency;
  to?: possible_currency;
  currency?: possible_currency;
  currency_id?: number;
  amount?: number | null;
  precision?: number;
};

const defaults: any = {
  from: "GBP",
  amount: 0,
  precision: 2,
};

const locale: { [key in possible_currency]: string } = {
  AUD: "en-US", // if en-AU, will be displayed as '$' and not 'A$'
  BGN: "en-UK",
  BRL: "en-UK",
  CAD: "en-UK",
  CHF: "en-UK",
  CNY: "en-UK",
  CZK: "en-UK",
  DKK: "en-UK",
  EUR: "en-IE",
  GBP: "en-UK",
  HKD: "en-UK",
  HRK: "en-UK",
  HUF: "en-UK",
  IDR: "en-UK",
  ILS: "en-UK",
  INR: "en-UK",
  JPY: "en-UK",
  KRW: "en-UK",
  LTL: "en-UK",
  LVL: "en-UK",
  MXN: "en-UK",
  MYR: "en-UK",
  NOK: "en-UK",
  NZD: "en-UK",
  PHP: "en-UK",
  PLN: "en-UK",
  RON: "en-UK",
  RUB: "en-UK",
  SEK: "en-UK",
  SGD: "en-UK",
  THB: "en-UK",
  TRY: "en-UK",
  USD: "en-US",
  ZAR: "en-UK",
};

export const currency = {
  get_options: () => {
    const value: any[] = [];
    Object.keys(currency_list_from_db).map((key) => {
      value.push({ value: key, label: currency_list_from_db[key].code });
    });
    return value;
  },

  format: (settings: currency_settings) => {
    settings.from =
      settings.from ||
      (settings.currency_id
        ? currency_list_from_db[settings.currency_id].code
        : defaults.from);
    settings = Object.assign({}, defaults, settings);
    settings.currency = settings.currency || settings.from || DEFAULT_CURRENCY;
    settings.to = settings.to || settings.currency;
    if (settings.currency && settings.to) {
      const formatter = new Intl.NumberFormat(locale[settings.to], {
        style: "currency",
        currencyDisplay: "symbol",
        currency: settings.to,
        minimumFractionDigits: settings.precision,
      });
      // console.log('currency_formatter format()', settings, 'returning', locale[settings.to], formatter, formatter.format(settings.amount));
      if (!settings.amount) return 0;
      return formatter.format(settings.amount / 100);
    }
    return settings.amount;
  },

  convert_and_format: (settings: currency_settings) => {
    return new Promise((resolve) => {
      settings.from =
        settings.from ||
        (settings.currency_id
          ? currency_list_from_db[settings.currency_id].code
          : defaults.from);
      settings = Object.assign({}, defaults, settings);
      settings.currency = settings.currency || settings.from;
      // console.log('currency_formatter', settings);
      settings.to = settings.to || settings.currency;
      if (settings.to && typeof settings.to === "string") {
        // TODO Typescript made me change this, needs testing before use
        void currency.convert(settings).then((amount: any) => {
          // console.log('will now format', amount, { ...settings, amount });
          resolve(currency.format({ ...settings, ...amount }));
        });
      } else if (settings.currency) {
        resolve(currency.format(settings));
      } else {
        resolve(settings.amount);
      }
    });
  },

  convert: (settings: currency_settings) => {
    return new Promise((resolve) => {
      // console.log('converting', settings.amount, settings.from, settings.to);
      settings = Object.assign({}, defaults, settings);
      let amount: number = 0;
      if (settings.amount && typeof settings.amount === "string") {
        amount = parseFloat(settings.amount);
      } else if (settings.amount) {
        amount = settings.amount;
      }
      if (!amount) {
        resolve(0);
      } else {
        if (settings.from !== settings.to) {
          // if (settings.from !== 'EUR') {
          //     const from_currency: any = rates.filter((obj: any) => obj.currency[0] === settings.from).shift()
          //     amount = amount / from_currency.rate[0]
          // }
          // const target_currency: any = rates.filter((obj: any) => obj.currency[0] === settings.to).shift()
          // if (target_currency) {
          //     amount = amount * target_currency.rate[0]
          // }
        }
        resolve(amount.toFixed(settings.precision));
      }
    });
  },
};
