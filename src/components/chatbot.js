const loadChatbot = () => {
  fetch("/src/components/chat.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("chatbot_container").innerHTML = data;

      const toggleBtn = document.getElementById("chatbot-toggle");
      const chatbox = document.getElementById("chatbox");
      const closeBtn = document.getElementById("chatbot-close");
      const chatForm = document.getElementById("chat-form");
      const chatInput = document.getElementById("chat-input");
      const chatMessages = document.getElementById("chat-messages");

      let isWaiting = false; // Prevent double-send before bot replies

      // Open & Close
      toggleBtn.addEventListener("click", () => chatbox.classList.toggle("hidden"));
      closeBtn.addEventListener("click", () => chatbox.classList.add("hidden"));

      // Auto textarea resize
      chatInput.addEventListener("input", () => {
        chatInput.style.height = "auto";
        chatInput.style.height = chatInput.scrollHeight + "px";
      });

      // Handle Enter to send, Shift+Enter to break line
      chatInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!isWaiting) {
            chatForm.dispatchEvent(new Event("submit", { cancelable: true }));
          }
        }
      });

      // Send message
      chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isWaiting) return;

        const userText = chatInput.value.trim();
        if (!userText) return;

        isWaiting = true;
        chatInput.disabled = true;
        chatInput.classList.add("opacity-60", "cursor-not-allowed");

        appendMessage("user", userText);
        const botMsgEl = appendMessage("bot", "🤖Bot typing...");

        chatInput.value = "";
        chatInput.style.height = "auto";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
          const response = await fetch("http://127.0.0.1:8000/api/chat/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }),
          });

          const data = await response.json();
          botMsgEl.innerHTML = createBubble("bot", `🤖 ${data.response || "No response found or server error"}`);
        } catch (err) {
          botMsgEl.innerHTML = createBubble("error", `❌ ${err.message}`);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
        isWaiting = false;
        chatInput.disabled = false;
        chatInput.classList.remove("opacity-60", "cursor-not-allowed");
        chatInput.focus();
      });

      // Helper: Create chat bubble
      function createBubble(type, text) {
        const base = "p-2 rounded-xl max-w-[80%] inline-block whitespace-pre-wrap break-words transition-all duration-200";
        if (type === "user") return `<div class="bg-green-100 text-green-800 ${base}">🧑 ${text}</div>`;
        if (type === "bot") return `<div class="bg-blue-100 text-blue-800 ${base}"> ${text}</div>`;
        return `<div class="bg-red-100 text-red-700 ${base}">❌ ${text}</div>`;
      }

      // Helper: Append message to chat
      function appendMessage(type, text) {
        const wrapper = document.createElement("div");
        wrapper.className = type === "user" ? "text-right" : "text-left";
        wrapper.innerHTML = createBubble(type, text);
        chatMessages.appendChild(wrapper);
        return wrapper;
      }
    });
};

loadChatbot();
