<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Egungun of Africa</title>
  <style>
    /* Minimal demo styling - your actual page content would go here */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      background: #f5f5f5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
    }
    
    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
    }
    
    .content h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #111;
    }
    
    .content p {
      color: #444;
      line-height: 1.6;
      max-width: 600px;
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>Egungun of Africa</h1>
    <p>Cultural heritage, modern expression. Click the chat bubble at the bottom right to connect with our AI assistant.</p>
  </div>

  <script>
    (function() {
      'use strict';
      
      // ==============================================
      // EGUNGUN AI CHAT WIDGET - LIGHTNING FAST
      // ==============================================
      
      const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        RATE_CARD_URL: '/pages/ratecard.html',
        CONTACT_URL: '/pages/contact.html',
        WHATSAPP_NUMBER: '27655365284',
        AI_RESPONSE_TEXT: `Thank you for reaching out to Egungun of Africa.

All booking inquiries and collaborations are handled through our dedicated channels.

📧 Email: bookings@egungunofafrica.com
💬 WhatsApp: Direct consultation
📄 Rate Card: View our service catalog

Please use the buttons below to connect instantly.`,
        AUTO_CLOSE_INPUT: true,
        TYPING_DELAY: 25
      };
      
      // Base64 encoded avatar fallback (always works, no network request)
      const AVATAR_BASE64 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='42' r='20' fill='%23ffffff'/%3E%3Cpath d='M32 72 L68 72 L63 88 L37 88 Z' fill='%23ffffff'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23000000' font-size='28' font-weight='bold'%3EEA%3C/text%3E%3C/svg%3E";
      
      // Inject CSS and HTML immediately
      const style = document.createElement('style');
      style.textContent = `
        /* CHAT WIDGET - INSTANT, NO FOUC */
        .eg-ai-chat {
          position: fixed;
          bottom: max(16px, env(safe-area-inset-bottom, 16px));
          right: max(16px, env(safe-area-inset-right, 16px));
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
        }
        
        .eg-ai-bubble {
          width: 56px;
          height: 56px;
          background: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 2px solid #fff;
          position: relative;
        }
        
        .eg-ai-bubble:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(0,0,0,0.3);
        }
        
        .eg-ai-bubble-img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .eg-ai-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: #fff;
          color: #000;
          font-size: 9px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 20px;
          border: 1px solid #000;
        }
        
        .eg-ai-window {
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 380px;
          max-width: calc(100vw - 32px);
          background: #0a0a0a;
          border-radius: 24px;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.96);
          transition: all 0.25s ease;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .eg-ai-window.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        
        .eg-ai-header {
          background: #fff;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .eg-ai-header-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          background: #f0f0f0;
        }
        
        .eg-ai-header-info {
          flex: 1;
        }
        
        .eg-ai-header-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #000;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .eg-ai-status {
          width: 8px;
          height: 8px;
          background: #00c853;
          border-radius: 50%;
          display: inline-block;
          animation: egPulse 1.5s infinite;
        }
        
        @keyframes egPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .eg-ai-header-info p {
          font-size: 0.65rem;
          color: #666;
          margin: 2px 0 0;
        }
        
        .eg-ai-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #999;
          padding: 0 5px;
          transition: color 0.2s;
        }
        
        .eg-ai-close:hover {
          color: #000;
        }
        
        .eg-ai-messages {
          height: 360px;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #0a0a0a;
        }
        
        .eg-ai-messages::-webkit-scrollbar {
          width: 4px;
        }
        
        .eg-ai-messages::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        .eg-ai-messages::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 10px;
        }
        
        .eg-msg-wrapper {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        
        .eg-msg-ai {
          align-self: flex-start;
        }
        
        .eg-msg-user {
          align-self: flex-end;
          justify-content: flex-end;
        }
        
        .eg-msg-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        
        .eg-msg-bubble {
          max-width: calc(100% - 42px);
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 0.8rem;
          line-height: 1.45;
          word-wrap: break-word;
        }
        
        .eg-msg-ai .eg-msg-bubble {
          background: #1a1a1a;
          color: #e0e0e0;
          border-bottom-left-radius: 4px;
        }
        
        .eg-msg-user .eg-msg-bubble {
          background: #fff;
          color: #000;
          border-bottom-right-radius: 4px;
          max-width: 85%;
        }
        
        .eg-typing {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: #1a1a1a;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
        }
        
        .eg-typing-dots {
          display: flex;
          gap: 4px;
        }
        
        .eg-typing-dots span {
          width: 6px;
          height: 6px;
          background: #888;
          border-radius: 50%;
          animation: egTyping 1.4s infinite ease;
        }
        
        .eg-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .eg-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes egTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        
        .eg-typing-text {
          font-size: 0.7rem;
          color: #aaa;
        }
        
        .eg-input-area {
          display: flex;
          padding: 12px;
          background: #111;
          border-top: 1px solid rgba(255,255,255,0.05);
          gap: 8px;
        }
        
        .eg-input-area.hidden {
          display: none;
        }
        
        .eg-input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 25px;
          padding: 10px 14px;
          color: #fff;
          font-family: inherit;
          font-size: 0.8rem;
          outline: none;
        }
        
        .eg-input:focus {
          border-color: #fff;
        }
        
        .eg-send {
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        
        .eg-send:active {
          transform: scale(0.95);
        }
        
        .eg-send svg {
          width: 16px;
          height: 16px;
          fill: #000;
        }
        
        .eg-button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }
        
        .eg-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 25px;
          font-size: 0.7rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .eg-btn-rate {
          background: #fff;
          color: #000;
        }
        
        .eg-btn-rate:hover {
          background: #e0e0e0;
          transform: translateY(-1px);
        }
        
        .eg-btn-wa {
          background: #25D366;
          color: #fff;
        }
        
        .eg-btn-wa:hover {
          background: #128C7E;
          transform: translateY(-1px);
        }
        
        .eg-btn-email {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
        }
        
        .eg-btn-email:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }
        
        .eg-email-highlight {
          color: #fff;
          font-weight: 500;
          background: rgba(255,255,255,0.08);
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 10px;
          font-size: 0.7rem;
          word-break: break-all;
        }
        
        @media (max-width: 480px) {
          .eg-ai-window {
            width: calc(100vw - 24px);
            right: -8px;
            bottom: 68px;
          }
          .eg-ai-messages {
            height: 320px;
          }
          .eg-btn {
            flex: 1;
            justify-content: center;
            white-space: nowrap;
          }
        }
        
        @media (max-width: 380px) {
          .eg-button-group {
            flex-direction: column;
          }
          .eg-btn {
            white-space: normal;
            text-align: center;
          }
        }
      `;
      document.head.appendChild(style);
      
      // HTML structure
      const html = `
        <div class="eg-ai-chat">
          <div class="eg-ai-bubble" id="egBubble">
            <img class="eg-ai-bubble-img" id="egBubbleImg" src="${AVATAR_BASE64}" alt="Egungun AI">
            <span class="eg-ai-badge">AI</span>
          </div>
          <div class="eg-ai-window" id="egWindow">
            <div class="eg-ai-header">
              <img class="eg-ai-header-avatar" id="egHeaderImg" src="${AVATAR_BASE64}" alt="Egungun AI">
              <div class="eg-ai-header-info">
                <h4><span class="eg-ai-status"></span>Egungun AI</h4>
                <p>Online · Ready to assist</p>
              </div>
              <button class="eg-ai-close" id="egClose">✕</button>
            </div>
            <div class="eg-ai-messages" id="egMessages">
              <div class="eg-msg-wrapper eg-msg-ai" id="egWelcomeMsg">
                <img class="eg-msg-avatar" src="${AVATAR_BASE64}" alt="Egungun AI">
                <div class="eg-msg-bubble">
                  Good day. I am Egungun AI, your virtual assistant.<br><br>
                  How may I assist you today?
                </div>
              </div>
            </div>
            <div class="eg-input-area" id="egInputArea">
              <input type="text" class="eg-input" id="egInput" placeholder="Type your message..." autocomplete="off">
              <button class="eg-send" id="egSend">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', html);
      
      // State
      let hasResponded = false;
      let isTyping = false;
      
      // DOM elements
      const bubble = document.getElementById('egBubble');
      const windowEl = document.getElementById('egWindow');
      const closeBtn = document.getElementById('egClose');
      const messagesContainer = document.getElementById('egMessages');
      const inputArea = document.getElementById('egInputArea');
      const input = document.getElementById('egInput');
      const sendBtn = document.getElementById('egSend');
      const welcomeMsg = document.getElementById('egWelcomeMsg');
      
      function openChat() {
        windowEl.classList.add('active');
        setTimeout(() => {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
      }
      
      function closeChat() {
        windowEl.classList.remove('active');
      }
      
      bubble.addEventListener('click', openChat);
      closeBtn.addEventListener('click', closeChat);
      
      function sendToEmail(userMessage) {
        const subject = `Egungun AI Chat - New Inquiry`;
        const body = `New message from Egungun AI chat widget:%0A%0AUser Message: ${encodeURIComponent(userMessage)}%0A%0APage: ${encodeURIComponent(window.location.href)}%0ATimestamp: ${new Date().toLocaleString()}`;
        window.location.href = `mailto:${CONFIG.REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
      }
      
      async function typeMessage(text) {
        if (isTyping) return;
        isTyping = true;
        
        // Remove welcome message if it exists
        if (welcomeMsg && welcomeMsg.parentNode) {
          welcomeMsg.remove();
        }
        
        // Show typing indicator
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'eg-msg-wrapper eg-msg-ai';
        typingWrapper.innerHTML = `
          <img class="eg-msg-avatar" src="${AVATAR_BASE64}" alt="Egungun AI">
          <div class="eg-typing">
            <div class="eg-typing-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="eg-typing-text">Egungun AI is typing...</span>
          </div>
        `;
        messagesContainer.appendChild(typingWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        typingWrapper.remove();
        
        // Create message bubble
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'eg-msg-wrapper eg-msg-ai';
        const msgId = 'msg-' + Date.now();
        messageWrapper.innerHTML = `
          <img class="eg-msg-avatar" src="${AVATAR_BASE64}" alt="Egungun AI">
          <div class="eg-msg-bubble" id="${msgId}"></div>
        `;
        messagesContainer.appendChild(messageWrapper);
        
        const bubbleDiv = document.getElementById(msgId);
        let currentText = '';
        
        for (let i = 0; i < text.length; i++) {
          currentText += text[i];
          bubbleDiv.innerHTML = currentText + '<span style="opacity:0.4;">|</span>';
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          await new Promise(resolve => setTimeout(resolve, CONFIG.TYPING_DELAY));
        }
        
        // Add action buttons
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'eg-button-group';
        buttonGroup.innerHTML = `
          <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="eg-btn eg-btn-rate">
            <i class="fas fa-file-invoice"></i> Rate Card
          </a>
          <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hi%20Egungun%20Of%20Africa%2C%20I'm%20interested%20in%20your%20services" target="_blank" class="eg-btn eg-btn-wa">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a href="mailto:${CONFIG.REPORT_EMAIL}?subject=Booking%20Inquiry&body=Hello%20Egungun%20Of%20Africa%2C%20I%20would%20like%20to%20inquire%20about%20booking." class="eg-btn eg-btn-email">
            <i class="fas fa-envelope"></i> Email
          </a>
        `;
        bubbleDiv.innerHTML = currentText;
        bubbleDiv.appendChild(buttonGroup);
        
        const emailHint = document.createElement('div');
        emailHint.className = 'eg-email-highlight';
        emailHint.innerHTML = `<i class="fas fa-envelope"></i> ${CONFIG.REPORT_EMAIL}`;
        bubbleDiv.appendChild(emailHint);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        isTyping = false;
      }
      
      function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'eg-msg-wrapper eg-msg-user';
        const safeMessage = message.replace(/[&<>]/g, function(m) {
          if (m === '&') return '&amp;';
          if (m === '<') return '&lt;';
          if (m === '>') return '&gt;';
          return m;
        });
        messageDiv.innerHTML = `<div class="eg-msg-bubble">${safeMessage}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
      
      function handleUserMessage() {
        const userMessage = input.value.trim();
        if (userMessage === '' || isTyping) return;
        
        addUserMessage(userMessage);
        sendToEmail(userMessage);
        
        if (hasResponded) {
          const reminderMsg = `Thank you for your follow-up. For all booking inquiries, please use the buttons above or email ${CONFIG.REPORT_EMAIL}.`;
          typeMessage(reminderMsg);
        } else {
          typeMessage(CONFIG.AI_RESPONSE_TEXT);
          hasResponded = true;
          input.value = '';
          
          if (CONFIG.AUTO_CLOSE_INPUT) {
            inputArea.classList.add('hidden');
          }
        }
      }
      
      sendBtn.addEventListener('click', handleUserMessage);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
      });
      
      // Close when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInside = bubble.contains(event.target) || windowEl.contains(event.target);
        if (!isClickInside && windowEl.classList.contains('active')) {
          closeChat();
        }
      });
      
      // Load Font Awesome if needed
      if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
      }
      
      console.log('Egungun AI Chat Widget loaded successfully');
    })();
  </script>
</body>
</html>
