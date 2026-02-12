import { get, set, del } from "idb-keyval";

export const getToken = async (key: string): Promise<string | null> => {
  return (await get(key)) ?? null;
};

export const saveToken = async (key: string, value: string): Promise<void> => {
  await set(key, value);
};

export const deleteToken = async (key: string) => {
  await del(key);
};
