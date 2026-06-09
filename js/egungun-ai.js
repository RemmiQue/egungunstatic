// ==============================================
// EGUNGUN AI CHAT WIDGET - FINAL FIXED VERSION
// Fully Responsive | WhatsApp Working | Avatar Fixed | No Font Breaking
// Version: 3.0 | Last Updated: 2025
// ==============================================

(function() {
    'use strict';

    // ==============================================
    // CONFIGURATION - ALL SETTINGS IN ONE PLACE
    // ==============================================
    const CONFIG = {
        // Contact Information
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        WHATSAPP_NUMBER: '27655365284',
        
        // Page URLs
        RATE_CARD_URL: 'ratecard.html',
        CONTACT_URL: 'contact.html',
        
        // WhatsApp Prefilled Message
        WHATSAPP_PREFILLED_MSG: 'Hi Egungun Of Lagos, I am interested in your services. Please can you provide more information?',
        
        // AI Response Message
        AI_RESPONSE_TEXT: `Thank you for reaching out to Egungun of Africa.\n\nYour message has been received. Our team will respond within 24 hours.\n\nFor booking inquiries, please email:\nbookings@egungunofafrica.com\n\nOr use the buttons below to connect with us.`,
        
        // Animation Settings
        TYPING_DELAY: 25,
        CLOSE_DELAY: 4000,
        AUTO_CLOSE_AFTER_MESSAGE: true
    };

    // State variables
    let hasResponded = false;
    let isTyping = false;
    let closeTimeout = null;

    // ==============================================
    // CHAT WIDGET HTML
    // ==============================================
    const chatHTML = `
        <style>
            /* ==============================================
               CHAT WIDGET - FULLY RESPONSIVE
               Fixed font breaking | No text overflow
            ============================================== */
            
            /* Main Container */
            .egungun-ai-chat {
                position: fixed;
                bottom: max(20px, env(safe-area-inset-bottom, 20px));
                right: max(20px, env(safe-area-inset-right, 20px));
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            /* Animated Chat Bubble */
            .egungun-ai-bubble {
                width: clamp(50px, 13vw, 56px);
                height: clamp(50px, 13vw, 56px);
                background: #000000;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                position: relative;
                border: 2px solid #ffffff;
                animation: bubblePulse 2s ease-in-out infinite;
            }

            @keyframes bubblePulse {
                0%, 100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
                50% { transform: scale(1.03); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
            }

            .egungun-ai-bubble:hover {
                transform: scale(1.08);
                animation: none;
            }

            .egungun-ai-bubble-icon {
                width: clamp(22px, 6vw, 26px);
                height: clamp(22px, 6vw, 26px);
                fill: #ffffff;
            }

            .ai-badge {
                position: absolute;
                top: -4px;
                right: -4px;
                background: #ffffff;
                color: #000000;
                font-size: 8px;
                font-weight: 800;
                padding: 2px 5px;
                border-radius: 10px;
                font-family: monospace;
                border: 1px solid #000000;
            }

            /* Chat Window */
            .egungun-ai-window {
                position: absolute;
                bottom: calc(clamp(50px, 13vw, 56px) + 16px);
                right: 0;
                width: min(380px, calc(100vw - 30px));
                max-width: 380px;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 20px;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.96);
                transition: all 0.3s ease;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }

            .egungun-ai-window.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }

            /* Header */
            .egungun-ai-header {
                background: #000000;
                padding: 14px 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-bottom: 1px solid #333333;
            }

            .egungun-ai-avatar {
                width: clamp(38px, 10vw, 42px);
                height: clamp(38px, 10vw, 42px);
                min-width: clamp(38px, 10vw, 42px);
                border-radius: 50%;
                overflow: hidden;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ffffff;
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
                font-size: clamp(0.85rem, 4vw, 0.95rem);
                font-weight: 700;
                color: #ffffff;
                margin: 0;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background: #00c853;
                border-radius: 50%;
                display: inline-block;
                margin-right: 6px;
                animation: statusPulse 1.5s infinite;
            }

            @keyframes statusPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .egungun-ai-info p {
                font-size: clamp(0.6rem, 3vw, 0.65rem);
                color: #aaaaaa;
                margin: 4px 0 0;
            }

            .egungun-ai-close {
                background: transparent;
                border: 1px solid #333333;
                color: #ffffff;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                font-size: 14px;
                font-family: monospace;
                flex-shrink: 0;
            }

            .egungun-ai-close:hover {
                background: rgba(255,255,255,0.1);
                border-color: #ffffff;
            }

            /* Messages Area - FIXED FONT BREAKING */
            .egungun-ai-messages {
                height: clamp(320px, 50vh, 380px);
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                background: #ffffff;
            }

            /* Message Wrappers - FIXED TEXT WRAPPING */
            .message-wrapper {
                display: flex;
                gap: 10px;
                align-items: flex-start;
                max-width: 100%;
                animation: messageFadeIn 0.3s ease-out;
            }

            @keyframes messageFadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .message-avatar {
                width: clamp(28px, 8vw, 32px);
                height: clamp(28px, 8vw, 32px);
                min-width: clamp(28px, 8vw, 32px);
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
                background: #f0f0f0;
            }

            .message-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* FIXED: Proper text wrapping - no overflow */
            .message-bubble {
                max-width: calc(100% - 42px);
                padding: 10px 14px;
                border-radius: 18px;
                font-size: clamp(0.75rem, 3.5vw, 0.8rem);
                line-height: 1.5;
                word-wrap: break-word;
                word-break: break-word;
                white-space: normal;
                overflow-wrap: break-word;
                display: inline-block;
            }

            /* AI Message Style */
            .message-ai-wrapper {
                align-self: flex-start;
            }

            .message-ai-wrapper .message-bubble {
                background: #f0f0f0;
                color: #1a1a1a;
                border-bottom-left-radius: 4px;
            }

            /* User Message Style - FIXED TEXT ALIGNMENT */
            .message-user-wrapper {
                align-self: flex-end;
                justify-content: flex-end;
            }

            .message-user-wrapper .message-bubble {
                background: #000000;
                color: #ffffff;
                border-bottom-right-radius: 4px;
                max-width: 85%;
                text-align: left;
            }

            /* Typing Indicator */
            .typing-indicator {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 14px;
                background: #f0f0f0;
                border-radius: 18px;
                border-bottom-left-radius: 4px;
                width: fit-content;
            }

            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }

            .typing-dots span {
                width: 7px;
                height: 7px;
                background: #888888;
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
                color: #666666;
            }

            /* Input Area */
            .egungun-ai-input-area {
                display: flex;
                padding: 12px;
                background: #ffffff;
                border-top: 1px solid #e0e0e0;
                gap: 8px;
            }

            .egungun-ai-input-area.hidden {
                display: none;
            }

            .egungun-ai-input {
                flex: 1;
                background: #f5f5f5;
                border: 1px solid #e0e0e0;
                border-radius: 25px;
                padding: 10px 16px;
                color: #1a1a1a;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: clamp(0.75rem, 3.5vw, 0.8rem);
                outline: none;
            }

            .egungun-ai-input:focus {
                border-color: #000000;
                background: #ffffff;
            }

            .egungun-ai-send {
                background: #000000;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .egungun-ai-send:hover {
                transform: scale(1.05);
                background: #333333;
            }

            .egungun-ai-send:active {
                transform: scale(0.95);
            }

            .egungun-ai-send svg {
                width: 16px;
                height: 16px;
                fill: #ffffff;
            }

            /* Button Group - NO HOME BUTTON */
            .button-group {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
                justify-content: center;
            }

            .chat-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 7px 14px;
                border-radius: 25px;
                font-size: clamp(0.65rem, 3vw, 0.7rem);
                font-weight: 600;
                transition: all 0.2s ease;
                text-decoration: none;
                cursor: pointer;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-align: center;
            }

            .chat-btn-rate {
                background: #000000;
                color: #ffffff;
                border: none;
            }

            .chat-btn-rate:hover {
                background: #333333;
                transform: translateY(-1px);
            }

            .chat-btn-contact {
                background: transparent;
                color: #1a1a1a;
                border: 1px solid #cccccc;
            }

            .chat-btn-contact:hover {
                background: #f5f5f5;
                border-color: #000000;
                transform: translateY(-1px);
            }

            .chat-btn-whatsapp {
                background: #25D366;
                color: #ffffff;
                border: none;
            }

            .chat-btn-whatsapp:hover {
                background: #128C7E;
                transform: translateY(-1px);
            }

            /* Email Highlight */
            .email-highlight {
                display: inline-block;
                background: #f0f0f0;
                color: #000000;
                padding: 4px 10px;
                border-radius: 6px;
                font-family: monospace;
                font-size: clamp(0.7rem, 3vw, 0.75rem);
                margin: 6px 0;
                word-break: break-all;
                border: 1px solid #e0e0e0;
            }

            /* Scrollbar */
            .egungun-ai-messages::-webkit-scrollbar {
                width: 4px;
            }
            .egungun-ai-messages::-webkit-scrollbar-track {
                background: #f0f0f0;
                border-radius: 10px;
            }
            .egungun-ai-messages::-webkit-scrollbar-thumb {
                background: #cccccc;
                border-radius: 10px;
            }
            .egungun-ai-messages::-webkit-scrollbar-thumb:hover {
                background: #999999;
            }

            /* Responsive Breakpoints */
            @media (max-width: 500px) {
                .egungun-ai-window {
                    width: calc(100vw - 30px);
                    right: -5px;
                    bottom: calc(clamp(50px, 13vw, 56px) + 12px);
                }
                .egungun-ai-messages {
                    height: 350px;
                }
                .button-group {
                    gap: 6px;
                }
                .chat-btn {
                    padding: 5px 10px;
                    flex: 1;
                }
            }

            @media (max-width: 400px) {
                .button-group {
                    flex-direction: column;
                }
                .chat-btn {
                    width: 100%;
                }
                .message-bubble {
                    max-width: calc(100% - 36px);
                }
            }

            @media (min-width: 1200px) {
                .egungun-ai-window {
                    width: 380px;
                    right: 0;
                }
            }

            /* Safe area support for notched phones */
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
                    <path d="M7 9h10v2H7zm0 4h7v2H7z"/>
                </svg>
                <span class="ai-badge">AI</span>
            </div>
            
            <div class="egungun-ai-window" id="egungunAiWindow">
                <div class="egungun-ai-header">
                    <div class="egungun-ai-avatar">
                        <img id="aiAvatarImage" src="images/egungun-avatar.jpeg" alt="Egungun AI">
                    </div>
                    <div class="egungun-ai-info">
                        <h4><span class="status-dot"></span> Egungun AI</h4>
                        <p>Virtual Assistant | Online</p>
                    </div>
                    <button class="egungun-ai-close" id="egungunAiClose">✕</button>
                </div>
                
                <div class="egungun-ai-messages" id="egungunAiMessages">
                    <div class="message-wrapper message-ai-wrapper">
                        <div class="message-avatar">
                            <img src="images/egungun-avatar.jpeg" alt="Egungun AI">
                        </div>
                        <div class="message-bubble">
                            Welcome to Egungun of Africa.<br><br>
                            I am your virtual assistant. How may I help you today?
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

    // ==============================================
    // INITIALIZE CHAT WIDGET
    // ==============================================
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // ==============================================
    // DOM ELEMENTS
    // ==============================================
    const bubble = document.getElementById('egungunAiBubble');
    const windowEl = document.getElementById('egungunAiWindow');
    const closeBtn = document.getElementById('egungunAiClose');
    const messagesContainer = document.getElementById('egungunAiMessages');
    const inputArea = document.getElementById('egungunAiInputArea');
    const input = document.getElementById('egungunAiInput');
    const sendBtn = document.getElementById('egungunAiSend');

    // ==============================================
    // AVATAR IMAGE FIX
    // ==============================================
    function fixAvatarImages() {
        const allAvatars = document.querySelectorAll('.message-avatar img, #aiAvatarImage');
        allAvatars.forEach(img => {
            if (!img.complete || (img.naturalWidth === 0 && img.naturalHeight === 0)) {
                img.src = 'images/egungun-avatar.jpeg';
                img.onerror = function() {
                    this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23000000\'/%3E%3Ccircle cx=\'50\' cy=\'45\' r=\'20\' fill=\'%23ffffff\'/%3E%3Cpath d=\'M30 70 L70 70 L65 85 L35 85 Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E';
                };
            }
        });
    }
    
    fixAvatarImages();
    
    const avatarObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                fixAvatarImages();
            }
        });
    });
    avatarObserver.observe(document.body, { childList: true, subtree: true });

    // ==============================================
    // CORE FUNCTIONS
    // ==============================================
    function openChat() {
        windowEl.classList.add('active');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    function closeChat() {
        windowEl.classList.remove('active');
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
    }

    function autoCloseChat() {
        if (CONFIG.AUTO_CLOSE_AFTER_MESSAGE) {
            closeTimeout = setTimeout(() => {
                closeChat();
            }, CONFIG.CLOSE_DELAY);
        }
    }

    // ==============================================
    // EMAIL NOTIFICATION
    // ==============================================
    function sendToEmail(userMessage) {
        const subject = `Egungun AI Chat - New Inquiry`;
        const body = `New message from Egungun AI chat widget:%0A%0AUser Message: ${encodeURIComponent(userMessage)}%0A%0APage: ${encodeURIComponent(window.location.href)}%0ATimestamp: ${new Date().toLocaleString()}`;
        window.location.href = `mailto:${CONFIG.REPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    }

    // ==============================================
    // TYPING ANIMATION & AI RESPONSE
    // ==============================================
    async function typeMessage(text, container, showButtons = true) {
        isTyping = true;
        
        const typingWrapper = document.createElement('div');
        typingWrapper.className = 'message-wrapper message-ai-wrapper';
        typingWrapper.innerHTML = `
            <div class="message-avatar">
                <img src="images/egungun-avatar.jpeg" alt="Egungun AI">
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
        container.appendChild(typingWrapper);
        container.scrollTop = container.scrollHeight;

        await new Promise(resolve => setTimeout(resolve, 1500));
        typingWrapper.remove();

        const messageWrapper = document.createElement('div');
        messageWrapper.className = 'message-wrapper message-ai-wrapper';
        messageWrapper.innerHTML = `
            <div class="message-avatar">
                <img src="images/egungun-avatar.jpeg" alt="Egungun AI">
            </div>
            <div class="message-bubble" id="typingMsg-${Date.now()}"></div>
        `;
        container.appendChild(messageWrapper);
        
        const messageBubble = messageWrapper.querySelector('.message-bubble');
        let currentText = '';
        
        for (let i = 0; i < text.length; i++) {
            currentText += text[i];
            messageBubble.innerHTML = currentText.replace(/\n/g, '<br>') + '<span style="opacity:0.5;">|</span>';
            container.scrollTop = container.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, CONFIG.TYPING_DELAY));
        }
        
        messageBubble.innerHTML = text.replace(/\n/g, '<br>');
        
        if (showButtons) {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-group';
            buttonDiv.innerHTML = `
                <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="chat-btn chat-btn-rate">View Rate Card</a>
                <a href="${CONFIG.CONTACT_URL}" target="_blank" class="chat-btn chat-btn-contact">Contact Page</a>
                <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_PREFILLED_MSG)}" target="_blank" class="chat-btn chat-btn-whatsapp">WhatsApp</a>
            `;
            messageBubble.appendChild(buttonDiv);
        }
        
        const emailSpan = document.createElement('div');
        emailSpan.style.marginTop = '12px';
        emailSpan.innerHTML = '<span class="email-highlight">bookings@egungunofafrica.com</span>';
        messageBubble.appendChild(emailSpan);
        
        container.scrollTop = container.scrollHeight;
        isTyping = false;
    }

    // ==============================================
    // USER MESSAGE HANDLING - FIXED TEXT DISPLAY
    // ==============================================
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-wrapper message-user-wrapper';
        
        // Properly escape and display message
        const safeMessage = message.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
        
        // Create bubble with proper text handling
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = safeMessage;
        
        messageDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function handleUserMessage() {
        const userMessage = input.value.trim();
        if (userMessage === '') return;
        if (isTyping) return;
        
        // Add user message to chat
        addUserMessage(userMessage);
        
        // Send email notification
        sendToEmail(userMessage);
        
        // Show AI response
        await typeMessage(CONFIG.AI_RESPONSE_TEXT, messagesContainer, true);
        
        // Clear input
        input.value = '';
        
        // Hide input area - no more typing after 1 message
        inputArea.classList.add('hidden');
        
        // Auto close chat after delay
        autoCloseChat();
    }

    // ==============================================
    // EVENT LISTENERS
    // ==============================================
    bubble.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', handleUserMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = bubble.contains(event.target) || windowEl.contains(event.target);
        if (!isClickInside && windowEl.classList.contains('active')) {
            closeChat();
        }
    });

    console.log('Egungun AI Chat Widget - Final Version Loaded');
    console.log('WhatsApp: +' + CONFIG.WHATSAPP_NUMBER);
    console.log('Email: ' + CONFIG.REPORT_EMAIL);
})();