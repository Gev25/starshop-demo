const products = [
  {
    id: 'ui-kit',
    title: 'Storefront UI Kit',
    description: 'Figma + HTML blocks for a Telegram Mini App shop.',
    stars: 35,
  },
  {
    id: 'presets',
    title: 'Presets Pack',
    description: '40 Lightroom presets, one click, warm and clean looks.',
    stars: 20,
  },
  {
    id: 'guide',
    title: 'Launch Guide',
    description: 'A PDF checklist: from BotFather to your first Stars payment.',
    stars: 12,
  },
];

const catalog = document.getElementById('catalog');
const modal = document.getElementById('invoice');
const priceEl = document.getElementById('invoice-price');
const textEl = document.getElementById('invoice-text');
const titleEl = document.getElementById('invoice-title');
const payBtn = document.getElementById('pay');

let current = null;

function renderCatalog() {
  const frag = document.createDocumentFragment();
  for (const product of products) {
    const card = document.createElement('article');
    card.className = 'shop-card';

    const title = document.createElement('h4');
    title.textContent = product.title;

    const desc = document.createElement('p');
    desc.textContent = product.description;

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `${product.stars} ★`;

    const buy = document.createElement('button');
    buy.className = 'buy';
    buy.type = 'button';
    buy.textContent = 'Buy';
    buy.addEventListener('click', () => openInvoice(product));

    card.append(title, desc, price, buy);
    frag.appendChild(card);
  }
  catalog.appendChild(frag);
}

function openInvoice(product) {
  current = product;
  modal.hidden = false;
  modal.querySelector('.sheet').classList.remove('paid');
  titleEl.textContent = 'Demo invoice';
  priceEl.textContent = `${product.stars} ★`;
  textEl.textContent = `${product.title} — ${product.stars} Telegram Stars. In the real app this opens the native Stars payment sheet.`;
  payBtn.textContent = 'Pay with Stars';
  payBtn.disabled = false;
  document.body.style.overflow = 'hidden';
}

function closeInvoice() {
  modal.hidden = true;
  document.body.style.overflow = '';
  current = null;
}

payBtn.addEventListener('click', () => {
  if (!current) return;
  payBtn.disabled = true;
  payBtn.textContent = 'Processing…';
  setTimeout(() => {
    modal.querySelector('.sheet').classList.add('paid');
    titleEl.textContent = 'Paid — sending your file';
    textEl.textContent = `Payment for “${current.title}” confirmed (demo). The bot would now send the file link right into this chat.`;
    payBtn.textContent = 'Demo paid';
  }, 900);
});

modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close]')) closeInvoice();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeInvoice();
});

renderCatalog();
