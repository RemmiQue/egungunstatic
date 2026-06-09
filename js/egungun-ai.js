// ==============================================
// EGUNGUN AI CHAT WIDGET - CLEAN NO EMOJI VERSION
// Fully responsive | No avatars | Black & White
// ==============================================

(function() {
    'use strict';

    // Don't create duplicate widgets
    if (document.querySelector('.egungun-ai-chat')) return;

    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        RATE_CARD_URL: '/ratecard.html',
        CONTACT_URL: '/contact.html',
        WHATSAPP_NUMBER: '27655365284',
        AI_RESPONSE_TEXT: `Thank you for reaching out to Egungun of Africa.

All booking inquiries are handled through our dedicated channels:

Email: bookings@egungunofafrica.com
WhatsApp: Direct consultation
Rate Card: View our service catalog

Please use the buttons below to connect instantly.`,
        AUTO_CLOSE_INPUT: true,
        TYPING_DELAY: 35
    };

    const chatHTML = `
        <style>
            /* ==============================================
               CHAT WIDGET - NO EMOJI, NO AVATAR, BLACK & WHITE
               Fully responsive - works on all devices
            ============================================== */
            
            .egungun-ai-chat {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            /* Chat Bubble - Clean circle */
            .egungun-ai-bubble {
                width: 56px;
                height: 56px;
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
                width: 28px;
                height: 28px;
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
                bottom: 72px;
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

            /* Header - No Avatar */
            .egungun-ai-header {
                background: #ffffff;
                padding: 16px 18px;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .egungun-ai-info {
                flex: 1;
                min-width: 0;
            }

            .egungun-ai-info h4 {
                font-size: 1rem;
                font-weight: 700;
                color: #000000;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .egungun-ai-info p {
                font-size: 0.7rem;
                color: #666666;
                margin: 4px 0 0;
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
                font-size: 20px;
                padding: 0 8px;
                transition: color 0.2s;
                flex-shrink: 0;
            }

            .egungun-ai-close:hover {
                color: #000000;
            }

            /* Messages Area */
            .egungun-ai-messages {
                height: 400px;
                overflow-y: auto;
                padding: 18px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #0a0a0a;
            }

            /* Responsive message height */
            @media (max-height: 700px) {
                .egungun-ai-messages {
                    height: 320px;
                }
            }

            @media (max-height: 600px) {
                .egungun-ai-messages {
                    height: 280px;
                }
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

            /* Message Wrappers - No Avatars */
            .message-wrapper {
                display: flex;
                align-items: flex-start;
                max-width: 100%;
            }

            .message-bubble {
                max-width: 85%;
                padding: 10px 16px;
                border-radius: 18px;
                font-size: 0.85rem;
                line-height: 1.5;
                word-wrap: break-word;
                overflow-wrap: break-word;
            }

            .message-ai-wrapper {
                justify-content: flex-start;
            }

            .message-ai-wrapper .message-bubble {
                background: #1a1a1a;
                color: #e0e0e0;
                border-bottom-left-radius: 4px;
            }

            .message-user-wrapper {
                justify-content: flex-end;
            }

            .message-user-wrapper .message-bubble {
                background: #ffffff;
                color: #000000;
                border-bottom-right-radius: 4px;
            }

            /* Typing Indicator - No Avatar */
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 16px;
                background: #1a1a1a;
                border-radius: 18px;
                border-bottom-left-radius: 4px;
                width: fit-content;
            }

            .typing-dots {
                display: flex;
                gap: 5px;
                align-items: center;
            }

            .typing-dots span {
                width: 7px;
                height: 7px;
                background: #888;
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }

            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-6px); opacity: 1; }
            }

            .typing-text {
                font-size: 0.75rem;
                color: #aaa;
            }

            /* Input Area */
            .egungun-ai-input-area {
                display: flex;
                padding: 14px;
                background: #111111;
                border-top: 1px solid rgba(255,255,255,0.05);
                gap: 10px;
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
                padding: 11px 16px;
                color: #ffffff;
                font-family: inherit;
                font-size: 0.85rem;
                outline: none;
                min-width: 0;
            }

            .egungun-ai-input:focus {
                border-color: #ffffff;
            }

            .egungun-ai-input::placeholder {
                color: #666;
            }

            .egungun-ai-send {
                background: #ffffff;
                border: none;
                border-radius: 50%;
                width: 42px;
                height: 42px;
                min-width: 42px;
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
                width: 18px;
                height: 18px;
                fill: #000000;
            }

            /* Action Buttons - Clean Text Only */
            .button-group {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 16px;
            }

            .rate-card-link, .contact-link, .whatsapp-link {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 8px 16px;
                border-radius: 25px;
                font-size: 0.75rem;
                font-weight: 600;
                transition: all 0.2s ease;
                text-decoration: none;
                cursor: pointer;
                letter-spacing: 0.3px;
            }

            .rate-card-link {
                background: #ffffff;
                color: #000000;
            }

            .rate-card-link:hover {
                background: #e0e0e0;
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
                color: #aaaaaa;
                font-weight: 400;
                background: rgba(255,255,255,0.05);
                padding: 6px 12px;
                border-radius: 20px;
                display: inline-block;
                margin-top: 12px;
                font-size: 0.7rem;
                word-break: break-all;
                font-family: monospace;
            }

            /* ==============================================
               RESPONSIVE DESIGN - ALL DEVICES
            ============================================== */
            
            /* Tablet and small desktop */
            @media (max-width: 768px) {
                .egungun-ai-window {
                    width: 360px;
                }
                
                .message-bubble {
                    font-size: 0.8rem;
                    padding: 9px 14px;
                }
                
                .button-group {
                    gap: 8px;
                }
                
                .rate-card-link, .contact-link, .whatsapp-link {
                    padding: 6px 14px;
                    font-size: 0.7rem;
                }
            }

            /* Mobile phones */
            @media (max-width: 480px) {
                .egungun-ai-chat {
                    bottom: 16px;
                    right: 16px;
                }
                
                .egungun-ai-bubble {
                    width: 52px;
                    height: 52px;
                }
                
                .egungun-ai-bubble-icon {
                    width: 24px;
                    height: 24px;
                }
                
                .egungun-ai-window {
                    width: calc(100vw - 24px);
                    right: -8px;
                    bottom: 68px;
                    border-radius: 20px;
                }
                
                .egungun-ai-messages {
                    padding: 14px;
                    gap: 10px;
                }
                
                .message-bubble {
                    max-width: 90%;
                    font-size: 0.75rem;
                    padding: 8px 12px;
                }
                
                .egungun-ai-header {
                    padding: 12px 14px;
                }
                
                .egungun-ai-info h4 {
                    font-size: 0.9rem;
                }
                
                .egungun-ai-info p {
                    font-size: 0.6rem;
                }
                
                .typing-indicator {
                    padding: 8px 12px;
                }
                
                .typing-text {
                    font-size: 0.7rem;
                }
                
                .egungun-ai-input-area {
                    padding: 10px 12px;
                    gap: 8px;
                }
                
                .egungun-ai-input {
                    padding: 9px 14px;
                    font-size: 0.8rem;
                }
                
                .egungun-ai-send {
                    width: 38px;
                    height: 38px;
                    min-width: 38px;
                }
                
                .egungun-ai-send svg {
                    width: 16px;
                    height: 16px;
                }
                
                .button-group {
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .rate-card-link, .contact-link, .whatsapp-link {
                    flex: 1;
                    justify-content: center;
                    white-space: nowrap;
                }
            }

            /* Very small phones */
            @media (max-width: 380px) {
                .button-group {
                    flex-direction: column;
                }
                
                .rate-card-link, .contact-link, .whatsapp-link {
                    width: 100%;
                    white-space: normal;
                    text-align: center;
                }
                
                .message-bubble {
                    max-width: 95%;
                }
                
                .email-highlight {
                    font-size: 0.65rem;
                }
            }

            /* Large screens (desktop) */
            @media (min-width: 1200px) {
                .egungun-ai-window {
                    width: 400px;
                }
                
                .egungun-ai-messages {
                    height: 420px;
                }
                
                .message-bubble {
                    font-size: 0.85rem;
                }
            }

            /* Safe area for notched phones */
            @supports (padding: max(0px)) {
                .egungun-ai-chat {
                    bottom: max(16px, env(safe-area-inset-bottom, 16px));
                    right: max(16px, env(safe-area-inset-right, 16px));
                }
                
                .egungun-ai-window {
                    bottom: calc(72px + max(0px, env(safe-area-inset-bottom, 0px)));
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
                    <div class="egungun-ai-info">
                        <h4><span class="status-dot"></span>Egungun AI</h4>
                        <p>Online · Ready to assist</p>
                    </div>
                    <button class="egungun-ai-close" id="egungunAiClose">✕</button>
                </div>
                
                <div class="egungun-ai-messages" id="egungunAiMessages">
                    <div class="message-wrapper message-ai-wrapper" id="welcomeMessage">
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
        messageWrapper.innerHTML = `<div class="message-bubble" id="${msgId}"></div>`;
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
        
        // Add action buttons - no emojis, clean text
        if (showButtons) {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-group';
            buttonDiv.innerHTML = `
                <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="rate-card-link">Rate Card</a>
                <a href="${CONFIG.CONTACT_URL}" target="_blank" class="contact-link">Contact Page</a>
                <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hi%20Egungun%20Of%20Africa%2C%20I'm%20interested%20in%20your%20services" target="_blank" class="whatsapp-link">WhatsApp</a>
            `;
            messageBubble.appendChild(buttonDiv);
            
            const emailHint = document.createElement('div');
            emailHint.className = 'email-highlight';
            emailHint.innerHTML = CONFIG.REPORT_EMAIL;
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

    console.log('Egungun AI Chat Widget loaded successfully');
})();
