// ⚠️ IMPORTANT: In a real app, NEVER expose your API key in frontend code.
// For this lab assignment only, we use it directly for simplicity.

// const API_KEY =
//   "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"; // 🔑 Paste your OpenAI key here

// const API_KEY =
//   "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"; // 🔑 Paste your OpenAI key here
// const API_URL = "https://api.openai.com/v1/chat/completions";
// const MODEL = "gpt-4o-mini";

const API_KEY = "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";
const API_URL = "https://models.inference.ai.azure.com/chat/completions";
const MODEL = "Phi-4-mini-instruct";

// This array holds the full conversation history sent to the API
let conversationHistory = [
  {
    role: "system",
    content: "You are a helpful assistant.",
  },
];

// --- DOM Elements ---
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");

// --- Send on Enter key (Shift+Enter = new line) ---
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener("click", sendMessage);
newChatBtn.addEventListener("click", clearChat);

// --- Main Send Function ---
async function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  // 1. Show user message in UI
  appendMessage("user", userText);
  userInput.value = "";
  sendBtn.disabled = true;

  // 2. Add to history
  conversationHistory.push({ role: "user", content: userText });

  // 3. Show typing indicator
  const typingEl = appendMessage("assistant", "Thinking...", true);

  try {
    // 4. Call OpenAI API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: conversationHistory, // Send full history!
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const assistantReply = data.choices[0].message.content;

    // 5. Remove typing indicator, show real response
    typingEl.remove();
    appendMessage("assistant", assistantReply);

    // 6. Add assistant reply to history so next message has context
    conversationHistory.push({ role: "assistant", content: assistantReply });
  } catch (error) {
    typingEl.remove();
    appendMessage("assistant", `❌ Error: ${error.message}`);
  }

  sendBtn.disabled = false;
  userInput.focus();
}

// --- Helper: Add a message bubble to the UI ---
function appendMessage(role, text, isTyping = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${role}${isTyping ? " typing" : ""}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "🧑" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = formatResponse(text);

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  messagesDiv.appendChild(msgDiv);

  // Auto-scroll to latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  return msgDiv;
}

// --- Clear chat and reset history ---
function clearChat() {
  messagesDiv.innerHTML = "";
  conversationHistory = [
    { role: "system", content: "You are a helpful assistant." },
  ];
}

function formatResponse(text) {
  // Code blocks (```code```)
  text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="lang-${lang || ""}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code (`code`)
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bold (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic (*text*)
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Headings (## Heading)
  text = text.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Bullet points (- item)
  text = text.replace(/^\s*[-*] (.+)/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Numbered lists (1. item)
  text = text.replace(/^\d+\. (.+)/gm, "<li>$1</li>");

  // Line breaks
  text = text.replace(/\n\n/g, "</p><p>");
  text = text.replace(/\n/g, "<br/>");

  return `<p>${text}</p>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
