import { getAllPosts } from '$lib/utils';
import { create } from 'xmlbuilder2';

export const prerender = true;

export async function GET() {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=86400',
		'Content-Type': 'application/xml'
	};

	try {
		const xml = await getSitemapXml();
		return new Response(xml, { headers });
	} catch (error) {
		console.error('❌ Sitemap generation failed:', error);
		return new Response(getFallbackSitemap(), {
			headers: { 'Content-Type': 'application/xml' },
			status: 500
		});
	}
}

async function getSitemapXml(): Promise<string> {
	const baseUrl = 'https://dylanposner.com';
	const today = new Date().toISOString();

	const root = create({ version: '1.0', encoding: 'utf-8' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
	});

	const staticPages = [
		{ url: '/', priority: '1.0', changefreq: 'monthly' },
		{ url: '/resume', priority: '0.9', changefreq: 'monthly' },
		{ url: '/blog', priority: '0.8', changefreq: 'weekly' },
		{ url: '/contact', priority: '0.8', changefreq: 'monthly' }
	];

	staticPages.forEach((page) => {
		root
			.ele('url')
			.ele('loc')
			.txt(`${baseUrl}${page.url}`)
			.up()
			.ele('lastmod')
			.txt(today)
			.up()
			.ele('changefreq')
			.txt(page.changefreq)
			.up()
			.ele('priority')
			.txt(page.priority)
			.up()
			.up();
	});

	try {
		const allPosts = await getAllPosts();

		for (const post of allPosts) {
			const postUrl = `${baseUrl}/blog/posts/${post.postPath}`;
			const postDate = post.metadata.date ? new Date(post.metadata.date).toISOString() : today;

			root
				.ele('url')
				.ele('loc')
				.txt(postUrl)
				.up()
				.ele('lastmod')
				.txt(postDate)
				.up()
				.ele('changefreq')
				.txt('monthly')
				.up()
				.ele('priority')
				.txt('0.7')
				.up()
				.up();
		}
	} catch (error) {
		console.warn('⚠️ Failed to load blog posts for sitemap');
	}

	return root.end({ prettyPrint: false });
}

function getFallbackSitemap(): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dylanposner.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}
