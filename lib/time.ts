import type { IPost } from "@/types/blog";
import { format } from "date-fns";
import { SanityDocument } from "next-sanity";

export const orderByDate = (data: (SanityDocument | IPost)[]) => {
  return data.sort((a, b) => {
    let dateA: Date | string = new Date(0);
    let dateB: Date | string = new Date(0);

    if ("publishedAt" in a) {
      dateA = a.publishedAt;
    } else if ("startedAt" in a) {
      dateA = a.startedAt;
    }

    if ("publishedAt" in b) {
      dateB = b.publishedAt;
    } else if ("startedAt" in b) {
      dateB = b.startedAt;
    }

    return dateA > dateB ? -1 : 1;
  });
};

export const parseDate = (date: Date) => {
  const parsedDate = new Date(date);
  const day = ("0" + parsedDate.getDate()).slice(-2);
  const month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
  const year = parsedDate.getFullYear();
  const monthName = format(new Date(date), "MMM");
  const prettifyDate = `${day}/${month}/${year}`;
  return { month, year, monthName, prettifyDate };
};

export const isDateLaterThanNow = (date: Date): boolean => {
  const parsedDate = new Date(date);
  const now = new Date();
  return parsedDate > now;
};
