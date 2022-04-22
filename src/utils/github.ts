import axios from 'axios';
import cheerio from 'cheerio';

/* eslint-disable */

export const fetchContributionCalendar = async (githubId: string) => {
  const res = await axios.get(
    `/api/proxy/github/users/${githubId}/contributions`,
  );

  if (res.status === 404) {
    throw new Error(
      `User Not Found: ${githubId} というユーザーは存在しません。`,
    );
  }

  const cheerioRoot = cheerio.load(res.data);

  const contributionCalendarDays = cheerioRoot(
    'svg.js-calendar-graph-svg rect.ContributionCalendar-day',
  );

  const calender: { [day: string]: number } = {};

  contributionCalendarDays.each((_, day) => {
    calender[day.attribs['data-date']] = Number(day.attribs['data-count']) || 0;
  });

  return calender;
};

/* eslint-enable */
