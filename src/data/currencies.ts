export type CurrencyCode = 'RWF' | 'CDF' | 'XOF' | 'XAF' | 'USD' | 'EUR'

export interface CurrencyOption {
  code: CurrencyCode
  symbol: string
  labelEn: string
  labelFr: string
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'RWF', symbol: 'FRw', labelEn: 'Rwandan Franc (RWF)', labelFr: 'Franc rwandais (RWF)' },
  { code: 'CDF', symbol: 'FC', labelEn: 'Congolese Franc (CDF)', labelFr: 'Franc congolais (FC)' },
  { code: 'XOF', symbol: 'FCFA', labelEn: 'West African CFA (XOF)', labelFr: 'Franc CFA UEMOA (XOF)' },
  { code: 'XAF', symbol: 'FCFA', labelEn: 'Central African CFA (XAF)', labelFr: 'Franc CFA CEMAC (XAF)' },
  { code: 'USD', symbol: '$', labelEn: 'US Dollar (USD)', labelFr: 'Dollar américain (USD)' },
  { code: 'EUR', symbol: '€', labelEn: 'Euro (EUR)', labelFr: 'Euro (EUR)' },
]

export function symbolForCode(code: CurrencyCode): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code
}
