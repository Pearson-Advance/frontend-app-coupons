import { Vendor, Topic } from 'shared/types';

/*
  We use `as const` to make this object immutable and preserve literal types.
  This prevents its properties from being reassigned elsewhere in the codebase
  and ensures TypeScript treats the values as exact string literals
  (e.g., 'topics' instead of string), improving type safety.
*/
export const FILTER_ITEM_TYPES = {
  TOPICS: 'topics',
  VENDORS: 'vendors',
} as const;

export const VENDORS: ReadonlyArray<Vendor> = [
  { id: 'aws', name: 'AWS' },
  { id: 'cisco', name: 'Cisco' },
  { id: 'comptia', name: 'CompTIA' },
  { id: 'ec-council', name: 'EC Council' },
  { id: 'google', name: 'Google' },
  { id: 'isc2', name: 'ISC2' },
  { id: 'it-specialist', name: 'IT Specialist' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'n-a', name: 'N/A' },
  { id: 'pmi', name: 'PMI' },
  { id: 'vmware', name: 'VMware' },
];

export const TOPICS: ReadonlyArray<Topic> = [
  { id: 'ai', name: 'AI' },
  { id: 'career-success', name: 'Career Success' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'data-analytics', name: 'Data / Analytics' },
  { id: 'networking', name: 'Networking' },
  { id: 'operating-systems', name: 'Operating Systems' },
  { id: 'programming-and-coding', name: 'Programming and Coding' },
  { id: 'project-program-management', name: 'Project & Program Management' },
  { id: 'technology-fundamentals', name: 'Technology Fundamentals' },
];
