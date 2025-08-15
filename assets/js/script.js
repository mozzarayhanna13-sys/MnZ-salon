// MnZ Salon interactions
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Navigation toggle
const navToggle = $('.nav-toggle');
const navMenu = $('#navmenu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('show');
});

// Year
$('#year').textContent = new Date().getFullYear();

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, {threshold: .2});
$$('.reveal').forEach(el => io.observe(el));

// Back to top
const toTop = $('.to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 600) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Slider
const track = $('#sliderTrack');
const prevBtn = $('.slider .prev');
const nextBtn = $('.slider .next');
const cardWidth = 270 + 16; // width + gap
nextBtn.addEventListener('click', () => track.scrollBy({left: cardWidth, behavior:'smooth'}));
prevBtn.addEventListener('click', () => track.scrollBy({left: -cardWidth, behavior:'smooth'}));

// (Demo) Add to cart
$$('.add-cart').forEach(btn => btn.addEventListener('click', () => {
  btn.textContent = 'Ditambahkan ✓';
  setTimeout(()=> btn.textContent='Tambah ke Keranjang', 1500);
}));

// LocalStorage helpers
const store = {
  read(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch{ return fallback; } },
  write(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
};

// Booking
const BOOKING_KEY = 'mnz_booking';
const bookingForm = $('#bookingForm');
const bookingList = $('#bookingList');

function renderBookings(){
  const data = store.read(BOOKING_KEY, []);
  bookingList.innerHTML = '';
  data.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'booking-card';
    const dt = `${b.tanggal} • ${b.jam}`;
    el.innerHTML = \`
      <div>
        <strong>\${b.nama}</strong> &mdash; <span class="badge">\${b.layanan}</span><br>
        <small>\${dt}</small><br>
        <small>\${b.telp}</small><br>
        \${b.catatan ? '<small>'+b.catatan+'</small>' : ''}
      </div>
      <button class="btn btn-outline" data-i="\${i}">Hapus</button>
    \`;
    el.querySelector('button').addEventListener('click', e => {
      const idx = +e.currentTarget.dataset.i;
      const arr = store.read(BOOKING_KEY, []);
      arr.splice(idx,1);
      store.write(BOOKING_KEY, arr);
      renderBookings();
    });
    bookingList.appendChild(el);
  });
}
renderBookings();

bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(bookingForm);
  const data = Object.fromEntries(fd.entries());
  const arr = store.read(BOOKING_KEY, []);
  arr.push(data);
  store.write(BOOKING_KEY, arr);
  bookingForm.reset();
  renderBookings();
  alert('Booking tersimpan! (simulasi)');
});

// Testimoni (seed + input)
const TESTI_KEY = 'mnz_testi';
const seedTesti = [
  {nama:'Rani', rating:5, pesan:'Stylist-nya teliti, hasil potongan rapi banget!'},
  {nama:'Yoga', rating:5, pesan:'Warna rambutnya halus, ga bikin rusak.'},
  {nama:'Lala', rating:4, pesan:'Mani-pedi nyaman, tempatnya wangi & bersih.'}
];
if(!localStorage.getItem(TESTI_KEY)) store.write(TESTI_KEY, seedTesti);

const testiList = $('#testiList');
function renderTesti(){
  const data = store.read(TESTI_KEY, []);
  testiList.innerHTML = '';
  data.forEach(t => {
    const li = document.createElement('li');
    li.className = 'testi-item';
    li.innerHTML = \`
      <div class="testi-top">
        <span class="badge">\${'★'.repeat(+t.rating)}</span>
        <strong>\${t.nama || 'Anonim'}</strong>
      </div>
      <p>\${t.pesan}</p>
    \`;
    testiList.appendChild(li);
  });
}
renderTesti();

$('#testiForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const data = Object.fromEntries(fd.entries());
  const arr = store.read(TESTI_KEY, []);
  arr.unshift({nama:data.nama, rating:data.rating, pesan:data.pesan});
  store.write(TESTI_KEY, arr);
  e.currentTarget.reset();
  renderTesti();
});

// Kritik & Saran
const FEEDBACK_KEY = 'mnz_feedback';
const feedbackForm = $('#feedbackForm');
const feedbackList = $('#feedbackList');

function renderFeedback(){
  const data = store.read(FEEDBACK_KEY, []);
  feedbackList.innerHTML = '';
  data.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feedback-item';
    div.textContent = f;
    feedbackList.appendChild(div);
  });
}
renderFeedback();

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(feedbackForm);
  const text = fd.get('feedback').toString().trim();
  if(!text) return;
  const arr = store.read(FEEDBACK_KEY, []);
  arr.unshift(text);
  store.write(FEEDBACK_KEY, arr);
  feedbackForm.reset();
  renderFeedback();
});
