import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Betafinance",
  description: "Settings Management",
};

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>
    </div>
  );
};

export default Settings;
