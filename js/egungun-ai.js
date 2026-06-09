(function() {
    'use strict';

    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        WHATSAPP_NUMBER: '27655365284',
        RATE_CARD_URL: 'ratecard.html',
        CONTACT_URL: 'contact.html',
        AVATAR_SRC: 'images/egungun-avatar.jpeg',
        WHATSAPP_PREFILLED_MSG: 'Hi Egungun Of Lagos, I am interested in your services.',
        AI_RESPONSE_TEXT: "Hello! I am your Egungun AI assistant. How can I assist you with your booking today?"
    };

    const chatHTML = `
    <style>
        .eg-chat * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .eg-chat { position: fixed; bottom: 20px; right: 20px; z-index: 999999; }

        /* Bubble */
        .eg-bubble { width: 65px; height: 65px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.3); border: 2px solid #fff; transition: transform 0.3s ease; }
        .eg-bubble img { width: 65%; height: 65%; object-fit: contain; }

        /* Window */
        .eg-win { width: 360px; height: 550px; background: #fff; position: absolute; bottom: 85px; right: 0; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); overflow: hidden; display: flex; flex-direction: column; opacity: 0; visibility: hidden; transform: translateY(20px); transition: all 0.3s ease; }
        .eg-win.active { opacity: 1; visibility: visible; transform: translateY(0); }

        /* Header */
        .eg-head { background: #000; padding: 20px; display: flex; align-items: center; gap: 12px; }
        .eg-head-avatar { width: 45px; height: 45px; border-radius: 50%; background: #fff; overflow: hidden; border: 2px solid #333; }
        .eg-head-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .eg-head h3 { color: #fff; margin: 0; font-size: 16px; }

        /* Messages */
        .eg-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: #fafafa; }
        .msg { padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5; max-width: 90%; }
        .msg.ai { background: #fff; align-self: flex-start; border-bottom-left-radius: 4px; border: 1px solid #eee; }
        .msg.user { background: #000; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
        
        /* Action Buttons */
        .eg-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
        .eg-btn { padding: 10px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; font-size: 13px; transition: 0.2s; }
        .btn-rate { background: #000; color: #fff; }
        .btn-wa { background: #25D366; color: #fff; }
        .btn-email { background: #eee; color: #333; }

        /* Input */
        .eg-input-area { padding: 15px; border-top: 1px solid #eee; display: flex; gap: 8px; background: #fff; }
        .eg-input { flex: 1; border: 1px solid #ddd; padding: 10px 15px; border-radius: 20px; outline: none; }
        .eg-send { background: #000; color: #fff; border: none; padding: 0 20px; border-radius: 20px; cursor: pointer; }

        @media (max-width: 480px) { .eg-win { width: 95vw; height: 75vh; right: -5px; } }
    </style>

    <div class="eg-chat">
        <div class="eg-bubble" id="eg-bubble">
            <img src="${CONFIG.AVATAR_SRC}" alt="Avatar">
        </div>
        <div class="eg-win" id="eg-win">
            <div class="eg-head">
                <div class="eg-head-avatar"><img src="${CONFIG.AVATAR_SRC}" alt="Avatar"></div>
                <h3>Egungun AI</h3>
            </div>
            <div class="eg-body" id="eg-body">
                <div class="msg ai">${CONFIG.AI_RESPONSE_TEXT}</div>
                <div id="eg-controls" class="eg-actions" style="display:none;">
                    <a href="${CONFIG.RATE_CARD_URL}" class="eg-btn btn-rate">View Rate Card</a>
                    <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_PREFILLED_MSG)}" class="eg-btn btn-wa">WhatsApp Us</a>
                    <a href="mailto:${CONFIG.REPORT_EMAIL}" class="eg-btn btn-email">Email: ${CONFIG.REPORT_EMAIL}</a>
                </div>
            </div>
            <div class="eg-input-area">
                <input type="text" class="eg-input" id="eg-input" placeholder="Type a message...">
                <button class="eg-send" id="eg-send">➤</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const bubble = document.getElementById('eg-bubble');
    const win = document.getElementById('eg-win');
    const input = document.getElementById('eg-input');
    const send = document.getElementById('eg-send');
    const body = document.getElementById('eg-body');
    const controls = document.getElementById('eg-controls');

    bubble.onclick = () => win.classList.add('active');
    document.addEventListener('click', (e) => { if (!e.target.closest('.eg-chat')) win.classList.remove('active'); });

    send.onclick = () => {
        if (!input.value.trim()) return;
        body.innerHTML += `<div class="msg user">${input.value}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;
        
        // AI Response Logic
        setTimeout(() => {
            controls.style.display = 'flex';
            body.scrollTop = body.scrollHeight;
        }, 600);
    };
})();
