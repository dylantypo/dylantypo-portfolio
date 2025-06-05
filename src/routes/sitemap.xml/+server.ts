import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

type SitemapEntry = {
	url: string;
	lastmod: string;
	changefreq: string;
	priority: string;
};

export async function GET() {
	try {
		const baseUrl = 'https://www.dylanposner.com';
		const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

		// Static pages with priorities
		const staticPages: SitemapEntry[] = [
			{
				url: `${baseUrl}/`,
				lastmod: today,
				changefreq: 'monthly',
				priority: '1.0'
			},
			{
				url: `${baseUrl}/resume`,
				lastmod: today,
				changefreq: 'monthly',
				priority: '0.9'
			},
			{
				url: `${baseUrl}/blog`,
				lastmod: today,
				changefreq: 'weekly',
				priority: '0.8'
			}
		];

		// Dynamic blog posts
		const blogPosts: SitemapEntry[] = [];

		try {
			const postsDir = join(process.cwd(), 'src/posts');
			const files = await readdir(postsDir);

			for (const file of files) {
				if (file.endsWith('.md')) {
					try {
						const filePath = join(postsDir, file);
						const content = await readFile(filePath, 'utf-8');

						// Parse frontmatter for date
						const lines = content.split('\n');
						let postDate = today; // Default to today

						if (lines[0] === '---') {
							for (let i = 1; i < lines.length; i++) {
								if (lines[i] === '---') break;
								const [key, ...value] = lines[i].split(':');
								if (key && key.trim() === 'date' && value.length) {
									const dateValue = value.join(':').trim();
									// Convert date to YYYY-MM-DD format
									const parsedDate = new Date(dateValue);
									if (!isNaN(parsedDate.getTime())) {
										postDate = parsedDate.toISOString().split('T')[0];
									}
								}
							}
						}

						const slug = file.replace('.md', '');
						blogPosts.push({
							url: `${baseUrl}/posts/${slug}`,
							lastmod: postDate,
							changefreq: 'monthly',
							priority: '0.7'
						});
					} catch (err) {
						console.warn(`Failed to process ${file}:`, err);
					}
				}
			}
		} catch (err) {
			console.warn('Failed to read blog posts:', err);
		}

		// Combine all pages
		const allPages = [...staticPages, ...blogPosts];

		// Generate XML
		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `    <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
	)
	.join('\n')}
</urlset>`;

		return new Response(xml, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);

		// Fallback to basic sitemap
		const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.dylanposner.com/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

		return new Response(fallbackXml, {
			headers: {
				'Content-Type': 'application/xml'
			}
		});
	}
}
