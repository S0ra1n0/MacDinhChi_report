document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("docx-viewer");
  if (!viewer) return;

  async function loadDocx() {
    viewer.textContent = "Loading document...";
    try {
      const resp = await fetch("document.docx");
      if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
      const arrayBuffer = await resp.arrayBuffer();
      if (!window.mammoth) throw new Error("mammoth not loaded");
      const result = await mammoth.convertToHtml({ arrayBuffer });
      viewer.innerHTML = result.value || "<p>(Document produced no HTML)</p>";
      if (result.messages && result.messages.length)
        console.warn("Mammoth messages:", result.messages);
    } catch (err) {
      console.error(err);
      viewer.innerHTML = `<p>Failed to load document. <a href="document.docx">Download document.docx</a></p>`;
    }
  }

  loadDocx();
});
