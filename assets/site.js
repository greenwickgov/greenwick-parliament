
const $=(q)=>document.querySelector(q);const drawer=$('#drawer'),scrim=$('#scrim');function menu(open){drawer?.classList.toggle('open',open);scrim?.classList.toggle('open',open);drawer?.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''}$('#menuBtn')?.addEventListener('click',()=>menu(true));$('#closeMenu')?.addEventListener('click',()=>menu(false));scrim?.addEventListener('click',()=>menu(false));const modal=$('#searchModal'),input=$('#siteSearch'),results=$('#searchResults');let idx=[];fetch('search-index.json').then(r=>r.json()).then(x=>idx=x).catch(()=>{});function search(open){modal?.classList.toggle('open',open);modal?.setAttribute('aria-hidden',String(!open));if(open)setTimeout(()=>input?.focus(),50)}$('#searchBtn')?.addEventListener('click',()=>search(true));$('#closeSearch')?.addEventListener('click',()=>search(false));modal?.addEventListener('click',e=>{if(e.target===modal)search(false)});input?.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();if(!q){results.innerHTML='<p>Search legislation, government, rights, the Crown and more.</p>';return}const hits=idx.filter(x=>(x.title+' '+x.text).toLowerCase().includes(q)).slice(0,9);results.innerHTML=hits.length?hits.map(x=>`<a href="${x.url}"><b>${x.title}</b><small>${x.text.slice(0,140)}…</small></a>`).join(''):'<p>No matching pages found.</p>'});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu(false);search(false)}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search(true)}});
const v=$('#viewer360');if(v){const img=v.querySelector('img');let down=false,sx=0,sy=0,x=0,y=0;const apply=()=>img.style.transform=`translate(${x}px,${y}px) scale(1.08)`;v.addEventListener('pointerdown',e=>{down=true;sx=e.clientX-x;sy=e.clientY-y;v.setPointerCapture(e.pointerId)});v.addEventListener('pointermove',e=>{if(!down)return;x=Math.max(-120,Math.min(120,e.clientX-sx));y=Math.max(-70,Math.min(70,e.clientY-sy));apply()});v.addEventListener('pointerup',()=>down=false);v.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')x+=15;if(e.key==='ArrowRight')x-=15;if(e.key==='ArrowUp')y+=15;if(e.key==='ArrowDown')y-=15;x=Math.max(-120,Math.min(120,x));y=Math.max(-70,Math.min(70,y));apply()})}


/* Greenwick government portal enhancements. Population baseline set 6 Nov 2026 12:32 AEST. */
(() => {
  'use strict';
  const POPULATION_START = 14167;
  const POPULATION_EPOCH = Date.parse('2026-11-06T12:32:00+10:00');
  const POPULATION_STEP_MS = 2 * 60 * 60 * 1000;
  const population = () => POPULATION_START + 3 * Math.max(0, Math.floor((Date.now() - POPULATION_EPOCH) / POPULATION_STEP_MS));
  function refreshPopulation() {
    const value = population().toLocaleString('en-AU');
    document.querySelectorAll('[data-population]').forEach(el => { if(el.textContent !== value) el.textContent = value; });
  }
  const header = document.querySelector('.site-header');
  if (header) {
    const strip = document.createElement('div');
    strip.className = 'civic-topbar';
    strip.innerHTML = '<div class="civic-topbar-inner"><a class="civic-topbar-identity" href="index.html"><span class="civic-emblem">✦</span> COMMONWEALTH OF GREENWICK <span class="topbar-divider">/</span> <span class="topbar-portal">OFFICIAL GOVERNMENT PORTAL</span></a><div class="civic-topbar-actions"><a href="national-statistics.html" class="topbar-population"><i class="live-dot"></i> POPULATION <b data-population>14,167</b></a><a href="digital-services.html" class="topbar-services">PUBLIC SERVICES →</a></div></div>';
    header.parentNode.insertBefore(strip, header);
    const nav = header.querySelector('.desktop-nav');
    if(nav && !nav.querySelector('a[href="government.html"]')) {
      const gov = document.createElement('a'); gov.href='government.html'; gov.textContent='Government';
      const services = document.createElement('a'); services.href='digital-services.html'; services.textContent='Services';
      const parliament = nav.querySelector('a[href="house-and-members.html"]');
      parliament ? nav.insertBefore(gov, parliament) : nav.appendChild(gov);
      nav.insertBefore(services,nav.querySelector('a[href="contact.html"]'));
      const current = location.pathname.split('/').pop();
      nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === (current || 'index.html')));
    }
    const drawerGroup = document.querySelector('.drawer-grid section');
    if(drawerGroup && !drawerGroup.querySelector('a[href="government.html"]')){
      drawerGroup.insertAdjacentHTML('afterbegin','<a href="government.html">Government & Cabinet</a><a href="national-statistics.html">National statistics</a><a href="digital-services.html">Digital services</a>');
    }
    const drawerFooter=document.querySelector('.drawer-foot');
    if(drawerFooter && !drawerFooter.querySelector('a[href="government.html"]')) drawerFooter.insertAdjacentHTML('beforeend','<a href="government.html">Government</a><a href="digital-services.html">Services</a>');
    const headerActions = header.querySelector('.header-actions');
    if(headerActions){
      const theme = document.createElement('button');
      theme.type='button';theme.className='theme-btn';theme.id='theme-toggle';
      theme.setAttribute('aria-label','Switch colour theme');theme.title='Switch light and dark mode';
      const updateTheme = () => {theme.innerHTML = document.body.classList.contains('dark-mode') ? '☀' : '☾';theme.setAttribute('aria-pressed',String(document.body.classList.contains('dark-mode')))};
      try { if(localStorage.getItem('greenwick-theme')==='dark') document.body.classList.add('dark-mode'); } catch(e) {}
      updateTheme();
      theme.addEventListener('click', () => {document.body.classList.toggle('dark-mode');try{localStorage.setItem('greenwick-theme',document.body.classList.contains('dark-mode')?'dark':'light')}catch(e){}updateTheme()});
      headerActions.insertBefore(theme,headerActions.firstChild);
    }
  }
  refreshPopulation();
  setInterval(refreshPopulation, 30000);
  document.addEventListener('visibilitychange', () => { if(!document.hidden) refreshPopulation(); });
})();
/* Accessible parliamentary navigation and dialogs. */
(() => {
  const brand = document.querySelector('.brand b');
  if (brand) brand.textContent = 'Parliament of Greenwick';
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav a').forEach(link => {
    const active = link.getAttribute('href') === current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
  });
  const drawer = document.querySelector('#drawer');
  const menuButton = document.querySelector('#menuBtn');
  const searchModal = document.querySelector('#searchModal');
  const searchButton = document.querySelector('#searchBtn');
  const searchInput = document.querySelector('#siteSearch');
  if (searchInput) searchInput.setAttribute('aria-label', 'Search Parliament of Greenwick');
  if (menuButton) {
    menuButton.setAttribute('aria-controls', 'drawer');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.title = 'All sections';
  }
  let previousFocus = null;
  for (const [panel, trigger, name, focusSelector] of [
    [drawer, menuButton, 'All sections', '#closeMenu'],
    [searchModal, searchButton, 'Search Parliament', '#siteSearch']
  ]) {
    if (!panel) continue;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', name);
    panel.inert = !panel.classList.contains('open');
    new MutationObserver(() => {
      const open = panel.classList.contains('open');
      panel.inert = !open;
      if (panel === drawer) trigger?.setAttribute('aria-expanded', String(open));
      if (open) {
        previousFocus = document.activeElement;
        panel.querySelector(focusSelector)?.focus();
      } else if (previousFocus && !document.querySelector('.drawer.open, .search-modal.open')) {
        previousFocus.focus();
      }
    }).observe(panel, {attributes:true, attributeFilter:['class']});
    panel.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...panel.querySelectorAll('a[href],button,input,[tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
      if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
    });
  }
})();
