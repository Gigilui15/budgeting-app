import { v7 as uuidv7 } from "uuid";
import {
  ProfileTier,
  type Account,
  type CurrencyCode,
  type Profile,
} from "./profileTypes";

export function createProfile(
  name: string,
  email: string,
  password: string,
  tier: ProfileTier,
): Profile {
  return {
    id: uuidv7(),
    name,
    email,
    password,
    tier,
  };
}

export function createAccount(
  profileId: string,
  name = "Savings",
  currency: CurrencyCode = "EUR",
): Account {
  return {
    id: uuidv7(),
    profileId,
    name,
    currency,
    balance: 0,
  };
}