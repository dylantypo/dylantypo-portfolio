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
</script>

<style>
  /* Base styles */
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(
      145deg,
      rgba(0, 0, 0, 0.97) 0%,
      rgba(0, 0, 0, 0.99) 100%
    );
  }

  .outer-container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    box-sizing: border-box;
  }

  .resume-scroll-container {
    width: 100%;
    max-width: calc(210mm + 4rem); /* A4 width + margin */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  .resume-container {
    width: 210mm; /* A4 width */
    min-height: 297mm; /* A4 height */
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 2rem 0;
    border-radius: 1cqb;
  }

  .resume-content {
    padding: 4cqmin;
    box-sizing: border-box;
  }

  @media print {
  /* Enable background printing */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Reset everything to desktop-like state */
  :global(body) {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .outer-container {
    padding: 0 !important;
    padding-bottom: 0 !important; /* Override mobile padding-bottom */
  }

  .resume-scroll-container {
    padding: 0 !important;
    max-width: none !important;
    width: 210mm !important; /* Force A4 width */
  }

  .resume-container {
    box-shadow: none !important;
    margin: 0 !important;
    width: 210mm !important; /* Force A4 width */
    border-radius: 0 !important;
  }

  .resume-content {
    padding: 0 !important;
  }

  /* Override mobile-specific styles */
  @media (max-width: 640px) {
    .resume-container {
      width: 210mm !important;
    }
    
    .resume-content {
      padding: 0 !important;
    }
    
    .resume-scroll-container {
      padding: 0 !important;
      width: 210mm !important;
    }
  }

  .controls {
    display: none !important;
  }

  @page {
    size: A4;
    margin: 1rem;
  }
}

  /* Typography styles */
  :global(.resume-content) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.25;
    font-size: 14px;
  }

  :global(.resume-content h1) {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #111827;
    letter-spacing: -0.02em;
  }

  :global(.resume-content h2) {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
    color: #1f2937;
    letter-spacing: -0.01em;
    page-break-after: avoid;
  }

  :global(.resume-content h3) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    color: #374151;
    page-break-after: avoid;
  }

  :global(.resume-content p) {
    color: #4b5563;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  :global(.resume-content ul) {
    list-style-type: disc;
    margin-left: 1.25rem;
    margin-bottom: 1rem;
  }

  :global(.resume-content li) {
    margin-bottom: 0.5rem;
    color: #4b5563;
  }

  :global(.resume-content a) {
    color: #111827;
    text-decoration: none;
    border-bottom: 1px solid #d1d5db;
  }

  :global(.resume-content hr) {
    margin: 1.5rem 0;
    border: none;
    height: 1px;
    background-color: #e5e7eb;
  }

  /* Controls styling */
  .controls {
    position: fixed;
    padding: 1rem;
    z-index: 50;
    display: flex;
    gap: 1rem;
    top: 2rem;
    right: 2rem;
  }

  .control-button {
    background: rgba(255, 255, 255, 0.95);
    color: #000;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .control-button:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    }

    .outer-container {
      padding-bottom: 5rem;
    }

    .resume-scroll-container {
      padding: 0 1rem;
    }

    .resume-container {
      margin: 1rem 0;
      width: 100%;
    }

    .resume-content {
      padding: 1.5cm;
    }

    :global(.resume-content ul) {
      margin: 0;
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
  </div>

  <!-- Resume -->
  <div class="resume-scroll-container">
    <div class="resume-container">
      <div class="resume-content">
        {@html safeHtml}
      </div>
    </div>
  </div>
</div>