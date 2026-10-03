import type { LocalPost } from './types';
import { aiForConstructionCompanies } from './ai-for-construction-companies';
import { cantLeaveForAWeekTest } from './cant-leave-for-a-week-test';
import { constructionSoftwareSourceOfTruth } from './construction-software-source-of-truth';
import { clarityDayWalkthrough } from './clarity-day-walkthrough';

export type { LocalPost } from './types';

/**
 * Published local posts, newest first. To publish a draft (see ./drafts),
 * fill its placeholders and add it here.
 */
export const LOCAL_POSTS: LocalPost[] = [
  clarityDayWalkthrough,
  constructionSoftwareSourceOfTruth,
  cantLeaveForAWeekTest,
  aiForConstructionCompanies,
].sort((a, b) => b.published_at.localeCompare(a.published_at));

export const getLocalPost = (slug: string | undefined) => LOCAL_POSTS.find((p) => p.slug === slug);
