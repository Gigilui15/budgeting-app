import { useUserData } from "../../auth/UserDataContext";

const ProfilePage = () => {
  const { profile, accounts, selectedAccount, selectAccount } = useUserData();

  return (
    <section>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
      <p>Plan: {profile.tier}</p>

      <label htmlFor="account">Current account</label>
      <select
        id="account"
        value={selectedAccount.id}
        onChange={(event) => selectAccount(event.target.value)}
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} ({account.currency})
          </option>
        ))}
      </select>
    </section>
  );
};

export default ProfilePage;
