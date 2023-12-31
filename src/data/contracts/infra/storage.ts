export interface GetAsyncStorage {
  get: <T = any>(key: string) => Promise<T | undefined>;
}

export interface SetAsyncStorage {
  set: <T = string>(key: string, value: T) => Promise<void>;
}

export interface RemoveAsyncStorage {
  remove: (key: string) => Promise<void>;
}

export type AsyncStorageClient = GetAsyncStorage &
  SetAsyncStorage &
  RemoveAsyncStorage;
