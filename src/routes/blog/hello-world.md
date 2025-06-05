---
title: Hello World - Markdown Demo
date: 2025-06-04
readTime: 3 min read
excerpt: A complete demo of all markdown possibilities for creative blog posts
---

<script>
	// 🔥 You can use Svelte components in markdown!
	let isDyslexiaMode = $state(false);
	
	function toggleDyslexia() {
		isDyslexiaMode = !isDyslexiaMode;
	}
</script>

<svelte:head>
<title>{title} | Dylan Posner</title>
<meta name="description" content={excerpt} />
</svelte:head>

<!-- 🎛️ Interactive dyslexia toggle -->
<div class="post-controls">
	<button onclick={toggleDyslexia} class:active={isDyslexiaMode}>
		{isDyslexiaMode ? '🔤' : '👁️'} Dyslexia Mode
	</button>
</div>

<div class="post-content" class:dyslexia-mode={isDyslexiaMode}>

# {title} 🎨

Welcome! This post shows **everything** you can do with Markdown. Perfect for creative blogging! ✨

## Text Formatting 📝

**Bold text** and _italic text_ and **_both combined_**

~~Strikethrough text~~ for corrections

`inline code` for technical bits

> **Blockquotes** are great for highlighting important thoughts or quotes from others!

## Lists & Organization 📋

**Numbered Lists:**

1. First important thing
2. Second important thing
3. Third important thing

**Bullet Lists:**

- 🚀 Rockets for launches
- 🎯 Targets for goals
- 💡 Lightbulbs for ideas
- 🔥 Fire for excitement

**Task Lists:**

- [x] Set up blog
- [x] Write first post
- [ ] Add RSS feed
- [ ] Share on social media

## Code Blocks 💻

**Inline code:** Use `console.log()` for debugging

**JavaScript Block:**

```javascript
// Interactive website code
function makeItFast() {
	const optimizations = ['lazy loading', 'code splitting', 'image compression'];
	return optimizations.map((opt) => `✅ ${opt}`);
}

console.log('Site performance:', makeItFast());
```

**CSS Block:**

```css
/* Beautiful animations */
.smooth-transition {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	transform: translateY(0);
}

.smooth-transition:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
```

## Links & Media 🔗

**Text Links:** Check out [my portfolio](https://dylanposner.com) for more projects!

**Reference Links:** I love [SvelteKit][svelte] for building fast websites.

[svelte]: https://kit.svelte.dev 'SvelteKit Homepage'

## Tables 📊

| Technology | Speed    | Fun Level  | Difficulty |
| ---------- | -------- | ---------- | ---------- |
| HTML/CSS   | ⚡⚡     | 😊😊       | 🟢 Easy    |
| JavaScript | ⚡⚡⚡   | 😊😊😊     | 🟡 Medium  |
| SvelteKit  | ⚡⚡⚡⚡ | 😊😊😊😊   | 🟡 Medium  |
| Three.js   | ⚡⚡⚡   | 😊😊😊😊😊 | 🔴 Hard    |

## Horizontal Rules

Use three dashes for section breaks:

---

## Emojis & Visual Elements 🎨

**Sections with emojis:**

- 🎯 **Goals:** Build the fastest website possible
- 🛠️ **Tools:** SvelteKit, TypeScript, Three.js
- 📈 **Progress:** 75% complete
- 🚀 **Next:** Add more interactive demos

**Status indicators:**

- ✅ Completed
- 🟡 In Progress
- ❌ Not Started
- 🔄 Under Review

</div>

<style>
	.post-controls {
		position: fixed;
		top: 2rem;
		right: 2rem;
		z-index: 1000;
	}
	
	.post-controls button {
		background: white;
		border: 2px solid #ccc;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.post-controls button:hover,
	.post-controls button.active {
		background: #14b8a6;
		color: white;
		border-color: #14b8a6;
	}
	
	.post-content.dyslexia-mode {
		font-family: 'OpenDyslexicMono', monospace;
		line-height: 1.6;
	}
</style>
