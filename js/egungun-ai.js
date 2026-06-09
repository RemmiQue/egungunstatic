// ==============================================
// EGUNGUN AI CHAT WIDGET - FULLY RESPONSIVE
// Fixed version - Widget stays visible on all pages
// ==============================================

(function() {
    'use strict';

    // Don't create duplicate widgets
    if (document.querySelector('.egungun-ai-chat')) return;

    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        RATE_CARD_URL: '/pages/ratecard.html',
        CONTACT_URL: '/pages/contact.html',
        WHATSAPP_NUMBER: '27655365284',
        AI_RESPONSE_TEXT: `Thank you for reaching out to Egungun of Africa.

All booking inquiries are handled through our dedicated channels:

📧 Email: bookings@egungunofafrica.com
💬 WhatsApp: Direct consultation 
📄 Rate Card: View our service catalog

Please use the buttons below to connect instantly.`,
        AUTO_CLOSE_INPUT: true,
        TYPING_DELAY: 35
    };

    // Use inline SVG avatar (always works, no failed requests)
    const AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='42' r='22' fill='%23ffffff'/%3E%3Cpath d='M30 72 L70 72 L64 90 L36 90 Z' fill='%23ffffff'/%3E%3Ctext x='50' y='56' text-anchor='middle' fill='%23000000' font-size='30' font-weight='bold'%3EEA%3C/text%3E%3C/svg%3E";

    const chatHTML = `
        <style>
            /* ==============================================
               CHAT WIDGET - FIXED & RELIABLE
            ============================================== */
            
            .egungun-ai-chat {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            /* Chat Bubble */
            .egungun-ai-bubble {
                width: 60px;
                height: 60px;
                background: #000000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.25);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                border: 2px solid #ffffff;
                position: relative;
            }

            .egungun-ai-bubble:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }

            .egungun-ai-bubble-icon {
                width: 32px;
                height: 32px;
                fill: #ffffff;
            }

            .ai-badge {
                position: absolute;
                bottom: -2px;
                right: -2px;
                background: #ffffff;
                color: #000000;
                font-size: 9px;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 20px;
                font-family: monospace;
                border: 1px solid #000000;
            }

            /* Chat Window */
            .egungun-ai-window {
                position: absolute;
                bottom: 75px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 30px);
                background: #0a0a0a;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 24px;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.96);
                transition: all 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                pointer-events: none;
            }

            .egungun-ai-window.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }

            /* Header */
            .egungun-ai-header {
                background: #ffffff;
                padding: 14px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .egungun-ai-avatar {
                width: 44px;
                height: 44px;
                min-width: 44px;
                border-radius: 50%;
                overflow: hidden;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .egungun-ai-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .egungun-ai-info {
                flex: 1;
                min-width: 0;
            }

            .egungun-ai-info h4 {
                font-size: 0.95rem;
                font-weight: 700;
                color: #000000;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .egungun-ai-info p {
                font-size: 0.65rem;
                color: #666666;
                margin: 2px 0 0;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background: #00c853;
                border-radius: 50%;
                display: inline-block;
                animation: pulse 1.5s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .egungun-ai-close {
                background: none;
                border: none;
                color: #999999;
                cursor: pointer;
                font-size: 18px;
                padding: 0 8px;
                transition: color 0.2s;
                flex-shrink: 0;
            }

            .egungun-ai-close:hover {
                color: #000000;
            }

            /* Messages Area */
            .egungun-ai-messages {
                height: 380px;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #0a0a0a;
            }

            .egungun-ai-messages::-webkit-scrollbar {
                width: 4px;
            }
            .egungun-ai-messages::-webkit-scrollbar-track {
                background: #1a1a1a;
            }
            .egungun-ai-messages::-webkit-scrollbar-thumb {
                background: #444444;
                border-radius: 10px;
            }

            /* Message Wrappers */
            .message-wrapper {
                display: flex;
                gap: 10px;
                align-items: flex-start;
                max-width: 100%;
            }

            .message-avatar {
                width: 32px;
                height: 32px;
                min-width: 32px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
            }

            .message-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .message-bubble {
                max-width: calc(100% - 42px);
                padding: 10px 14px;
                border-radius: 18px;
                font-size: 0.8rem;
                line-height: 1.45;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }

            .message-ai-wrapper {
                align-self: flex-start;
            }

            .message-ai-wrapper .message-bubble {
                background: #1a1a1a;
                color: #e0e0e0;
                border-bottom-left-radius: 4px;
            }

            .message-user-wrapper {
                align-self: flex-end;
                justify-content: flex-end;
            }

            .message-user-wrapper .message-bubble {
                background: #ffffff;
                color: #000000;
                border-bottom-right-radius: 4px;
                max-width: 85%;
            }

            /* Typing Indicator */
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 14px;
                background: #1a1a1a;
                border-radius: 18px;
                border-bottom-left-radius: 4px;
                width: fit-content;
                max-width: 100%;
            }

            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }

            .typing-dots span {
                width: 6px;
                height: 6px;
                background: #888;
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }

            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-5px); opacity: 1; }
            }

            .typing-text {
                font-size: 0.7rem;
                color: #aaa;
            }

            /* Input Area */
            .egungun-ai-input-area {
                display: flex;
                padding: 12px;
                background: #111111;
                border-top: 1px solid rgba(255,255,255,0.05);
                gap: 8px;
                transition: all 0.3s ease;
            }

            .egungun-ai-input-area.hidden {
                display: none;
            }

            .egungun-ai-input {
                flex: 1;
                background: #1a1a1a;
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 25px;
                padding: 10px 14px;
                color: #ffffff;
                font-family: inherit;
                font-size: 0.8rem;
                outline: none;
                min-width: 0;
            }

            .egungun-ai-input:focus {
                border-color: #ffffff;
            }

            .egungun-ai-send {
                background: #ffffff;
                border: none;
                border-radius: 50%;
                width: 38px;
                height: 38px;
                min-width: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: transform 0.1s ease;
            }

            .egungun-ai-send:active {
                transform: scale(0.95);
            }

            .egungun-ai-send svg {
                width: 16px;
                height: 16px;
                fill: #000000;
            }

            /* Buttons inside message */
            .button-group {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 14px;
            }

            .rate-card-link, .contact-link, .whatsapp-link {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 7px 14px;
                border-radius: 25px;
                font-size: 0.7rem;
                font-weight: 600;
                transition: all 0.2s ease;
                text-decoration: none;
                cursor: pointer;
            }

            @media (max-width: 480px) {
                .rate-card-link, .contact-link, .whatsapp-link {
                    flex: 1;
                    justify-content: center;
                }
            }

            .rate-card-link {
                background: #ffffff;
                color: #000000;
            }

            .rate-card-link:hover {
                background: #dddddd;
                transform: translateY(-1px);
            }

            .contact-link {
                background: transparent;
                color: #ffffff;
                border: 1px solid rgba(255,255,255,0.3);
            }

            .contact-link:hover {
                background: rgba(255,255,255,0.1);
                transform: translateY(-1px);
            }

            .whatsapp-link {
                background: #25D366;
                color: #ffffff;
                border: none;
            }

            .whatsapp-link:hover {
                background: #128C7E;
                transform: translateY(-1px);
            }

            .email-highlight {
                color: #ffffff;
                font-weight: 500;
                background: rgba(255,255,255,0.08);
                padding: 4px 10px;
                border-radius: 20px;
                display: inline-block;
                margin-top: 10px;
                font-size: 0.7rem;
                word-break: break-all;
            }

            /* Mobile Responsive */
            @media (max-width: 480px) {
                .egungun-ai-window {
                    width: calc(100vw - 24px);
                    right: -8px;
                    bottom: 72px;
                }
                
                .message-bubble {
                    font-size: 0.75rem;
                    padding: 8px 12px;
                }
                
                .message-avatar {
                    width: 28px;
                    height: 28px;
                    min-width: 28px;
                }
                
                .egungun-ai-header {
                    padding: 12px 14px;
                }
                
                .egungun-ai-avatar {
                    width: 38px;
                    height: 38px;
                    min-width: 38px;
                }
                
                .egungun-ai-messages {
                    height: 350px;
                }
            }

            @media (max-width: 380px) {
                .button-group {
                    flex-direction: column;
                }
                
                .rate-card-link, .contact-link, .whatsapp-link {
                    width: 100%;
                    justify-content: center;
                    white-space: normal;
                    text-align: center;
                }
            }

            /* Safe area for notched phones */
            @supports (padding: max(0px)) {
                .egungun-ai-chat {
                    bottom: max(20px, env(safe-area-inset-bottom, 20px));
                    right: max(20px, env(safe-area-inset-right, 20px));
                }
            }
        </style>

        <div class="egungun-ai-chat">
            <div class="egungun-ai-bubble" id="egungunAiBubble">
                <svg class="egungun-ai-bubble-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>
                </svg>
                <span class="ai-badge">AI</span>
            </div>
            
            <div class="egungun-ai-window" id="egungunAiWindow">
                <div class="egungun-ai-header">
                    <div class="egungun-ai-avatar">
                        <img src="${AVATAR_SVG}" alt="Egungun AI">
                    </div>
                    <div class="egungun-ai-info">
                        <h4><span class="status-dot"></span>Egungun AI</h4>
                        <p>Online · Ready to assist</p>
                    </div>
                    <button class="egungun-ai-close" id="egungunAiClose">✕</button>
                </div>
                
                <div class="egungun-ai-messages" id="egungunAiMessages">
                    <div class="message-wrapper message-ai-wrapper" id="welcomeMessage">
                        <div class="message-avatar">
                            <img src="${AVATAR_SVG}" alt="Egungun AI">
                        </div>
                        <div class="message-bubble">
                            Good day. I am Egungun AI, your virtual assistant.<br><br>
                            How may I assist you today?
                        </div>
                    </div>
                </div>
                
                <div class="egungun-ai-input-area" id="egungunAiInputArea">
                    <input type="text" class="egungun-ai-input" id="egungunAiInput" placeholder="Type your message..." autocomplete="off">
                    <button class="egungun-ai-send" id="egungunAiSend">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Insert widget into page
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // State
    let hasResponded = false;
    let isTyping = false;

    // DOM Elements
    const bubble = document.getElementById('egungunAiBubble');
    const windowEl = document.getElementById('egungunAiWindow');
    const closeBtn = document.getElementById('egungunAiClose');
    const messagesContainer = document.getElementById('egungunAiMessages');
    const inputArea = document.getElementById('egungunAiInputArea');
    const input = document.getElementById('egungunAiInput');
    const sendBtn = document.getElementById('egungunAiSend');
    const welcomeMsg = document.getElementById('welcomeMessage');

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
        const emailUrl = `mailto:${CONFIG.REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = emailUrl;
    }

    async function typeMessage(text, showButtons = true) {
        if (isTyping) return;
        isTyping = true;
        
        // Remove welcome message if it exists
        if (welcomeMsg && welcomeMsg.parentNode) {
            welcomeMsg.remove();
        }
        
        // Show typing indicator
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'message-wrapper message-ai-wrapper';
        typingWrapper.innerHTML = `
            <div class="message-avatar">
                <img src="${AVATAR_SVG}" alt="Egungun AI">
            </div>
            <div class="typing-indicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="typing-text">Egungun AI is typing...</span>
            </div>
        `;
        messagesContainer.appendChild(typingWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 1800));
        typingWrapper.remove();

        // Create message bubble
        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper message-ai-wrapper';
        const msgId = 'msg-' + Date.now();
        messageWrapper.innerHTML = `
            <div class="message-avatar">
                <img src="${AVATAR_SVG}" alt="Egungun AI">
            </div>
            <div class="message-bubble" id="${msgId}"></div>
        `;
        messagesContainer.appendChild(messageWrapper);
        
        const messageBubble = document.getElementById(msgId);
        let currentText = '';
        
        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            messageBubble.innerHTML = currentText + '<span style="opacity:0.4;">|</span>';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, CONFIG.TYPING_DELAY));
        }
        
        messageBubble.innerHTML = currentText;
        
        // Add action buttons
        if (showButtons) {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-group';
            buttonDiv.innerHTML = `
                <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="rate-card-link">📄 View Rate Card</a>
                <a href="${CONFIG.CONTACT_URL}" target="_blank" class="contact-link">📞 Contact Page</a>
                <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hi%20Egungun%20Of%20Africa%2C%20I'm%20interested%20in%20your%20services" target="_blank" class="whatsapp-link">
                    💬 WhatsApp
                </a>
            `;
            messageBubble.appendChild(buttonDiv);
            
            const emailHint = document.createElement('div');
            emailHint.className = 'email-highlight';
            emailHint.innerHTML = `✉️ ${CONFIG.REPORT_EMAIL}`;
            messageBubble.appendChild(emailHint);
        }
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        isTyping = false;
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-wrapper message-user-wrapper';
        const safeMessage = message.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
        messageDiv.innerHTML = `<div class="message-bubble">${safeMessage}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserMessage() {
        const userMessage = input.value.trim();
        if (userMessage === '' || isTyping) return;
        
        addUserMessage(userMessage);
        sendToEmail(userMessage);
        input.value = '';
        
        if (hasResponded) {
            const reminderMsg = `Thank you for your follow-up. For all booking inquiries, please email ${CONFIG.REPORT_EMAIL} or use the buttons above.`;
            typeMessage(reminderMsg, true);
        } else {
            typeMessage(CONFIG.AI_RESPONSE_TEXT, true);
            hasResponded = true;
            
            if (CONFIG.AUTO_CLOSE_INPUT) {
                inputArea.classList.add('hidden');
            }
        }
    }

    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(event) {
        const chatContainer = document.querySelector('.egungun-ai-chat');
        if (!chatContainer) return;
        const isClickInside = chatContainer.contains(event.target);
        if (!isClickInside && windowEl.classList.contains('active')) {
            closeChat();
        }
    });

    // Load Font Awesome if not present
    if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fa6"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    console.log('Egungun AI Chat Widget loaded successfully');
})();
