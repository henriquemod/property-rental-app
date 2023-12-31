import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AsyncStorageClient } from "src/data/contracts/infra";

export class ReactNativeAsyncStorage implements AsyncStorageClient {
  public async get<T = any>(key: string): Promise<T | undefined> {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  public async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }

  public async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
