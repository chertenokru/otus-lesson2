import type {Rating} from "@/model/Rating.ts";

export type Product = {
  "id": number,
  "title": string
  "price": number
  "description": string
  "category": string
  "image": string
  "rating": Rating
}
