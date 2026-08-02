import { v7 as uuidv7 } from "uuid";
import {
  ProfileTier,
  type Account,
  type Profile,
} from "../features/profile/profileTypes";
import {
  Category,
  TransactionType,
  type Transaction,
} from "../features/transactions/transactionTypes";

export type AppData = {
  profiles: Profile[];
  accounts: Account[];
  transactions: Transaction[];
};

export function createDummyData(): AppData {
  const admin: Profile = {
    id: uuidv7(),
    name: "Luigi Naudi",
    email: "admin@gmail.com",
    password: "admin",
    tier: ProfileTier.Admin,
  };

  const basic: Profile = {
    id: uuidv7(),
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "johndoe123",
    tier: ProfileTier.Basic,
  };

  const pro: Profile = {
    id: uuidv7(),
    name: "Peter Parker",
    email: "peter.parker@gmail.com",
    password: "peterparker123",
    tier: ProfileTier.Pro,
  };

  const adminAccount: Account = {
    id: uuidv7(),
    profileId: admin.id,
    name: "Savings",
    currency: "EUR",
    balance: 0,
  };

  const basicAccount: Account = {
    id: uuidv7(),
    profileId: basic.id,
    name: "Savings",
    currency: "EUR",
    balance: 0,
  };

  const proAccount: Account = {
    id: uuidv7(),
    profileId: pro.id,
    name: "Savings",
    currency: "EUR",
    balance: 0,
  };

  const transactions: Transaction[] = [
    {
      id: uuidv7(),
      accountId: adminAccount.id,
      description: "Initial deposit",
      amount: 1200,
      type: TransactionType.Income,
      category: Category.Investing,
      date: new Date(),
    },
    {
      id: uuidv7(),
      accountId: basicAccount.id,
      description: "Initial deposit",
      amount: 1500,
      type: TransactionType.Income,
      category: Category.Investing,
      date: new Date(),
    },
        {
      id: uuidv7(),
      accountId: proAccount.id,
      description: "Initial deposit",
      amount: 2000,
      type: TransactionType.Income,
      category: Category.Investing,
      date: new Date(),
    },
  ];

  return {
    profiles: [admin, basic, pro],
    accounts: [adminAccount, basicAccount, proAccount],
    transactions,
  };
}
