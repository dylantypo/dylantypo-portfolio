import { getAllPosts } from '$lib/post-handlers';
import { create } from 'xmlbuilder2';

export const prerender = true;

const BLOG_METADATA = {
	title: 'Dylan Posner - Blog',
	description:
		'Latest thoughts and updates from Dylan Posner, covering technology, web development, and data science.',
	url: 'https://www.dylanposner.com',
	author: 'Dylan Posner',
	email: 'dylantylerposner[at]gmail[dot]com'
};

export async function GET() {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600', // 🚀 CDN cache
		'Content-Type': 'application/xml'
	};

	try {
		const xml = await getRssXml();
		return new Response(xml, { headers });
	} catch (error) {
		console.error('❌ RSS generation failed:', error);
		return new Response(getFallbackRss(), {
			headers: { 'Content-Type': 'application/xml' },
			status: 500
		});
	}
}

async function getRssXml(): Promise<string> {
	const buildDate = new Date().toISOString();
	const rssUrl = `${BLOG_METADATA.url}/rss.xml`;

	// 🚀 Structured RSS with Atom format
	const root = create({ version: '1.0', encoding: 'utf-8' })
		.ele('feed', {
			xmlns: 'http://www.w3.org/2005/Atom'
		})
		.ele('title')
		.txt(BLOG_METADATA.title)
		.up()
		.ele('link', { href: BLOG_METADATA.url })
		.up()
		.ele('link', { rel: 'self', href: rssUrl })
		.up()
		.ele('updated')
		.txt(buildDate)
		.up()
		.ele('id')
		.txt(BLOG_METADATA.url)
		.up()
		.ele('author')
		.ele('name')
		.txt(BLOG_METADATA.author)
		.up()
		.ele('email')
		.txt(BLOG_METADATA.email)
		.up()
		.up()
		.ele('subtitle')
		.txt(BLOG_METADATA.description)
		.up();

	try {
		const allPosts = await getAllPosts();
		const recentPosts = allPosts.slice(0, 20); // 🚀 Limit to 20 most recent

		for (const post of recentPosts) {
			const postUrl = `${BLOG_METADATA.url}/blog/posts/${post.postPath}`;
			const postDate = post.metadata.date ? new Date(post.metadata.date).toISOString() : buildDate;

			// 🛡️ Escape HTML content
			const summary = escapeXml(post.metadata.excerpt || 'No excerpt available');
			const title = escapeXml(post.metadata.title || 'Untitled');

			root
				.ele('entry')
				.ele('title')
				.txt(title)
				.up()
				.ele('link', { href: postUrl })
				.up()
				.ele('updated')
				.txt(postDate)
				.up()
				.ele('id')
				.txt(postUrl)
				.up()
				.ele('summary')
				.txt(summary)
				.up()
				.up();
		}
	} catch (error) {
		console.warn('⚠️ Failed to load blog posts for RSS');
	}

	return root.end({ prettyPrint: false }); // 🚀 Compact output
}

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function getFallbackRss(): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${BLOG_METADATA.title}</title>
  <link href="${BLOG_METADATA.url}"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${BLOG_METADATA.url}</id>
  <author>
    <name>${BLOG_METADATA.author}</name>
  </author>
  <subtitle>${BLOG_METADATA.description}</subtitle>
</feed>`;
}
