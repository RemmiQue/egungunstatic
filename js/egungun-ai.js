(function() {
    'use strict';

    // ==============================================
    // CONFIGURATION
    // ==============================================
    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        WHATSAPP_NUMBER: '27655365284',
        RATE_CARD_URL: 'ratecard.html',
        CONTACT_URL: 'contact.html',
        AVATAR_SRC: 'images/egungun-avatar.jpeg', // Standardized path
        WHATSAPP_PREFILLED_MSG: 'Hi Egungun Of Lagos, I am interested in your services.',
        AI_RESPONSE_TEXT: "Thank you for reaching out to Egungun of Africa.\n\nYour message has been received. Our team will respond within 24 hours.",
        CLOSE_DELAY: 4000
    };

    // ==============================================
    // REDESIGNED STYLES (Mobile First)
    // ==============================================
    const chatHTML = `
    <style>
        .egungun-container * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .egungun-container { position: fixed; bottom: 20px; right: 20px; z-index: 999999; }

        /* Bubble */
        .egungun-bubble { width: 60px; height: 60px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: transform 0.3s ease; }
        .egungun-bubble:hover { transform: scale(1.05); }

        /* Window */
        .egungun-window { width: 350px; height: 500px; background: #fff; position: absolute; bottom: 75px; right: 0; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); overflow: hidden; display: flex; flex-direction: column; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.3s ease; }
        .egungun-window.active { opacity: 1; visibility: visible; transform: translateY(0); }

        /* Header */
        .egungun-header { background: #000; padding: 15px 20px; display: flex; align-items: center; gap: 12px; }
        .egungun-avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #fff; overflow: hidden; }
        .egungun-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .egungun-header-info { color: #fff; }
        .egungun-header-info h4 { margin: 0; font-size: 14px; }
        .egungun-header-info p { margin: 0; font-size: 10px; opacity: 0.8; }

        /* Body */
        .egungun-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        .msg { max-width: 80%; padding: 10px 14px; border-radius: 15px; font-size: 13px; line-height: 1.4; }
        .msg.ai { background: #f0f0f0; align-self: flex-start; border-bottom-left-radius: 4px; }
        .msg.user { background: #000; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }

        /* Footer */
        .egungun-input-area { padding: 15px; border-top: 1px solid #eee; display: flex; gap: 8px; }
        .egungun-input { flex: 1; border: 1px solid #ddd; padding: 8px 15px; border-radius: 20px; outline: none; font-size: 13px; }
        .egungun-send { background: #000; color: #fff; border: none; padding: 0 15px; border-radius: 20px; cursor: pointer; }

        @media (max-width: 480px) {
            .egungun-window { width: 95vw; height: 70vh; right: -10px; }
        }
    </style>

    <div class="egungun-container">
        <div class="egungun-bubble" id="eg-bubble">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <div class="egungun-window" id="eg-window">
            <div class="egungun-header">
                <div class="egungun-avatar"><img src="${CONFIG.AVATAR_SRC}" alt="Avatar"></div>
                <div class="egungun-header-info">
                    <h4>Egungun AI</h4>
                    <p>Online</p>
                </div>
            </div>
            <div class="egungun-messages" id="eg-messages">
                <div class="msg ai">Welcome to Egungun of Africa. How can I help you today?</div>
            </div>
            <div class="egungun-input-area" id="eg-input-area">
                <input type="text" class="egungun-input" id="eg-input" placeholder="Type a message...">
                <button class="egungun-send" id="eg-send">Send</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // ==============================================
    // LOGIC & ACTIONS
    // ==============================================
    const bubble = document.getElementById('eg-bubble');
    const windowEl = document.getElementById('eg-window');
    const input = document.getElementById('eg-input');
    const sendBtn = document.getElementById('eg-send');
    const messages = document.getElementById('eg-messages');

    bubble.onclick = () => windowEl.classList.add('active');
    
    // Close logic
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.egungun-container')) windowEl.classList.remove('active');
    });

    sendBtn.onclick = () => {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        messages.innerHTML += `<div class="msg user">${text}</div>`;
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // AI Response
        setTimeout(() => {
            messages.innerHTML += `<div class="msg ai">${CONFIG.AI_RESPONSE_TEXT.replace(/\n/g, '<br>')}</div>`;
            messages.scrollTop = messages.scrollHeight;
            document.getElementById('eg-input-area').style.display = 'none';
        }, 800);
    };
})();
