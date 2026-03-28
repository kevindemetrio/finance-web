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
  // Pro pricing
  const proPrice=document.getElementById('proPrice');
  const proOld=document.getElementById('proOld');
  const proNote=document.getElementById('proNote');
  proPrice.textContent=isAnnual?'3,99 €':'4,99 €';
  proOld.classList.toggle('show',isAnnual);
  proNote.textContent=isAnnual?'47,88 €/año · Facturación anual':'Facturación mensual';
  // Family pricing
  const famPrice=document.getElementById('famPrice');
  const famOld=document.getElementById('famOld');
  const famNote=document.getElementById('famNote');
  famPrice.textContent=isAnnual?'7,99 €':'9,99 €';
  famOld.classList.toggle('show',isAnnual);
  famNote.textContent=isAnnual?'Hasta 3 miembros · 95,88 €/año':'Hasta 3 miembros · Facturación mensual';
}

// Form handler
function handleForm(btn){
  const orig=btn.innerHTML;
  btn.innerHTML='✓ Mensaje enviado';
  btn.style.background='var(--green-dark)';
  setTimeout(()=>{btn.innerHTML=orig;btn.style.background=''},2500);
}

// Budget bar animation
const heroBar=document.querySelector('.mock-budget-fill, [id="heroBar"]');
if(heroBar){
  const barObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)heroBar.style.width='65%'})},{threshold:0.5});
  barObs.observe(heroBar.parentElement);
}
