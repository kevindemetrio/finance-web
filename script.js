const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40));
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open')}
function toggleFaq(btn){const item=btn.parentElement;const w=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));if(!w)item.classList.add('open')}
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

// Billing toggle
let isAnnual=false;
function toggleBilling(){
  isAnnual=!isAnnual;
  document.getElementById('billingToggle').classList.toggle('annual',isAnnual);
  document.getElementById('lblMonthly').classList.toggle('active',!isAnnual);
  document.getElementById('lblAnnual').classList.toggle('active',isAnnual);
  document.getElementById('saveBadge').classList.toggle('show',isAnnual);

  // Basic pricing
  const basicPrice=document.getElementById('basicPrice');
  const basicOld=document.getElementById('basicOld');
  const basicNote=document.getElementById('basicNote');
  basicPrice.textContent=isAnnual?'3,49 €':'3,99 €';
  basicOld.classList.toggle('show',isAnnual);
  basicNote.textContent=isAnnual?'35,88 €/año · Facturación anual':'Facturación mensual';

  // Pro pricing
  const proPrice=document.getElementById('proPrice');
  const proOld=document.getElementById('proOld');
  const proNote=document.getElementById('proNote');
  proPrice.textContent=isAnnual?'3,99 €':'4,99 €';
  proOld.classList.toggle('show',isAnnual);
  proNote.textContent=isAnnual?'47,88 €/año · Facturación anual':'Facturación mensual';

  // Family pricing
  //const famPrice=document.getElementById('famPrice');
  //const famOld=document.getElementById('famOld');
  //const famNote=document.getElementById('famNote');
  //famPrice.textContent=isAnnual?'109,99 €':'109,99 €';
  //famOld.classList.toggle('show',isAnnual);
  //famNote.textContent=isAnnual?'Hasta 3 miembros · 101,88 €/año':'Hasta 3 miembros · Facturación mensual';
}

// Form handler — envía el mensaje con Resend via /api/contact
async function handleForm(btn) {
  const form = btn.closest('.contact-form');

  const inputs = form.querySelectorAll('input, textarea');
  const [nombreEl, emailEl, asuntoEl, mensajeEl] = inputs;

  const nombre  = nombreEl.value.trim();
  const email   = emailEl.value.trim();
  const asunto  = asuntoEl.value.trim();
  const mensaje = mensajeEl.value.trim();

  // Validación básica
  if (!nombre || !email || !asunto || !mensaje) {
    inputs.forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = 'var(--red, #e53e3e)';
        el.addEventListener('input', () => el.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span style="opacity:.7">Enviando…</span>';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, asunto, mensaje }),
    });

    if (res.ok) {
      btn.innerHTML = '✓ Mensaje enviado';
      btn.style.background = 'var(--green-dark)';
      // Limpiar campos
      inputs.forEach(el => el.value = '');
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Error del servidor');
    }
  } catch (err) {
    btn.innerHTML = '✗ Error al enviar';
    btn.style.background = 'var(--red, #e53e3e)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }
}

// Budget bar animation
const heroBar=document.querySelector('.mock-budget-fill, [id="heroBar"]');
if(heroBar){
  const barObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)heroBar.style.width='65%'})},{threshold:0.5});
  barObs.observe(heroBar.parentElement);
}
