import fs from "fs";
import path from "path";
import os from "os";

interface TempData {
  bookings: any[];
  contacts: any[];
}

const STORE_PATH = path.join(os.tmpdir(), "wandergo_store_v1.json");

function readStore(): TempData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read temp store:", err);
  }
  return { bookings: [], contacts: [] };
}

function writeStore(data: TempData) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.warn("Could not write temp store:", err);
  }
}

export function getTempBookings(): any[] {
  return readStore().bookings;
}

export function saveTempBooking(booking: any) {
  const store = readStore();
  store.bookings.unshift(booking);
  writeStore(store);
}

export function getTempContacts(): any[] {
  return readStore().contacts;
}

export function saveTempContact(contact: any) {
  const store = readStore();
  store.contacts.unshift(contact);
  writeStore(store);
}
