export interface Trip {
  _id?: string;

  // Original Travlr fields (if they exist)
  code?: string;
  name?: string;
  length?: number;
  start?: string;
  resort?: string;
  perPerson?: number;
  image?: string;

  // Your current API fields
  destination?: string;
  description?: string;
  price?: string;
  duration?: string;
  departureDate?: string;
}
