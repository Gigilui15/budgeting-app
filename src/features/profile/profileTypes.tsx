export enum ProfileTier {
  Basic = "basic",
  Pro = "pro",
  Admin = "admin",
}

export type CurrencyCode = "EUR" | "USD" | "GBP";

export type Account = {
  id: string;
  profileId: string;
  name: string;
  currency: CurrencyCode;
  balance: number;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  password: string;
  tier: ProfileTier;
};

// The vision
// A Profile can have multiple accounts, like savings, current, and investments.
// Each account will have its own transactions bound to it.
// A profile can view transactions and balances per-account, or global totals (i.e. showing net worth and other stats)
