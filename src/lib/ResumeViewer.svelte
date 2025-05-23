<script lang="ts">
  import { marked } from 'marked';
  import DOMPurify from 'dompurify';

  let { 
    markdownContent = '', 
    fileName = 'resume.md' 
  } = $props<{
    markdownContent: string;
    fileName?: string;
  }>();

  // 🆕 Add dyslexia mode state
  let isDyslexiaMode = $state(false);

  let safeHtml = $derived(
    DOMPurify.sanitize(
      marked.parse(markdownContent, { async: false }) as string
    )
  );

  function handlePrint() {
    window.print();
  }

  function handleDownload() {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 🆕 Toggle dyslexia mode
  function toggleDyslexiaMode() {
    isDyslexiaMode = !isDyslexiaMode;
  }
</script>

<style>
  /* 🆕 Add OpenDyslexic font face */
  @font-face {
    font-family: 'OpenDyslexicMono';
    src: url('/dyslexiafont/OpenDyslexicMono-Regular.otf') format('opentype');
    font-display: swap;
  }

  /* Base styles */
  :global(body) {
      margin: 0;
      padding: 0;
      background: linear-gradient(
          145deg,
          rgba(0, 0, 0, 0.97) 0%,
          rgba(0, 0, 0, 0.99) 100%
      );
      min-height: 100%;
      height: auto;
  }

  .outer-container {
      width: 100vw;
      min-height: 100vh;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-base) 0;
      box-sizing: border-box;
      background: linear-gradient(
          145deg,
          rgba(0, 0, 0, 0.97) 0%,
          rgba(0, 0, 0, 0.99) 100%
      );
  }

  .resume-scroll-container {
      width: 100%;
      max-width: calc(210mm + 4rem);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      padding: 0 var(--spacing-lg);
      box-sizing: border-box;
  }

  .resume-container {
      width: 210mm;
      min-height: 297mm;
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      position: relative;
      margin: var(--spacing-lg) 0;
      border-radius: 1cqb;
  }

  /* 🆕 Dyslexia mode styles */
  .resume-container.dyslexia-mode {
    border: 3px solid transparent;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080) border-box;
    animation: rainbow-glow 3s ease-in-out infinite alternate;
  }

  @keyframes rainbow-glow {
    0% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.5); }
    33% { box-shadow: 0 0 20px rgba(255, 140, 0, 0.5); }
    66% { box-shadow: 0 0 20px rgba(64, 224, 208, 0.5); }
    100% { box-shadow: 0 0 20px rgba(255, 0, 128, 0.5); }
  }

  .resume-content {
      padding: 4cqmin;
      box-sizing: border-box;
  }

  /* 🆕 Conditional font family */
  .resume-content.dyslexia-mode {
    font-family: 'OpenDyslexicMono', monospace;
  }

  /* Typography styles */
  :global(.resume-content) {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.25;
      font-size: var(--font-size-base);
  }

  :global(.resume-content.dyslexia-mode) {
      font-family: 'OpenDyslexicMono', monospace;
      line-height: 1.4; /* Slightly increased for better readability */
  }

  :global(.resume-content h1) {
      font-size: calc(var(--font-size-base) * 1.75);
      font-weight: 700;
      margin-bottom: var(--spacing-base);
      color: var(--color-primary);
      letter-spacing: -0.02em;
  }

  :global(.resume-content h2) {
      font-size: calc(var(--font-size-base) * 1.25);
      font-weight: 600;
      margin-bottom: calc(var(--spacing-base) * 0.75);
      margin-top: var(--spacing-lg);
      color: #1f2937;
      letter-spacing: -0.01em;
      page-break-after: avoid;
  }

  :global(.resume-content h3) {
      font-size: var(--font-size-base);
      font-weight: 600;
      margin-bottom: calc(var(--spacing-base) * 0.5);
      margin-top: var(--spacing-base);
      color: #374151;
      page-break-after: avoid;
  }

  :global(.resume-content p) {
      color: #4b5563;
      margin-bottom: var(--spacing-base);
      line-height: 1.6;
  }

  :global(.resume-content ul) {
      list-style-type: disc;
      margin-left: calc(var(--spacing-base) * 1.25);
      margin-bottom: var(--spacing-base);
  }

  :global(.resume-content li) {
      margin-bottom: calc(var(--spacing-base) * 0.5);
      color: #4b5563;
  }

  :global(.resume-content a) {
      color: var(--color-primary);
      text-decoration: none;
      border-bottom: 1px solid #d1d5db;
  }

  :global(.resume-content hr) {
      margin: var(--spacing-lg) 0;
      border: none;
      height: 1px;
      background-color: #e5e7eb;
  }

  /* Controls styling */
  .controls {
      position: fixed;
      padding: var(--spacing-base);
      z-index: var(--z-index-modal);
      display: flex;
      gap: var(--spacing-base);
      top: var(--spacing-lg);
      right: var(--spacing-lg);
  }

  .control-button {
      background: rgba(255, 255, 255, 0.95);
      color: var(--color-primary);
      padding: calc(var(--spacing-base) * 0.75) calc(var(--spacing-base) * 1.25);
      border-radius: 0.375rem;
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-base) * 0.5);
      font-weight: 500;
      transition: all var(--transition-speed) ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border: none;
      cursor: pointer;
  }

  .control-button:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* 🆕 Dyslexia button specific styles */
  .dyslexia-button {
    font-family: 'OpenDyslexicMono', monospace; /* Default font */
    border: 2px solid transparent;
    transition: all var(--transition-speed) ease;
  }

  .dyslexia-button.active {
    background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)) padding-box,
                linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0, #ff0080) border-box;
    animation: button-rainbow 2s linear infinite;
  }

  @keyframes button-rainbow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  /* Print styles */
  @media print {
      /* Enable background printing */
      * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: inherit !important;
      }

      /* Reset everything to consistent state */
      :global(body) {
          background: white !important;
          margin: 0 !important;
          padding: 0 !important;
          font-size: 11pt !important; 
          font-family: 'Times New Roman', serif !important;
          line-height: 1.2 !important; 
          color: black !important;
      }

      .outer-container {
          padding: 0 !important;
          background: white !important;
          width: 100% !important;
          min-height: auto !important;
          display: block !important;
      }

      .resume-scroll-container {
          padding: 0 !important;
          max-width: none !important;
          width: 100% !important;
          margin: 0 auto !important;
          display: block !important;
      }

      .resume-container {
          box-shadow: none !important;
          margin: 0 auto !important;
          width: 100% !important;
          max-width: 8.5in !important;
          min-height: auto !important;
          border: none !important;
          border-radius: 0 !important;
          background: white !important;
      }

      .resume-content {
          padding: 0.5in !important; /* Slightly smaller margins for more content */
          border: none !important;
          border-radius: 0 !important;
          font-size: 11pt !important;
          line-height: 1.2 !important;
          color: black !important;
          width: auto !important; /* Let it fill available space */
          max-width: 7in !important; /* Maximum content width */
          margin: 0 auto !important; /* Center the content */
          box-sizing: border-box !important;
      }

      /* Dyslexia mode print styles */
      :global(.resume-content.dyslexia-mode) {
          font-family: 'Courier New', monospace !important;
          font-size: 10pt !important; 
          line-height: 1.3 !important;
      }

      /* Optimized typography hierarchy */
      :global(.resume-content h1) {
          font-size: 14pt !important;
          font-weight: bold !important;
          margin-bottom: 8pt !important;
          margin-top: 0 !important;
          color: black !important;
          page-break-after: avoid !important;
          line-height: 1.1 !important;
          text-align: center !important;
      }

      :global(.resume-content h2) {
          font-size: 12pt !important;
          font-weight: bold !important;
          margin-bottom: 4pt !important;
          margin-top: 10pt !important;
          color: black !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          line-height: 1.1 !important;
          border-bottom: 1pt solid black !important;
          padding-bottom: 2pt !important;
      }

      :global(.resume-content h3) {
          font-size: 11pt !important;
          font-weight: bold !important;
          margin-bottom: 3pt !important;
          margin-top: 5pt !important;
          color: black !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          line-height: 1.1 !important;
      }

      :global(.resume-content p) {
          font-size: 11pt !important;
          margin-bottom: 4pt !important;
          margin-top: 0 !important;
          color: black !important;
          line-height: 1.2 !important;
          orphans: 2 !important;
          widows: 2 !important;
          text-align: left !important;
      }

      :global(.resume-content.dyslexia-mode p) {
          font-size: 10pt !important;
          line-height: 1.3 !important;
      }

      :global(.resume-content ul) {
          margin-bottom: 4pt !important;
          margin-top: 2pt !important;
          margin-left: 20pt !important;
          padding-left: 0 !important;
          page-break-inside: avoid !important;
      }

      :global(.resume-content li) {
          font-size: 11pt !important;
          margin-bottom: 2pt !important;
          margin-top: 0 !important;
          color: black !important;
          line-height: 1.2 !important;
          page-break-inside: avoid !important;
      }

      :global(.resume-content.dyslexia-mode li) {
          font-size: 10pt !important;
          line-height: 1.3 !important;
      }

      :global(.resume-content a) {
          color: black !important;
          text-decoration: underline !important;
          border-bottom: none !important;
      }

      :global(.resume-content hr) {
          margin: 8pt 0 !important;
          border: none !important;
          height: 1pt !important;
          background-color: black !important;
          page-break-after: avoid !important;
      }

      /* Hide controls when printing */
      .controls {
          display: none !important;
      }

      /* Optimized page setup */
      @page {
          size: 8.5in 11in;
          margin: 0.25in; /* Browser will handle this */
      }

      /* Force consistent measurements */
      :global(.resume-content *) {
          font-family: inherit !important;
          color: black !important;
      }

      :global(.resume-content.dyslexia-mode *) {
          font-family: 'Courier New', monospace !important;
      }

      /* Contact info styling */
      :global(.resume-content p:first-of-type) {
          text-align: center !important;
          margin-bottom: 6pt !important;
      }
  }


  /* Mobile styles */
  @media (max-width: 640px) {
      .controls {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: auto;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          justify-content: center;
          flex-wrap: wrap;
      }

      .outer-container {
          padding-bottom: 6rem;
      }

      .resume-scroll-container {
          padding: 0 var(--spacing-base);
      }

      .resume-container {
          margin: var(--spacing-base) 0;
          width: 100%;
      }

      .resume-content {
          padding: 1.5cm;
      }

      .control-button {
          padding: calc(var(--spacing-base) * 0.5) calc(var(--spacing-base) * 0.75);
          font-size: 0.875rem;
      }
  }
</style>

<div class="outer-container">
  <!-- Controls -->
  <div class="controls">
    <button onclick={handlePrint} class="control-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"></polyline>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <rect x="6" y="14" width="12" height="8"></rect>
      </svg>
      Print PDF
    </button>
    
    <button onclick={handleDownload} class="control-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Download MD
    </button>

    <!-- 🆕 Dyslexia Mode Button -->
    <button 
      onclick={toggleDyslexiaMode} 
      class="control-button dyslexia-button"
      class:active={isDyslexiaMode}
      aria-pressed={isDyslexiaMode}
      title={isDyslexiaMode ? 'Disable dyslexia-friendly font' : 'Enable dyslexia-friendly font'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
      Dyslexia Mode
    </button>
  </div>

  <!-- Resume -->
  <div class="resume-scroll-container">
    <div class="resume-container" class:dyslexia-mode={isDyslexiaMode}>
      <div class="resume-content" class:dyslexia-mode={isDyslexiaMode}>
        {@html safeHtml}
      </div>
    </div>
  </div>
</div>