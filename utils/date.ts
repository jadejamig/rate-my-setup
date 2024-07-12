import { Timestamp } from "firebase/firestore";

export function getFirebaseDate(date: Date | Timestamp): string {
  if (date instanceof Timestamp) {
      return date.toDate().toDateString();
  } else {
      return date.toDateString();
  }
}