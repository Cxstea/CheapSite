(function(){
  /* ---------- Limba / Language ---------- */
  const EN = {
    'meta.title': 'Website Creation in Moldova | Cheap Web',
    'meta.desc': 'We build modern websites for small businesses in Moldova. Presentation sites, online shops, maintenance and SEO optimization. Request a quote.',
    'meta.ogdesc': 'Presentation sites, online shops and maintenance for small businesses in Moldova.',
    'nav.services': 'Services', 'nav.why': 'Why us', 'nav.portfolio': 'Portfolio', 'nav.contact': 'Contact',
    'hero.kicker': 'Websites made by hand, not rushed together.',
    'hero.title': 'Website creation for businesses in Moldova',
    'hero.text': 'I build and maintain websites for small businesses — from the first sketch to day-to-day maintenance. Fair prices, no agency in between.',
    'hero.cta1': 'Request a quote', 'hero.cta2': 'See a project',
    'mock.r1': 'Presentation website', 'mock.r1old': '8000 MDL', 'mock.r1new': 'from 2500 MDL',
    'mock.r2': 'Online shop', 'mock.r2old': '18000 MDL', 'mock.r2new': 'from 6000 MDL',
    'mock.r3': 'Monthly maintenance', 'mock.r3old': '800 MDL', 'mock.r3new': 'from 250 MDL',
    'svc.title': 'Services',
    'svc.lede': 'Everything about your website, in one place — from building to day-to-day care.',
    'svc.1h': 'Website creation', 'svc.1p': 'Presentation sites, online shops and landing pages, built to fit your business.',
    'svc.2h': 'Maintenance', 'svc.2p': 'Updates, fixes, new content and regular backups — so your site runs without worries.',
    'svc.3h': 'Optimization & speed', 'svc.3p': 'Fast websites that look good on phones, tablets, PCs and laptops.',
    'svc.4h': 'Consulting', 'svc.4p': 'Help choosing the domain, hosting and the right tools for your business.',
    'why.title': 'Why Cheap Web',
    'why.lede': 'I work directly with you, with no middlemen — which is why my prices come out lower than an agency’s.',
    'why.1h': 'Below-market prices', 'why.1p': 'No agency overhead, no hidden fees — you pay for the work, not for the office.',
    'why.2h': 'One person, one voice', 'why.2p': 'You always talk to the person building your site, not to a project manager.',
    'why.3h': 'Real maintenance', 'why.3p': 'I don’t disappear after delivery — I stay responsible for the site after launch.',
    'port.title': 'Portfolio', 'port.lede': 'A recent delivered project.',
    'port.tag': 'ONLINE SHOP · STRĂȘENI',
    'port.text': 'Online shop selling grapevine cuttings, with stock display and a clear ordering channel.',
    'port.text2': 'A Landing Page for a beauty studio specializing in eyebrow services, featuring an elegant design, detailed service information, and an easy way to get in touch and book appointments.',
    'port.side': 'project<br>delivered &amp; maintained',
    'contact.title': 'Contact',
    'contact.lede': 'Write me a few words about your project — I’ll reply as soon as possible.',
    'contact.name': 'Name', 'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.message': 'Message',
    'contact.ph': 'Tell me briefly what kind of website you need...',
    'contact.send': 'Send message',
    'footer.text': 'Cheap Web — websites made with care',
    'form.ok': 'Your email app has opened — press “send” there to finish.',
    'form.err': 'Something went wrong while sending. Please try again.'
  };

  // Textele în română sunt citite direct din pagină (HTML-ul este versiunea RO).
  const RO = {
    'form.ok': 'S-a deschis aplicația ta de email — apasă „trimite” acolo pentru a finaliza.',
    'form.err': 'A apărut o problemă la trimitere. Încearcă din nou.'
  };
  const nodes = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-ph]');
  nodes.forEach(function(el){
    if (el.hasAttribute('data-i18n')) RO[el.getAttribute('data-i18n')] = el.textContent;
    else if (el.hasAttribute('data-i18n-html')) RO[el.getAttribute('data-i18n-html')] = el.innerHTML;
    else RO[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  RO['meta.title'] = document.title;
  RO['meta.desc'] = metaDesc ? metaDesc.content : '';
  RO['meta.ogdesc'] = ogDesc ? ogDesc.content : '';

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const langBtns = document.querySelectorAll('.lang button[data-lang]');
  let msgKey = null;

  function applyLang(l, save){
    const D = (l === 'en') ? EN : RO;
    document.documentElement.lang = l;
    nodes.forEach(function(el){
      if (el.hasAttribute('data-i18n')) el.textContent = D[el.getAttribute('data-i18n')];
      else if (el.hasAttribute('data-i18n-html')) el.innerHTML = D[el.getAttribute('data-i18n-html')];
      else el.setAttribute('placeholder', D[el.getAttribute('data-i18n-ph')]);
    });
    document.title = D['meta.title'];
    if (metaDesc) metaDesc.content = D['meta.desc'];
    if (ogTitle) ogTitle.content = D['meta.title'];
    if (ogDesc) ogDesc.content = D['meta.ogdesc'];
    langBtns.forEach(function(b){
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
    if (msgKey) msg.textContent = D[msgKey];
    if (save){ try{ localStorage.setItem('lang', l); }catch(e){} }
  }

  langBtns.forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.getAttribute('data-lang'), true); });
  });

  // Limba implicită: română. Dacă vizitatorul a ales engleza, o ținem minte.
  let saved = null;
  try{ saved = localStorage.getItem('lang'); }catch(e){}
  if (saved === 'en') applyLang('en', false);

  /* ---------- Formular de contact ---------- */
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };
    const D = (document.documentElement.lang === 'en') ? EN : RO;
    try{
      const subject = encodeURIComponent('Mesaj nou de pe site - ' + data.name);
      const body = encodeURIComponent(
        'Nume: ' + data.name + '\n' +
        'Email: ' + data.email + '\n' +
        'Telefon: ' + data.phone + '\n\n' +
        data.message
      );
      window.location.href = 'mailto:cheap.w3bsite@gmail.com?subject=' + subject + '&body=' + body;
      msgKey = 'form.ok';
      msg.textContent = D[msgKey];
      msg.className = 'form-msg ok';
    } catch(err){
      msgKey = 'form.err';
      msg.textContent = D[msgKey];
      msg.className = 'form-msg err';
    }
  });
})();
