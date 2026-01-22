export type Country = {
  code: string;
  name: string;
  emoji?: string | null;
  capital?: string | null;
  currency?: string | null;
  languages?:[ {
    code: string;
    name: string;
  }]
};

export type CountryOptions = {
  emoji: boolean;
  capital: boolean;
  currency: boolean;
  languages: boolean;
}
