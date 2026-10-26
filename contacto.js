/* SPICY UP · contacto.js — decoración creativa solo para contacto.html
   Es independiente: no necesita main.js ni cambios en el CSS. */
   (() => {
    'use strict';
  
    const $  = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine   = matchMedia('(pointer: fine)').matches;
    const sec    = $('.contacto');
    if (!sec) return;
  
    const EMOJIS = ['🔥', '🌶️', '🍋', '💥', '🐻'];
    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = arr => arr[(Math.random() * arr.length) | 0];
  
    const css = `
    /* Botón volver */
    .contacto-volver{max-width:1020px;margin:0 auto 18px;text-align:left}
    .btn-volver{display:inline-flex;align-items:center;gap:10px;padding:10px 22px;
      border:2px solid var(--amarillo,#ffd200);border-radius:30px;background:#000;
      box-shadow:0 4px 0 rgba(255,210,0,.35);color:var(--amarillo,#ffd200);
      font-family:var(--fuente-titulo,sans-serif);font-size:.95rem;letter-spacing:.5px;text-decoration:none;
      transition:transform .15s,box-shadow .15s,background .2s,color .2s}
    .btn-volver .flecha{display:inline-block;transition:transform .25s}
    .btn-volver:hover{background:linear-gradient(90deg,#ffd200,#f7941d);box-shadow:0 6px 0 #b86a00;color:#1a1a1a;transform:translateY(-2px)}
    .btn-volver:hover .flecha{transform:translateX(-6px)}
    .btn-volver:active{box-shadow:0 1px 0 #b86a00;transform:translateY(3px)}
  
    .sc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
    .sc-escribe .sc-typed::after{content:"▍";color:#ffd200;animation:sc-parpadeo .6s steps(1) infinite}
    @keyframes sc-parpadeo{50%{opacity:0}}
  
    .contacto::before{translate:var(--hx,0px) var(--hy,0px);transition:translate .25s ease-out}
  
    .contacto > .sc-capa{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}
    .sc-flota{position:absolute;left:var(--x);top:var(--y);font-size:var(--s,2rem);opacity:.3;
      pointer-events:auto;cursor:pointer;user-select:none;
      animation:sc-flotar var(--t,7s) ease-in-out infinite alternate;animation-delay:var(--d,0s);
      transition:opacity .25s,scale .3s,translate .3s ease-out}
    .sc-flota:hover{opacity:.95;scale:1.3}
    .sc-flota.pop{opacity:0;scale:0}
    @keyframes sc-flotar{from{transform:translateY(-16px) rotate(-10deg)}to{transform:translateY(16px) rotate(10deg)}}
    .sc-brasa{position:absolute;bottom:-10px;left:var(--x);width:var(--s,5px);height:var(--s,5px);border-radius:50%;
      background:#ffd200;box-shadow:0 0 8px 3px #f7941d;opacity:0;
      animation:sc-subir var(--t,6s) var(--d,0s) linear infinite}
    @keyframes sc-subir{0%{transform:translate(0,0) scale(1);opacity:0}10%{opacity:.9}
      100%{transform:translate(var(--dx,20px),-900px) scale(.2);opacity:0}}
  
    .contacto-card{transition:transform .15s ease-out}
    .contacto-card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
      background:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),rgba(255,210,0,.11),transparent 62%);
      opacity:0;transition:opacity .3s}
    .contacto-info::after{background:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),rgba(232,53,43,.18),transparent 62%)}
    .contacto-card:hover::after{opacity:1}
  
    .icono-fuego{display:inline-block;transform-origin:50% 90%;
      scale:calc(1 + var(--heat,0) * .9);
      filter:drop-shadow(0 0 calc(var(--heat,0) * 14px) #ff6a00);
      transition:scale .3s,filter .3s;
      animation:sc-llama 1.1s ease-in-out infinite alternate}
    @keyframes sc-llama{from{transform:rotate(-7deg) scaleY(.94)}to{transform:rotate(7deg) scaleY(1.1)}}
  
    .decoracion,.contacto-footer-msg{cursor:pointer}
    .contacto-footer-msg{transition:transform .2s,border-color .2s}
    .contacto-footer-msg:hover{transform:rotate(-1.5deg) scale(1.04);border-color:#ffd200}
  
    .sc-burst{position:fixed;pointer-events:none;z-index:10000;font-size:1.4rem;will-change:transform,opacity}
  
    .sc-telon{position:fixed;inset:0;z-index:10002;pointer-events:none;
      background:linear-gradient(0deg,#e8352b,#f7941d 55%,#ffd200);
      clip-path:inset(100% 0 0 0);transition:clip-path .45s cubic-bezier(.6,0,.3,1)}
    .sc-telon.on{clip-path:inset(0)}
  
    .sc-mascota{position:fixed;right:18px;bottom:0;z-index:90;width:96px;cursor:pointer;
      transform:translateY(115%);transition:transform .6s cubic-bezier(.2,.9,.3,1.3)}
    .sc-mascota.visible{transform:translateY(52%)}
    .sc-mascota.visible:hover,.sc-mascota.visible.habla{transform:translateY(6%)}
    .sc-mascota img{display:block;width:100%;height:auto;filter:drop-shadow(0 6px 8px rgba(0,0,0,.6));user-select:none}
    .sc-mascota.salto img{animation:sc-salto .6s}
    @keyframes sc-salto{30%{transform:translateY(-30px) rotate(-10deg)}60%{transform:translateY(0) rotate(6deg)}}
    .sc-globo{position:absolute;right:0;bottom:calc(100% + 8px);width:max-content;max-width:220px;
      padding:10px 14px;border:2px solid #ffd200;border-radius:16px;background:#161616;color:#fff;
      box-shadow:4px 4px 0 #ffd200;font:700 .88rem/1.35 "Nunito",Arial,sans-serif;
      opacity:0;transform:scale(.8) translateY(8px);transform-origin:bottom right;pointer-events:none;
      transition:opacity .25s,transform .3s cubic-bezier(.2,.9,.3,1.4)}
    .sc-globo::after{content:"";position:absolute;right:30px;bottom:-9px;width:14px;height:14px;
      background:#161616;border-right:2px solid #ffd200;border-bottom:2px solid #ffd200;transform:rotate(45deg)}
    .sc-mascota.habla .sc-globo{opacity:1;transform:none}
    @media (max-width:760px){.sc-mascota{display:none}}
  
    @media (prefers-reduced-motion:reduce){
      .sc-flota,.sc-brasa,.icono-fuego,.sc-escribe .sc-typed::after{animation:none}
      .sc-brasa{display:none}
      .sc-telon,.sc-mascota,.sc-globo,.contacto-card{transition:none}
    }`;
  
    function injectStyles() {
      const st = document.createElement('style');
      st.id = 'spicyup-contacto-styles';
      st.textContent = css;
      document.head.appendChild(st);
    }
  
    function burst(x, y, emojis = EMOJIS, n = 12) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'sc-burst';
        s.textContent = emojis[i % emojis.length];
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        document.body.appendChild(s);
        const a = Math.random() * Math.PI * 2;
        const d = 60 + Math.random() * 120;
        s.animate([
          { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d - 40}px)) scale(${1 + Math.random()}) rotate(${Math.random() * 360}deg)`, opacity: 0 },
        ], { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' })
          .onfinish = () => s.remove();
      }
    }
  
    function fireRain(n = 24) {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'sc-burst';
        s.textContent = EMOJIS[i % EMOJIS.length];
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = '-40px';
        s.style.fontSize = 1.2 + Math.random() * 1.4 + 'rem';
        document.body.appendChild(s);
        s.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${innerHeight + 80}px) rotate(${(Math.random() - .5) * 720}deg)`, opacity: .9 },
        ], { duration: 2000 + Math.random() * 2000, delay: Math.random() * 1000, easing: 'ease-in', fill: 'backwards' })
          .onfinish = () => s.remove();
      }
    }
  
    function initMaquina() {
      const el = $('.contacto-intro');
      if (!el || reduce) return;
      const txt = el.textContent.trim();
      el.style.minHeight = el.offsetHeight + 'px';
      el.textContent = '';
      const full = document.createElement('span');
      full.className = 'sc-sr';
      full.textContent = txt;
      const typed = document.createElement('span');
      typed.className = 'sc-typed';
      typed.setAttribute('aria-hidden', 'true');
      el.append(full, typed);
      el.classList.add('sc-escribe');
      let i = 0;
      setTimeout(function tick() {
        typed.textContent = txt.slice(0, ++i);
        if (i < txt.length) setTimeout(tick, 28 + Math.random() * 30);
        else el.classList.remove('sc-escribe');
      }, 700);
    }
  
    function initCapa() {
      const capa = document.createElement('div');
      capa.className = 'sc-capa';
      capa.setAttribute('aria-hidden', 'true');
  
      const n = innerWidth < 700 ? 8 : 16;
      const items = [];
      for (let i = 0; i < n; i++) {
        const emoji = EMOJIS[i % EMOJIS.length];
        const s = document.createElement('span');
        s.className = 'sc-flota';
        s.textContent = emoji;
        const borde = Math.random() < 0.6;
        const x = borde ? (Math.random() < 0.5 ? rand(1, 12) : rand(84, 95)) : rand(15, 80);
        s.style.setProperty('--x', x + '%');
        s.style.setProperty('--y', rand(2, 92) + '%');
        s.style.setProperty('--s', rand(1.4, 3).toFixed(2) + 'rem');
        s.style.setProperty('--t', rand(5, 9).toFixed(1) + 's');
        s.style.setProperty('--d', -rand(0, 6).toFixed(1) + 's');
        s.dataset.depth = rand(0.2, 1).toFixed(2);
        s.addEventListener('click', e => {
          burst(e.clientX, e.clientY, [emoji, '💥'], 8);
          s.classList.add('pop');
          setTimeout(() => s.classList.remove('pop'), 3500);
        });
        capa.appendChild(s);
        items.push(s);
      }
  
      if (!reduce) {
        for (let i = 0; i < 12; i++) {
          const b = document.createElement('span');
          b.className = 'sc-brasa';
          b.style.setProperty('--x', rand(2, 98) + '%');
          b.style.setProperty('--s', rand(3, 7).toFixed(1) + 'px');
          b.style.setProperty('--t', rand(5, 9).toFixed(1) + 's');
          b.style.setProperty('--d', rand(0, 6).toFixed(1) + 's');
          b.style.setProperty('--dx', rand(-40, 40).toFixed(0) + 'px');
          capa.appendChild(b);
        }
      }
      sec.prepend(capa);
  
      if (fine && !reduce) {
        sec.addEventListener('mousemove', e => {
          const r = sec.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          items.forEach(s => {
            const d = +s.dataset.depth;
            s.style.translate = `${-x * 70 * d}px ${-y * 70 * d}px`;
          });
          sec.style.setProperty('--hx', x * -34 + 'px');
          sec.style.setProperty('--hy', y * -22 + 'px');
        }, { passive: true });
      }
    }
  
    function initTarjetas() {
      $$('.contacto-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', e.clientX - r.left + 'px');
          card.style.setProperty('--my', e.clientY - r.top + 'px');
          if (fine && !reduce) {
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
          }
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
  
      $$('.decoracion').forEach(d => {
        d.addEventListener('click', e => {
          burst(e.clientX, e.clientY, [d.textContent.trim(), '💥', '🔥'], 10);
        });
      });
  
      const cierre = $('.contacto-footer-msg');
      if (cierre) cierre.addEventListener('click', () => fireRain(24));
    }
  
    function initLlama() {
      const ico = $('.icono-fuego');
      const msg = $('#mensaje');
      const form = $('.contacto-form form');
      if (!ico || !msg) return;
      const set = () => ico.style.setProperty('--heat', Math.min(1, msg.value.length / 120).toFixed(2));
      msg.addEventListener('input', set);
      if (form) form.addEventListener('reset', () => setTimeout(set, 0));
    }
  
    function initMascota() {
      const form = $('.contacto-form form');
      const m = document.createElement('div');
      m.className = 'sc-mascota';
      m.innerHTML = '<div class="sc-globo" role="status" aria-live="polite"></div>' +
                    '<img src="img/chile-rojo.png" alt="" draggable="false">';
      const globo = $('.sc-globo', m);
      const img = $('img', m);
      img.addEventListener('error', () => m.remove());
      document.body.appendChild(m);
  
      let hideT, idleT, nivel = 0;
      const say = (txt, ms = 4200) => {
        globo.textContent = txt;
        m.classList.add('habla');
        clearTimeout(hideT);
        hideT = setTimeout(() => m.classList.remove('habla'), ms);
      };
      const jump = () => { m.classList.remove('salto'); void m.offsetWidth; m.classList.add('salto'); };
      const idle = () => {
        clearTimeout(idleT);
        idleT = setTimeout(() => { say('¿Sigues ahí? Se me está apagando el fuego 🥶', 5000); jump(); }, 30000);
      };
  
      setTimeout(() => m.classList.add('visible'), 1200);
      setTimeout(() => say('¡Ey! ¿Vienes a prender tu antojo? 🔥', 4500), 2000);
      idle();
      ['keydown', 'mousemove', 'scroll', 'touchstart'].forEach(ev =>
        addEventListener(ev, idle, { passive: true }));
  
      const chistes = [
        '¡Cuidado que pico! 🌶️',
        'Soy el chile más relajado del barrio 😎',
        'Escríbeme y te cuento todo 💌',
        '¿Ya probaste las Aguadas? 🔥',
      ];
      m.addEventListener('click', e => {
        jump();
        say(pick(chistes));
        burst(e.clientX, e.clientY, ['🌶️', '🔥', '💥'], 8);
      });
  
      if (!form) return;
      const frases = {
        nombre:  '¿Cómo te llamas, crack? 😎',
        correo:  'Tu correo, para que la respuesta llegue calientita 📬',
        mensaje: 'Cuéntame: ¿qué sabor te llamó la atención? 🍬',
      };
      form.addEventListener('focusin', e => { if (frases[e.target.id]) say(frases[e.target.id]); });
  
      $('#nombre').addEventListener('blur', e => {
        const n = e.target.value.trim();
        if (n.length >= 2) say(`¡Mucho gusto, ${n.split(/\s+/)[0]}! 🌶️`);
      });
      $('#correo').addEventListener('blur', e => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.target.value.trim())) say('¡Anotado! Te respondemos rapidito 📬');
      });
      $('#mensaje').addEventListener('input', e => {
        const l = e.target.value.length;
        if (l >= 114 && nivel < 2) { nivel = 2; say('¡¡BOOM!! Qué mensaje tan picante 🥵🔥'); jump(); }
        else if (l >= 54 && nivel < 1) { nivel = 1; say('¡Uy, esto ya está picando! 🌶️'); }
      });
      form.addEventListener('reset', () => {
        nivel = 0;
        say('¡BOOM! Tu mensaje ya va en llamas 🔥', 5500);
        jump();
        const r = m.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + 20, EMOJIS, 18);
      });
    }
  
    function initVolver() {
      const a = $('.btn-volver');
      if (!a) return;
      a.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (reduce) return;
        e.preventDefault();
        const r = a.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, ['🔥', '🌶️', '💥'], 14);
        let telon = $('.sc-telon');
        if (!telon) {
          telon = document.createElement('div');
          telon.className = 'sc-telon';
          document.body.appendChild(telon);
        }
        void telon.offsetWidth;
        telon.classList.add('on');
        setTimeout(() => { location.href = a.href; }, 500);
      });
      addEventListener('pageshow', () => { const t = $('.sc-telon'); if (t) t.classList.remove('on'); });
    }
  
    function init() {
      injectStyles();
      initMaquina();
      initCapa();
      initTarjetas();
      initLlama();
      initMascota();
      initVolver();
    }
  
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();