import { JobPosting } from "./types";
import * as React from 'react';

export const navigationRef = React.useRef<any>(null);

export function dateNowMinusDays(days: number) {
  let d = new Date();
  d.setDate(d.getDate() - days);
  return d.toString();
}

export function daysAgo(date: string) {
  const today = new Date();  // Current date
  const differenceInTime = today.getTime() - new Date(date).getTime();  // Difference in milliseconds
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));  // Convert milliseconds to days
  return differenceInDays;
}

export function sortPseudoMatch(a: JobPosting, b: JobPosting) {
  const keyword = 'plumb'; // The keyword you want to search for in the "title" property
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA.includes(keyword) && !titleB.includes(keyword)) {
    return -1; // "a" should come before "b"
  } else if (!titleA.includes(keyword) && titleB.includes(keyword)) {
    return 1; // "b" should come before "a"
  } else {
    return 0; // Preserve the original order if both contain or don't contain the keyword
  }
}

export function sortByDateDescending(a: JobPosting, b: JobPosting) {
  const dateA = new Date(a.dateCreated).getTime();
  const dateB = new Date(b.dateCreated).getTime();

  return dateB - dateA; // Compare in reverse order
}

export function filterByTitleOrDescription(keyword: string, jobPosting: JobPosting) {
  return jobPosting.title.includes(keyword) || jobPosting.description.includes(keyword)
}

export function formatAMPM() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes as any;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function navigate(name: string, params?: any) {
  if (navigationRef && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function goBack() {
  return navigationRef.current.goBack();
}



