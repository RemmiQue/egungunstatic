(function() {
    'use strict';

    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        WHATSAPP_NUMBER: '27655365284',
        RATE_CARD_URL: 'ratecard.html',
        CONTACT_URL: 'contact.html',
        WHATSAPP_PREFILLED_MSG: 'Hi Egungun Of Lagos, I am interested in your services.',
        AI_RESPONSE_TEXT: "Thank you for reaching out to Egungun of Africa.\n\nYour message has been received. Our team will respond within 24 hours.",
        CLOSE_DELAY: 4000
    };

    const styles = `
        .egungun-widget * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .egungun-widget { position: fixed; bottom: 20px; right: 20px; z-index: 999999; }
        
        /* Bubble */
        .egungun-bubble { width: 60px; height: 60px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .egungun-bubble:hover { transform: scale(1.1); }
        
        /* Window */
        .egungun-window { width: 360px; max-width: 90vw; height: 500px; max-height: 80vh; background: #fff; position: absolute; bottom: 80px; right: 0; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); display: flex; flex-direction: column; overflow: hidden; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.3s ease; }
        .egungun-window.is-open { opacity: 1; visibility: visible; transform: translateY(0); }
        
        /* Header */
        .egungun-header { background: #000; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .egungun-header h3 { margin: 0; font-size: 16px; }
        
        /* Chat Body */
        .egungun-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        .msg { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.4; }
        .msg.ai { background: #f4f4f4; align-self: flex-start; border-bottom-left-radius: 4px; }
        .msg.user { background: #000; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
        
        /* Footer */
        .egungun-footer { padding: 15px; border-top: 1px solid #eee; display: flex; gap: 10px; }
        .egungun-input { flex: 1; border: 1px solid #ddd; padding: 10px 15px; border-radius: 20px; outline: none; }
        .egungun-btn { background: #000; color: #fff; border: none; padding: 0 20px; border-radius: 20px; cursor: pointer; }
        
        @media (max-width: 480px) { .egungun-window { width: 100vw; right: -20px; bottom: 80px; border-radius: 20px 20px 0 0; } }
    `;

    const widgetHTML = `
        <div class="egungun-widget">
            <style>${styles}</style>
            <div class="egungun-bubble" id="eg-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div class="egungun-window" id="eg-window">
                <div class="egungun-header"><h3>Chat with Egungun</h3></div>
                <div class="egungun-body" id="eg-body">
                    <div class="msg ai">Welcome to Egungun of Africa. How can we help you?</div>
                </div>
                <div class="egungun-footer" id="eg-footer">
                    <input type="text" class="egungun-input" placeholder="Type your message..." id="eg-input">
                    <button class="egungun-btn" id="eg-send">Send</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Functionality
    const toggle = document.getElementById('eg-toggle');
    const windowEl = document.getElementById('eg-window');
    const send = document.getElementById('eg-send');
    const input = document.getElementById('eg-input');
    const body = document.getElementById('eg-body');

    toggle.onclick = () => windowEl.classList.toggle('is-open');

    send.onclick = () => {
        if (!input.value.trim()) return;
        body.innerHTML += `<div class="msg user">${input.value}</div>`;
        body.innerHTML += `<div class="msg ai">${CONFIG.AI_RESPONSE_TEXT}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;
        document.getElementById('eg-footer').style.display = 'none';
    };
})();
