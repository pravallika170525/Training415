async function compare() {
  const prompt = document.getElementById("prompt").value.trim();

  if (!prompt) return alert("Enter a prompt first");

  document.getElementById("openai").textContent = "Loading...";
  document.getElementById("claude").textContent = "Loading...";
  document.getElementById("gemini").textContent = "Loading...";

  try {
    const res = await fetch("http://localhost:5000/api/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();

    document.getElementById("openai").textContent = data.openai;
    document.getElementById("claude").textContent = data.claude;
    document.getElementById("gemini").textContent = data.gemini;

  } catch (e) {
    console.error(e);
    alert("Backend not reachable");
  }
}