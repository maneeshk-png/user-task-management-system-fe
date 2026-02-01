
import { Injectable } from '@angular/core'; // to make the service injectable

@Injectable({ providedIn: 'root' }) // singleton service available throughout the app
export class StorageService { // service for localStorage operations

  // Set an item in localStorage
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value)); // store as JSON string
  }

  // Get an item from localStorage
  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key); // retrieve JSON string
    return data ? JSON.parse(data) : null; // parse JSON string back to object
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);   // delete item by key
  }

  // Clear all items from localStorage
  clear(): void {
    localStorage.clear(); // remove all items
  }
}
