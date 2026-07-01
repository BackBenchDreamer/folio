import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

/**
 * Remark plugin that computes reading time from post content
 * and injects it into frontmatter as `readingTime` (in minutes, rounded up).
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textContent = toString(tree);
    const { minutes } = getReadingTime(textContent);
    data.astro.frontmatter.readingTime = Math.ceil(minutes);
  };
}

export default remarkReadingTime;
