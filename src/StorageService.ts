import { Storage } from "@ionic/storage";
import { StorageController } from "mobx-persist-store";

export class StorageService implements StorageController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async init() {
    this.storage = await this.storage.create();
  }

  async getItem<T>(key: string): Promise<T | string | null> {
    try {
      await this.init();
      const item = await this.storage.get(key);
      return item as T | string | null;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.init();
      await this.storage.remove(key);
    } catch (error) {
      console.error("Error removing item from storage", error);
    }
  }

  async setItem(key: string, value: any): Promise<void> {
    try {
      await this.init();
      await this.storage.set(key, value);
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  }
}

export const storageService = new StorageService();
