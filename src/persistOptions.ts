import { storageService } from "./StorageService";

export const persistOptions = {
  storageOptions: {
    storage: storageService,
    expireIn: 86400000,
    removeOnExpiration: true,
    stringify: false,
    debugMode: true,
  },
  reactOptions: { delay: 200, fireImmediately: false },
};
