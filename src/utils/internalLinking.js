import { getArticleBySlug, getAllArticles } from '../data/articles';

// Keywords and their corresponding article slugs
const KEYWORD_MAPPINGS = {
  'australia post tracking': 'what-time-does-the-mail-run',
  'auspost tracking': 'what-time-does-the-mail-run-today',
  'tracking number': 'what-time-does-the-mailman-come',
  'parcel delivery': 'does-mail-run-today',
  'post office hours': 'when-does-the-post-office-open',
  'mail delivery': 'what-time-does-the-mail-run-2',
  'express post': 'does-mail-run-on-saturday',
  'po box': 'how-much-does-a-post-office-box-cost',
  'postage cost': 'how-much-does-a-postage-stamp-cost',
  'international shipping': 'how-much-does-it-cost-to-ship-to-australia',
  'package tracking': 'does-mail-run-on-saturday',
  'delivery status': 'what-time-does-the-mailman-come-today',
  'shipping time': 'what-time-does-the-mailman-come-on-saturday',
  'mail forwarding': 'what-time-does-the-mail-run-today-2',
  'registered post': 'how-much-does-it-cost-to-mail-a-letter',
  'parcel collection': 'how-much-does-it-cost-to-mail-a-package',
  'po box access': 'how-much-does-a-post-office-box-cost',
  'parcel lodgement': 'does-mail-run-today'
};

// Extract keywords from text and find matching articles
export function findInternalLinks(content, currentArticleSlug) {
  const links = [];
  const allArticles = getAllArticles();
  
  // Convert content to lowercase for matching
  const lowerContent = content.toLowerCase();
  
  Object.entries(KEYWORD_MAPPINGS).forEach(([keyword, targetSlug]) => {
    // Skip if linking to current article
    if (targetSlug === currentArticleSlug) return;
    
    // Find keyword occurrences
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = lowerContent.match(regex);
    
    if (matches && matches.length > 0) {
      const targetArticle = allArticles.find(article => article.slug === targetSlug);
      if (targetArticle) {
        links.push({
          keyword,
          targetArticle,
          count: matches.length,
          slug: targetSlug
        });
      }
    }
  });
  
  // Sort by relevance (number of occurrences) and limit to top 3
  return links.sort((a, b) => b.count - a.count).slice(0, 3);
}

// Add internal links to content
export function addInternalLinks(content, currentArticleSlug) {
  const links = findInternalLinks(content, currentArticleSlug);
  let processedContent = content;
  
  console.log('Found internal links:', links); // Debug log
  
  links.forEach(({ keyword, targetArticle }) => {
    // Create a case-insensitive regex that preserves original case
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    
    // Replace first occurrence with a link
    processedContent = processedContent.replace(regex, (match) => {
      return `<a href="/blog/${targetArticle.slug}" class="internal-link" title="Read more about ${targetArticle.title}">${match}</a>`;
    });
  });
  
  return processedContent;
}

// Get related articles based on content similarity
export function getSmartRelatedArticles(currentArticle, allArticles, limit = 3) {
  const currentKeywords = extractKeywords(currentArticle.title + ' ' + currentArticle.excerpt);
  
  const scored = allArticles
    .filter(article => article.id !== currentArticle.id)
    .map(article => {
      const articleKeywords = extractKeywords(article.title + ' ' + article.excerpt);
      const score = calculateSimilarity(currentKeywords, articleKeywords);
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  return scored.map(item => item.article);
}

// Extract keywords from text
function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !isStopWord(word));
  
  return [...new Set(words)];
}

// Common stop words to exclude
function isStopWord(word) {
  const stopWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'under', 'along', 'following', 'behind', 'beyond',
    'plus', 'except', 'but', 'nor', 'yet', 'so', 'since', 'unless', 'until', 'while',
    'where', 'when', 'how', 'what', 'which', 'who', 'whom', 'this', 'that', 'these',
    'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us',
    'them', 'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers',
    'ours', 'theirs', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves',
    'yourselves', 'themselves', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 'would',
    'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'ought', 'a', 'an',
    'time', 'just', 'very', 'really', 'quite', 'rather', 'somewhat', 'somehow', 'way',
    'ways', 'also', 'even', 'still', 'already', 'yet', 'again', 'further', 'then',
    'once', 'here', 'there', 'every', 'each', 'both', 'few', 'more', 'most', 'other',
    'such', 'only', 'own', 'same', 'than', 'too', 'much', 'many', 'well', 'take'
  ]);
  return stopWords.has(word);
}

// Calculate similarity between two keyword sets
function calculateSimilarity(keywords1, keywords2) {
  const set1 = new Set(keywords1);
  const set2 = new Set(keywords2);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size; // Jaccard similarity
}
