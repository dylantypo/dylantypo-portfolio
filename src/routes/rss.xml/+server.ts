import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

type RSSItem = {
	title: string;
	link: string;
	description: string;
	pubDate: string;
	guid: string;
	content?: string;
};

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function formatRSSDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toUTCString();
}

export async function GET() {
	try {
		const baseUrl = 'https://www.dylanposner.com';
		const buildDate = new Date().toUTCString();

		// RSS Feed metadata
		const feedTitle = 'Dylan Posner - Blog';
		const feedDescription =
			'Latest thoughts and updates from Dylan Posner, covering technology, web development, and data science.';
		// Feed link
		const feedLink = `${baseUrl}/blog`;

		// Load blog posts
		const rssItems: RSSItem[] = [];

		try {
			const postsDir = join(process.cwd(), 'src/posts');
			const files = await readdir(postsDir);

			for (const file of files) {
				if (file.endsWith('.md')) {
					try {
						const filePath = join(postsDir, file);
						const content = await readFile(filePath, 'utf-8');

						// Parse frontmatter
						const lines = content.split('\n');
						let meta: Record<string, string> = {};
						let frontmatterEnd = 0;

						if (lines[0] === '---') {
							for (let i = 1; i < lines.length; i++) {
								if (lines[i] === '---') {
									frontmatterEnd = i + 1;
									break;
								}
								const [key, ...value] = lines[i].split(':');
								if (key && value.length) {
									meta[key.trim()] = value.join(':').trim();
								}
							}
						}

						// Get post content (without frontmatter)
						const postContent = lines.slice(frontmatterEnd).join('\n').trim();

						// Create excerpt (first 200 characters)
						const excerpt =
							postContent.length > 200 ? postContent.substring(0, 200) + '...' : postContent;

						const slug = file.replace('.md', '');
						const postDate = meta['date'] || new Date().toISOString().split('T')[0];

						rssItems.push({
							title: meta['title'] || 'Untitled Post',
							link: `${baseUrl}/posts/${slug}`,
							description: meta['excerpt'] || excerpt,
							pubDate: formatRSSDate(postDate),
							guid: `${baseUrl}/posts/${slug}`,
							content: escapeXml(postContent)
						});
					} catch (err) {
						console.warn(`Failed to process ${file}:`, err);
					}
				}
			}
		} catch (err) {
			console.warn('Failed to read blog posts:', err);
		}

		// Sort by date (newest first)
		rssItems.sort((a, b) => {
			const dateA = new Date(a.pubDate);
			const dateB = new Date(b.pubDate);
			return dateB.getTime() - dateA.getTime();
		});

		// Generate RSS XML
		const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(feedTitle)}</title>
		<link>${feedLink}</link>
		<description>${escapeXml(feedDescription)}</description>
		<language>en-us</language>
		<lastBuildDate>${buildDate}</lastBuildDate>
		<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
		<generator>SvelteKit</generator>
		<webMaster>dylantylerposner@gmail.com (Dylan Posner)</webMaster>
		<managingEditor>dylantylerposner@gmail.com (Dylan Posner)</managingEditor>
		<copyright>© ${new Date().getFullYear()} Dylan Posner</copyright>
		<category>Technology</category>
		<category>Web Development</category>
		<category>Data Science</category>
		<ttl>60</ttl>
		
${rssItems
	.map(
		(item) => `		<item>
			<title>${escapeXml(item.title)}</title>
			<link>${item.link}</link>
			<description>${escapeXml(item.description)}</description>
			<pubDate>${item.pubDate}</pubDate>
			<guid isPermaLink="true">${item.guid}</guid>
			<content:encoded><![CDATA[${item.content}]]></content:encoded>
		</item>`
	)
	.join('\n')}
	</channel>
</rss>`;

		return new Response(rssXml, {
			headers: {
				'Content-Type': 'application/rss+xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating RSS feed:', error);

		// Fallback RSS feed
		const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Dylan Posner - Blog</title>
		<link>https://www.dylanposner.com/blog</link>
		<description>Latest updates from Dylan Posner</description>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
	</channel>
</rss>`;

		return new Response(fallbackRss, {
			headers: {
				'Content-Type': 'application/rss+xml'
			}
		});
	}
}
