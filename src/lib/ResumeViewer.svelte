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
  .resume-container {
    width: 210mm; /* A4 width */
    min-height: 297mm; /* A4 height */
    max-width: 100%;
    background: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 2%;
    padding: 0 5%;
  }

  /* Screen-specific styles */
  @media screen {
    .resume-container {
      box-shadow: 
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .background-gradient {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        145deg,
        rgba(0, 0, 0, 0.97) 0%,
        rgba(0, 0, 0, 0.99) 100%
      );
      backdrop-filter: blur(20px);
    }
  }

  /* Print-specific styles */
  @media print {
    .controls,
    .background-gradient {
      display: none !important;
    }

    .resume-container {
      position: relative !important;
      left: 0 !important;
      transform: none !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      min-height: 100% !important;
      width: 100% !important;
    }

    .resume-content {
      padding: 0 !important;
      margin: 0 !important;
    }

    :global(body) {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    @page {
      size: A4;
      margin: 2cm;
    }
  }

  /* Typography styles - applied to both screen and print */
  :global(.resume-content) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    font-size: 14px;
    padding: 2.5cm 0;
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

  /* Responsive controls */
  @media (min-width: 641px) {
    .controls {
      top: 2rem;
      right: 2rem;
    }
  }

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

    .resume-container {
      margin-bottom: 5rem;
    }
  }
</style>

<div class="min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden">
  <!-- Background -->
  <div class="background-gradient"></div>

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
  <div class="resume-container">
    <div class="resume-content">
      {@html safeHtml}
    </div>
  </div>
</div>