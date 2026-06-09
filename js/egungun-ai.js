<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes">
  <title>Egungun AI · Premium Support</title>
  <!-- Preconnect & Fonts: crisp modern system + Clash Display alternative (Inter + Space Grotesk) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
  <!-- Font Awesome 6 (lightweight, used for clean icons) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    /* demo background to make widget pop — this is only for preview, widget itself is isolated */
    body {
      background: #f5f5f5;
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
      min-height: 100vh;
    }
    /* subtle decorative demo content (to simulate real page) */
    .demo-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      font-family: 'Inter', sans-serif;
    }
    .demo-content h1 { font-weight: 600; font-size: 2rem; margin-bottom: 1rem; color: #111; }
    .demo-content p { color: #333; line-height: 1.5; max-width: 600px; }
    hr { margin: 2rem 0; border-color: #ddd; }
  </style>
</head>
<body>
<div class="demo-content">
  <h1>Egungun of Africa · Cultural Excellence</h1>
  <p>Authentic heritage, modern expression. Our AI assistant is ready to guide you through bookings, rate cards, and instant support. <br>Click the chat bubble to experience the premium interface.</p>
  <hr />
  <p><i class="fas fa-arrow-down"></i> Widget is live at the bottom right — fully responsive, high-contrast, high-converting.</p>
</div>

<script>
  (function() {
    'use strict';

    // --------------------------------------------------------------
    // PREMIUM CONFIG (preserved structure & logic, enhanced values)
    // --------------------------------------------------------------
    const CONFIG = {
      REPORT_EMAIL: 'bookings@egungunofafrica.com',
      RATE_CARD_URL: '/pages/ratecard.html',
      CONTACT_URL: '/pages/contact.html',
      WHATSAPP_NUMBER: '27655365284',
      // More refined AI copy: direct yet warm, includes clear CTA direction
      AI_RESPONSE_TEXT: `Thank you for reaching out to Egungun of Africa.

We specialize in authentic cultural experiences and premium services. All booking inquiries and collaborations are handled via our dedicated channels.

📧 Email: bookings@egungunofafrica.com  
💬 WhatsApp: Direct consultation (reply within 24h)  
📄 Rate Card: View our service catalog below.

Please use the buttons to connect instantly — we look forward to assisting you.`,
      AUTO_CLOSE_INPUT: true,        // after first message, hide input → clean conversion focus
      AUTO_POPUP: false,
      TYPING_DELAY: 28               // slightly faster for premium smoothness
    };

    // ---------- AVATAR (high-res support, fallback to inline SVG if missing) ----------
    const AVATAR_SRC = '/images/egungun-avatar.jpeg';
    const AVATAR_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='45' r='22' fill='%23ffffff'/%3E%3Cpath d='M30 75 L70 75 L65 90 L35 90 Z' fill='%23ffffff'/%3E%3Ctext x='50' y='58' text-anchor='middle' fill='%23000000' font-size='32' font-weight='bold'%3EEA%3C/text%3E%3C/svg%3E";

    // ---------- PREMIUM CHAT HTML (high-contrast black/white, glassmorphic touches, bold spacing) ----------
    const chatHTML = `
      <style>
        /* ----- RESET / GLOBAL SCOPE (no leak) ----- */
        .egungun-premium-chat * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* main container with safe spacing */
        .egungun-premium-chat {
          position: fixed;
          bottom: max(20px, env(safe-area-inset-bottom, 20px));
          right: max(20px, env(safe-area-inset-right, 20px));
          z-index: 2147483647;
          font-family: 'Inter', 'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
        }

        /* ----- TRIGGER BUBBLE (premium minimalist) ----- */
        .premium-bubble {
          width: clamp(56px, 14vw, 68px);
          height: clamp(56px, 14vw, 68px);
          background: #000000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.9) inset, 0 0 0 4px rgba(0,0,0,0.05);
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          position: relative;
          backdrop-filter: blur(0px);
        }
        .premium-bubble:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 32px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,1) inset;
        }
        .bubble-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        .ai-badge-premium {
          position: absolute;
          bottom: -2px;
          right: -4px;
          background: #ffffff;
          color: #000000;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 7px;
          border-radius: 40px;
          font-family: 'Space Grotesk', monospace;
          letter-spacing: 0.5px;
          border: 1.5px solid #000;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        /* ----- CHAT WINDOW (Sleek, modern, elevated) ----- */
        .premium-window {
          position: absolute;
          bottom: calc(clamp(56px, 14vw, 68px) + 20px);
          right: 0;
          width: min(calc(100vw - 32px), 420px);
          max-width: 420px;
          background: #0A0A0A;
          border-radius: 32px;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(24px) scale(0.96);
          transition: all 0.28s cubic-bezier(0.2, 0.9, 0.4, 1.2);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
          backdrop-filter: blur(0px);
          pointer-events: none;
        }
        .premium-window.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* ----- Header Premium (brand first) ----- */
        .premium-header {
          background: #FFFFFF;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #E5E5E5;
          cursor: pointer;
        }
        .premium-avatar {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 50%;
          overflow: hidden;
          background: #F0F0F0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #EAEAEA;
        }
        .premium-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .premium-info {
          flex: 1;
        }
        .premium-info h4 {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.2px;
          color: #000000;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot-premium {
          width: 10px;
          height: 10px;
          background: #00C853;
          border-radius: 50%;
          display: inline-block;
          animation: pulsePremium 1.8s infinite;
          box-shadow: 0 0 0 1px #fff;
        }
        @keyframes pulsePremium {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); background: #00e676; }
          100% { opacity: 1; transform: scale(1); }
        }
        .premium-info p {
          font-size: 0.7rem;
          color: #4A4A4A;
          margin-top: 4px;
          font-weight: 500;
          letter-spacing: -0.2px;
        }
        .premium-close {
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #777;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 40px;
          transition: all 0.2s;
        }
        .premium-close:hover {
          background: #F0F0F0;
          color: #000;
        }

        /* ----- Messages container (scrolling, spacious) ----- */
        .premium-messages {
          height: clamp(340px, 55vh, 420px);
          overflow-y: auto;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: #0A0A0A;
          scroll-behavior: smooth;
        }
        /* custom scrollbar */
        .premium-messages::-webkit-scrollbar {
          width: 4px;
        }
        .premium-messages::-webkit-scrollbar-track {
          background: #1E1E1E;
          border-radius: 10px;
        }
        .premium-messages::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 10px;
        }

        /* Message rows */
        .msg-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          max-width: 100%;
        }
        .msg-ai {
          align-self: flex-start;
        }
        .msg-user {
          align-self: flex-end;
          justify-content: flex-end;
        }
        .msg-avatar {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 50%;
          overflow: hidden;
          background: #222;
          flex-shrink: 0;
        }
        .msg-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .msg-bubble {
          max-width: calc(100% - 46px);
          padding: 12px 18px;
          border-radius: 24px;
          font-size: 0.85rem;
          line-height: 1.45;
          font-weight: 500;
          word-break: break-word;
          letter-spacing: -0.2px;
        }
        .msg-ai .msg-bubble {
          background: #1A1A1A;
          color: #F0F0F0;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .msg-user .msg-bubble {
          background: #FFFFFF;
          color: #000000;
          border-bottom-right-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        /* Typing premium animation */
        .premium-typing {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: #1A1A1A;
          border-radius: 24px;
          border-bottom-left-radius: 6px;
          width: fit-content;
        }
        .typing-dots-premium {
          display: flex;
          gap: 6px;
        }
        .typing-dots-premium span {
          width: 8px;
          height: 8px;
          background: #aaa;
          border-radius: 50%;
          animation: typingFlow 1.2s infinite ease;
        }
        .typing-dots-premium span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-premium span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingFlow {
          0%, 60%, 100% { transform: translateY(0px); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; background: #fff; }
        }
        .typing-label {
          font-size: 0.7rem;
          color: #bbb;
          font-weight: 500;
          letter-spacing: -0.1px;
        }

        /* ACTION BUTTON GROUP — high contrast, branded, clean */
        .action-buttons-premium {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
          align-items: center;
        }
        .btn-premium {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 60px;
 font-size: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(2px);
        }
        .btn-rate {
          background: #FFFFFF;
          color: #000000;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .btn-rate:hover {
          background: #E6E6E6;
          transform: translateY(-2px);
        }
        .btn-wa {
          background: #25D366;
          color: #fff;
          border: none;
        }
        .btn-wa:hover {
          background: #128C7E;
          transform: translateY(-2px);
        }
        .btn-email {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
        }
        .btn-email:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .email-highlight-premium {
          background: #2A2A2A;
          padding: 4px 10px;
          border-radius: 40px;
          font-weight: 500;
          font-family: monospace;
          font-size: 0.8rem;
          display: inline-block;
          margin: 6px 0 2px;
          color: #ddd;
        }

        /* Input row - hidden after conversion (but elegant) */
        .premium-input-area {
          display: flex;
          padding: 16px 18px;
          background: #111111;
          border-top: 1px solid rgba(255,255,255,0.08);
          gap: 12px;
          transition: all 0.2s;
        }
        .premium-input-area.hidden {
          display: none;
        }
        .premium-input {
          flex: 1;
          background: #1C1C1C;
          border: 1px solid #2C2C2C;
          border-radius: 40px;
          padding: 12px 18px;
          color: #fff;
          font-family: inherit;
          font-size: 0.85rem;
          outline: none;
          transition: 0.2s;
        }
        .premium-input:focus {
          border-color: #ffffff;
          background: #222;
        }
        .premium-send {
          background: #FFFFFF;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .premium-send:active { transform: scale(0.94); }
        .premium-send i { font-size: 1.2rem; color: #000; }

        /* responsive refinements */
        @media (max-width: 500px) {
          .premium-window { width: calc(100vw - 28px); right: -4px; bottom: calc(clamp(56px, 14vw, 68px) + 16px); }
          .msg-bubble { font-size: 0.8rem; padding: 10px 14px; }
          .premium-header { padding: 14px 16px; }
          .premium-avatar { width: 42px; height: 42px; min-width: 42px; }
          .btn-premium { padding: 6px 14px; font-size: 0.7rem; }
          .action-buttons-premium { gap: 8px; }
        }
        @media (max-width: 380px) {
          .action-buttons-premium { flex-direction: column; align-items: stretch; }
          .btn-premium { justify-content: center; }
        }
        /* safe area notch */
        @supports (padding: max(0px)) {
          .egungun-premium-chat {
            bottom: max(20px, env(safe-area-inset-bottom, 20px));
            right: max(20px, env(safe-area-inset-right, 20px));
          }
        }
      </style>

      <div class="egungun-premium-chat">
        <!-- Bubble Trigger (avatar perfectly rendered) -->
        <div class="premium-bubble" id="premiumChatBubble">
          <img class="bubble-avatar" id="bubbleAvatarImg" src="${AVATAR_SRC}" alt="Egungun AI" onerror="this.onerror=null; this.src='${AVATAR_FALLBACK}';">
          <span class="ai-badge-premium">AI</span>
        </div>

        <!-- Chat Window -->
        <div class="premium-window" id="premiumChatWindow">
          <div class="premium-header" id="premiumHeaderDrag">
            <div class="premium-avatar">
              <img id="headerAvatarImg" src="${AVATAR_SRC}" alt="Egungun AI" onerror="this.onerror=null; this.src='${AVATAR_FALLBACK}';">
            </div>
            <div class="premium-info">
              <h4><span class="status-dot-premium"></span> Egungun AI</h4>
              <p>Online · Instant assistance</p>
            </div>
            <button class="premium-close" id="premiumChatClose">✕</button>
          </div>
          <div class="premium-messages" id="premiumMessagesContainer">
            <!-- Initial AI message (enhanced with subtle branding but will be overwritten with typed premium version) -->
            <div class="msg-wrapper msg-ai" id="initialMsgPlaceholder">
              <div class="msg-avatar"><img src="${AVATAR_SRC}" onerror="this.src='${AVATAR_FALLBACK}';"></div>
              <div class="msg-bubble">Good day. I am Egungun AI, your virtual assistant.<br><br>How may I assist you today?</div>
            </div>
          </div>
          <div class="premium-input-area" id="premiumInputArea">
            <input type="text" class="premium-input" id="premiumChatInput" placeholder="Type your message..." autocomplete="off">
            <button class="premium-send" id="premiumChatSend">
              <i class="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // ---------- DOM elements ----------
    const bubble = document.getElementById('premiumChatBubble');
    const windowEl = document.getElementById('premiumChatWindow');
    const closeBtn = document.getElementById('premiumChatClose');
    const messagesContainer = document.getElementById('premiumMessagesContainer');
    const inputAreaDiv = document.getElementById('premiumInputArea');
    const input = document.getElementById('premiumChatInput');
    const sendBtn = document.getElementById('premiumChatSend');

    // remove the static placeholder after DOM ready to replace with typed AI welcome (optional)
    let initialMsgRemoved = false;
    let hasResponded = false;
    let isTyping = false;

    // helper: scroll to bottom
    function scrollToBottom() {
      if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // clean typing indicator & add rich AI message with action buttons (Rate, WA, Email)
    async function typePremiumMessage(text, showButtons = true) {
      if (isTyping) return;
      isTyping = true;

      // remove static placeholder if exists
      if (!initialMsgRemoved) {
        const placeholder = document.getElementById('initialMsgPlaceholder');
        if (placeholder) placeholder.remove();
        initialMsgRemoved = true;
      }

      // show typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'msg-wrapper msg-ai';
      typingDiv.innerHTML = `
        <div class="msg-avatar"><img src="${AVATAR_SRC}" onerror="this.src='${AVATAR_FALLBACK}';"></div>
        <div class="premium-typing">
          <div class="typing-dots-premium"><span></span><span></span><span></span></div>
          <span class="typing-label">Egungun AI is composing...</span>
        </div>
      `;
      messagesContainer.appendChild(typingDiv);
      scrollToBottom();
      await new Promise(r => setTimeout(r, 1800));
      typingDiv.remove();

      // create AI message bubble
      const msgWrapper = document.createElement('div');
      msgWrapper.className = 'msg-wrapper msg-ai';
      const uniqueId = 'msg-content-' + Date.now();
      msgWrapper.innerHTML = `
        <div class="msg-avatar"><img src="${AVATAR_SRC}" onerror="this.src='${AVATAR_FALLBACK}';"></div>
        <div class="msg-bubble" id="${uniqueId}"></div>
      `;
      messagesContainer.appendChild(msgWrapper);
      const bubbleDiv = document.getElementById(uniqueId);
      
      // typing effect
      let currentText = '';
      for (let i = 0; i < text.length; i++) {
        currentText += text[i];
        bubbleDiv.innerHTML = currentText + '<span style="opacity:0.5; font-weight:300;">|</span>';
        scrollToBottom();
        await new Promise(r => setTimeout(r, CONFIG.TYPING_DELAY));
      }
      bubbleDiv.innerHTML = currentText;
      
      if (showButtons) {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'action-buttons-premium';
        // clean, premium action row: Rate Card, WhatsApp, Email Booking
        buttonGroup.innerHTML = `
          <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="btn-premium btn-rate"><i class="fas fa-file-invoice"></i> Rate Card</a>
          <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hi%20Egungun%20Of%20Africa%2C%20I'm%20interested%20in%20your%20services" target="_blank" class="btn-premium btn-wa"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          <a href="mailto:${CONFIG.REPORT_EMAIL}?subject=Egungun%20AI%20Inquiry&body=Hello%20Egungun%20Of%20Africa%2C%20I%20would%20like%20to%20inquire%20about%20booking." class="btn-premium btn-email"><i class="fas fa-envelope"></i> Email</a>
        `;
        bubbleDiv.appendChild(buttonGroup);
        
        // optionally add visible email highlight
        const emailHint = document.createElement('div');
        emailHint.style.marginTop = '12px';
        emailHint.style.fontSize = '0.7rem';
        emailHint.style.opacity = '0.7';
        emailHint.innerHTML = `<span class="email-highlight-premium"><i class="fas fa-reply-all"></i> ${CONFIG.REPORT_EMAIL}</span>`;
        bubbleDiv.appendChild(emailHint);
      }
      scrollToBottom();
      isTyping = false;
    }

    // add user message bubble
    function addUserMessage(message) {
      const wrapper = document.createElement('div');
      wrapper.className = 'msg-wrapper msg-user';
      const safeMsg = message.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
      });
      wrapper.innerHTML = `<div class="msg-bubble">${safeMsg}</div>`;
      messagesContainer.appendChild(wrapper);
      scrollToBottom();
    }

    // email reporting (preserved)
    function sendToEmail(userMessage) {
      const subject = `Egungun AI Chat - New Inquiry`;
      const body = `New message from Egungun AI widget:%0A%0AUser: ${encodeURIComponent(userMessage)}%0A%0APage: ${encodeURIComponent(window.location.href)}%0ATimestamp: ${new Date().toLocaleString()}`;
      const emailUrl = `mailto:${CONFIG.REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = emailUrl;
    }

    // handle user submission (chat flow)
    async function handleUserMessage() {
      const rawMessage = input.value.trim();
      if (!rawMessage) return;
      if (isTyping) return;
      
      addUserMessage(rawMessage);
      sendToEmail(rawMessage);   // keep original reporting logic
      input.value = '';
      
      if (hasResponded) {
        // follow-up case: offer gentle reminder with quick access
        await typePremiumMessage(`Thank you for your message. For any booking or rate inquiries, please use the buttons below or email us directly at ${CONFIG.REPORT_EMAIL}. Our team replies within 24 hours.`, true);
      } else {
        await typePremiumMessage(CONFIG.AI_RESPONSE_TEXT, true);
        hasResponded = true;
        if (CONFIG.AUTO_CLOSE_INPUT) {
          inputAreaDiv.classList.add('hidden');
        }
      }
    }

    // UI event bindings
    function openChat() {
      windowEl.classList.add('active');
      scrollToBottom();
    }
    function closeChat() {
      windowEl.classList.remove('active');
    }
    bubble.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
    
    // Click outside closes window (polite)
    document.addEventListener('click', function(e) {
      const isInside = bubble.contains(e.target) || windowEl.contains(e.target);
      if (!isInside && windowEl.classList.contains('active')) closeChat();
    });
    
    // ensure avatars are perfectly rendered on error + retry
    const allAvatars = document.querySelectorAll('#bubbleAvatarImg, #headerAvatarImg, .msg-avatar img');
    allAvatars.forEach(img => {
      img.onerror = function() { this.onerror = null; this.src = AVATAR_FALLBACK; };
    });
    
    // override initial message: to keep consistency, we replace the default static one with typed premium version after micro delay (only if hasn't responded)
    // but we need to show the initial warm welcome with buttons (better ux). So remove placeholder and generate premium greeting.
    setTimeout(() => {
      if (!hasResponded && !initialMsgRemoved) {
        const initialStatic = document.getElementById('initialMsgPlaceholder');
        if (initialStatic) initialStatic.remove();
        initialMsgRemoved = true;
        // first impression: premium AI message with booking CTAs even before user types
        typePremiumMessage(CONFIG.AI_RESPONSE_TEXT, true);
      }
    }, 100);
  })();
</script>
</body>
</html>
