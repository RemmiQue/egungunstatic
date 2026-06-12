(function() {
    'use strict';

    if (document.querySelector('.egungun-ai-chat')) return;

    const CONFIG = {
        REPORT_EMAIL: 'bookings@egungunofafrica.com',
        RATE_CARD_URL: '/ratecard.html',
        CONTACT_URL: '/contact.html',
        WHATSAPP_NUMBER: '27655365284',
        AI_RESPONSE_TEXT: `Thank you for your message. All booking inquiries are handled through our dedicated channels below.`,
        AUTO_CLOSE_INPUT: true,
        TYPING_DELAY: 25
    };

    const chatHTML = `
        <style>
            *{margin:0;padding:0;box-sizing:border-box;}
            .egungun-ai-chat{position:fixed;bottom:24px;right:24px;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}
            .egungun-ai-bubble{width:56px;height:56px;background:#000;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:transform 0.25s ease,box-shadow 0.25s ease;border:1.5px solid #fff;position:relative;}
            .egungun-ai-bubble:hover{transform:scale(1.05);box-shadow:0 8px 28px rgba(0,0,0,0.2);}
            .egungun-ai-bubble-icon{width:26px;height:26px;fill:#fff;}
            .ai-badge{position:absolute;bottom:-2px;right:-2px;background:#fff;color:#000;font-size:8px;font-weight:700;padding:2px 6px;border-radius:12px;font-family:monospace;}
            .egungun-ai-window{position:absolute;bottom:72px;right:0;width:380px;max-width:calc(100vw - 32px);background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(20px) scale(0.96);transition:all 0.25s cubic-bezier(0.34,1.2,0.64,1);box-shadow:0 25px 50px rgba(0,0,0,0.3);}
            .egungun-ai-window.active{opacity:1;visibility:visible;transform:translateY(0) scale(1);pointer-events:all;}
            .egungun-ai-header{background:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eaeaea;}
            .egungun-ai-info h4{font-size:1rem;font-weight:600;color:#000;margin:0;}
            .egungun-ai-info p{font-size:0.7rem;color:#888;margin:4px 0 0;}
            .status-dot{width:8px;height:8px;background:#00c853;border-radius:50%;display:inline-block;margin-right:8px;}
            .egungun-ai-close{background:none;border:none;color:#999;cursor:pointer;font-size:20px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:all 0.2s;}
            .egungun-ai-close:hover{color:#000;background:#f0f0f0;}
            .egungun-ai-messages{height:400px;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:12px;background:#0a0a0a;}
            @media (max-height:700px){.egungun-ai-messages{height:320px;}}
            @media (max-height:600px){.egungun-ai-messages{height:280px;}}
            .egungun-ai-messages::-webkit-scrollbar{width:4px;}
            .egungun-ai-messages::-webkit-scrollbar-track{background:#1a1a1a;}
            .egungun-ai-messages::-webkit-scrollbar-thumb{background:#444;border-radius:4px;}
            .message-wrapper{display:flex;max-width:100%;}
            .message-ai-wrapper{justify-content:flex-start;}
            .message-user-wrapper{justify-content:flex-end;}
            .message-bubble{max-width:85%;padding:10px 16px;border-radius:18px;font-size:0.85rem;line-height:1.5;word-wrap:break-word;}
            .message-ai-wrapper .message-bubble{background:#1a1a1a;color:#e0e0e0;border-bottom-left-radius:4px;}
            .message-user-wrapper .message-bubble{background:#fff;color:#000;border-bottom-right-radius:4px;}
            .typing-indicator{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#1a1a1a;border-radius:18px;border-bottom-left-radius:4px;width:fit-content;}
            .typing-dots{display:flex;gap:5px;}
            .typing-dots span{width:6px;height:6px;background:#888;border-radius:50%;animation:typingBounce 1.4s infinite ease-in-out;}
            .typing-dots span:nth-child(1){animation-delay:0s;}
            .typing-dots span:nth-child(2){animation-delay:0.2s;}
            .typing-dots span:nth-child(3){animation-delay:0.4s;}
            @keyframes typingBounce{0%,60%,100%{transform:translateY(0);opacity:0.4;}30%{transform:translateY(-5px);opacity:1;}}
            .typing-text{font-size:0.75rem;color:#888;}
            .egungun-ai-input-area{display:flex;padding:16px;background:#111;border-top:1px solid rgba(255,255,255,0.05);gap:10px;}
            .egungun-ai-input-area.hidden{display:none;}
            .egungun-ai-input{flex:1;background:#1a1a1a;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:10px 16px;color:#fff;font-family:inherit;font-size:0.85rem;outline:none;transition:border-color 0.2s;}
            .egungun-ai-input:focus{border-color:rgba(255,255,255,0.3);}
            .egungun-ai-input::placeholder{color:#555;}
            .egungun-ai-send{background:#fff;border:none;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;}
            .egungun-ai-send:hover{background:#e0e0e0;transform:scale(0.96);}
            .egungun-ai-send svg{width:18px;height:18px;fill:#000;}
            .button-group{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
            .contact-link,.whatsapp-link,.email-link,.rate-card-link{display:inline-flex;align-items:center;justify-content:center;padding:8px 18px;border-radius:40px;font-size:0.75rem;font-weight:500;transition:all 0.2s ease;text-decoration:none;letter-spacing:0.3px;}
            .contact-link{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.25);}
            .contact-link:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.5);transform:translateY(-1px);}
            .whatsapp-link{background:#075E54;color:#fff;}
            .whatsapp-link:hover{background:#054a3f;transform:translateY(-1px);}
            .email-link{background:rgba(255,255,255,0.05);color:#ddd;border:1px solid rgba(255,255,255,0.15);}
            .email-link:hover{background:#fff;color:#000;border-color:#fff;transform:translateY(-1px);}
            .email-link svg{width:12px;height:12px;fill:currentColor;margin-right:6px;}
            .rate-card-link{background:#fff;color:#000;}
            .rate-card-link:hover{background:#e8e8e8;transform:translateY(-1px);}
            @media (max-width:480px){
                .egungun-ai-chat{bottom:16px;right:16px;}
                .egungun-ai-bubble{width:52px;height:52px;}
                .egungun-ai-bubble-icon{width:24px;height:24px;}
                .egungun-ai-window{width:calc(100vw - 32px);right:-8px;bottom:68px;border-radius:20px;}
                .egungun-ai-messages{padding:16px;}
                .message-bubble{max-width:90%;font-size:0.75rem;padding:8px 12px;}
                .egungun-ai-header{padding:12px 16px;}
                .contact-link,.whatsapp-link,.email-link,.rate-card-link{padding:6px 14px;font-size:0.7rem;}
            }
            @media (max-width:380px){.button-group{flex-direction:column;}.contact-link,.whatsapp-link,.email-link,.rate-card-link{width:100%;text-align:center;}}
        </style>
        <div class="egungun-ai-chat">
            <div class="egungun-ai-bubble" id="egungunAiBubble">
                <svg class="egungun-ai-bubble-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/></svg>
                <span class="ai-badge">AI</span>
            </div>
            <div class="egungun-ai-window" id="egungunAiWindow">
                <div class="egungun-ai-header">
                    <div class="egungun-ai-info"><h4><span class="status-dot"></span>Egungun AI</h4><p>Online · Ready to assist</p></div>
                    <button class="egungun-ai-close" id="egungunAiClose">✕</button>
                </div>
                <div class="egungun-ai-messages" id="egungunAiMessages">
                    <div class="message-wrapper message-ai-wrapper" id="welcomeMessage"><div class="message-bubble">Good day. I am Egungun AI, your virtual assistant.<br><br>How may I assist you today?</div></div>
                </div>
                <div class="egungun-ai-input-area" id="egungunAiInputArea">
                    <input type="text" class="egungun-ai-input" id="egungunAiInput" placeholder="Type your message..." autocomplete="off">
                    <button class="egungun-ai-send" id="egungunAiSend"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    let hasResponded = false;
    let isTyping = false;

    const bubble = document.getElementById('egungunAiBubble');
    const win = document.getElementById('egungunAiWindow');
    const close = document.getElementById('egungunAiClose');
    const msgs = document.getElementById('egungunAiMessages');
    const inputArea = document.getElementById('egungunAiInputArea');
    const input = document.getElementById('egungunAiInput');
    const send = document.getElementById('egungunAiSend');
    const welcome = document.getElementById('welcomeMessage');

    bubble.onclick = () => { win.classList.add('active'); setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50); };
    close.onclick = () => win.classList.remove('active');

    function addUserMessage(msg) {
        const div = document.createElement('div');
        div.className = 'message-wrapper message-user-wrapper';
        div.innerHTML = `<div class="message-bubble">${msg.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[m])}</div>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    async function typeMessage(text, showButtons) {
        if (isTyping) return;
        isTyping = true;
        if (welcome?.parentNode) welcome.remove();

        const typing = document.createElement('div');
        typing.className = 'message-wrapper message-ai-wrapper';
        typing.innerHTML = `<div class="typing-indicator"><div class="typing-dots"><span></span><span></span><span></span></div><span class="typing-text">Egungun AI is typing</span></div>`;
        msgs.appendChild(typing);
        msgs.scrollTop = msgs.scrollHeight;
        await new Promise(r => setTimeout(r, 1200));
        typing.remove();

        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper message-ai-wrapper';
        const id = 'm' + Date.now();
        wrapper.innerHTML = `<div class="message-bubble" id="${id}"></div>`;
        msgs.appendChild(wrapper);
        const bubbleDiv = document.getElementById(id);
        let cur = '';
        for (let i = 0; i < text.length; i++) {
            cur += text[i];
            bubbleDiv.innerHTML = cur + '<span style="opacity:0.3;">|</span>';
            msgs.scrollTop = msgs.scrollHeight;
            await new Promise(r => setTimeout(r, CONFIG.TYPING_DELAY));
        }
        bubbleDiv.innerHTML = cur;

        if (showButtons) {
            const btnDiv = document.createElement('div');
            btnDiv.className = 'button-group';
            btnDiv.innerHTML = `
                <a href="${CONFIG.CONTACT_URL}" target="_blank" class="contact-link">Contact Page</a>
                <a href="https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=Hi%20Egungun%20Of%20Africa%2C%20I'm%20interested%20in%20your%20services" target="_blank" class="whatsapp-link">WhatsApp</a>
                <a href="mailto:${CONFIG.REPORT_EMAIL}?subject=Egungun%20Of%20Africa%20Inquiry&body=Hello%2C%20I%20would%20like%20more%20information." target="_blank" class="email-link"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>${CONFIG.REPORT_EMAIL}</a>
                <a href="${CONFIG.RATE_CARD_URL}" target="_blank" class="rate-card-link">Rate Card</a>
            `;
            bubbleDiv.appendChild(btnDiv);
        }
        msgs.scrollTop = msgs.scrollHeight;
        isTyping = false;
    }

    function handleMsg() {
        const val = input.value.trim();
        if (!val || isTyping) return;
        addUserMessage(val);
        input.value = '';
        if (!hasResponded) {
            typeMessage(CONFIG.AI_RESPONSE_TEXT, true);
            hasResponded = true;
            if (CONFIG.AUTO_CLOSE_INPUT) inputArea.classList.add('hidden');
        } else {
            typeMessage(`Thank you for your follow up. Our team will respond through your chosen channel shortly.`, true);
        }
    }

    send.onclick = handleMsg;
    input.onkeypress = (e) => { if (e.key === 'Enter') handleMsg(); };
    document.onclick = (e) => { if (!document.querySelector('.egungun-ai-chat')?.contains(e.target) && win.classList.contains('active')) win.classList.remove('active'); };
})();
