export type AmazonRegion = {
  name: string;
  domain: string;
  live: boolean;
};

export const AMAZON_REGIONS: AmazonRegion[] = [
  { name: "United States", domain: "amazon.com", live: true },
  { name: "United Kingdom", domain: "amazon.co.uk", live: true },
  { name: "Germany", domain: "amazon.de", live: false },
  { name: "France", domain: "amazon.fr", live: false },
  { name: "Japan", domain: "amazon.co.jp", live: false },
  { name: "Canada", domain: "amazon.ca", live: false },
  { name: "Italy", domain: "amazon.it", live: false },
  { name: "Spain", domain: "amazon.es", live: false },
  { name: "India", domain: "amazon.in", live: false },
  { name: "Australia", domain: "amazon.com.au", live: false },
  { name: "Brazil", domain: "amazon.com.br", live: false },
  { name: "Mexico", domain: "amazon.com.mx", live: false },
  { name: "Netherlands", domain: "amazon.nl", live: false },
  { name: "Singapore", domain: "amazon.sg", live: false },
  { name: "Turkey", domain: "amazon.com.tr", live: false },
  { name: "United Arab Emirates", domain: "amazon.ae", live: false },
  { name: "Saudi Arabia", domain: "amazon.sa", live: false },
  { name: "Sweden", domain: "amazon.se", live: false },
  { name: "Poland", domain: "amazon.pl", live: false },
  { name: "Egypt", domain: "amazon.eg", live: false },
  { name: "Belgium", domain: "amazon.com.be", live: false },
];
