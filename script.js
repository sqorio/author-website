/* ============================================================
   script.js — Eskor David Johnson
   ============================================================ */

import { tiles as layoutTiles } from './grid-layout.js';

// Inject tile grid placements from shared source of truth
(function injectGridCSS() {
  const css = layoutTiles.map(t =>
    `.${t.id} { grid-column: ${t.col} / ${t.col + t.colSpan}; grid-row: ${t.row} / ${t.row + t.rowSpan}; }`
  ).join('\n');
  const style = document.createElement('style');
  style.id = 'grid-layout-css';
  style.textContent = css;
  document.head.appendChild(style);
}());

// ─── Modal content definitions ───────────────────────────────────────────────

const MODALS = {
  portrait: {
    type: 'image',
    src: 'assets/images/bio-pic.jpg',
    alt: 'Eskor David Johnson',
  },

  book: {
    type: 'book',
    eyebrow: "Novel · McSweeney's, 2023",
    title: 'Pay As You Go',
    accolades: 'A finalist for the 2023 Young Lions Fiction Award. Longlisted for the 2024 Mark Twain American Voice in Literature Award. Shortlisted for the Center for Fiction 2023 First Novel Prize. Named a best book of 2023 by NPR.',
    body: [
      'New to town and delusionally confident, Slide imagined himself living in a glossy building with doormen and sweeping views of the skyline. Instead he\'s landed in a creaking, stuffy apartment with two roommates: a loping giant who hardly leaves his room, and a weight-obsessed neurotic who keeps no fewer than forty-seven lamps throughout the house, blazing at all hours.',
      'Unwilling to accept this fate, Slide — a barber with an opaque past — embarks on a quest for the perfect apartment, pinballing through the sprawling, madcap city of Polis and its endless procession of neighborhoods. As he bounces from foldout couch to disaster-relief tent, falling in with some tough types, Slide begins to realize that he\'s going to have to scratch and claw just to claim a place for himself in this world — let alone a place with in-unit laundry.',
      'An exuberant, fantastical odyssey, Pay As You Go wonders if what we\'re searching for is ever really out there. Its pages — surreal, biting, and teeming with life — announce the startling talents of Eskor David Johnson, who knows that all any of us really want is a place to rest our head.',
    ],
    praise: [
      {
        quote: '"A madcap odyssey through the hellscape that is the metropolis of the near future. […] Like Dante, Slide wanders in circles, soaking in weirdness, tragedies, and occasional flashes of beauty. And like Joyce, Johnson builds a world that, for all its improbabilities, is recognizable. […] An inventive, beautifully written debut that will leave readers wanting more."',
        attr: '— Kirkus, starred review',
      },
      {
        quote: '"Though I\'ve read many funny books, I\'ve read few that made me laugh out loud and fewer still that have had me guffawing so hard I had to put the book down. Eskor David Johnson\'s Pay As You Go is a veritable ab workout of a book. I can\'t remember the last time I cheered as rowdily as I have for Slide, our aspirant barber with a past."',
        attr: '— Tochi Onyebuchi, NPR Books We Love',
      },
      {
        quote: '"A wondrous mock epic, dreamlike yet jaunty, the likes of which we haven\'t seen in a long time. […] Johnson\'s gift for pure invention is downright García Márquezian, and Polis is his rambunctious Macondo, a place readers will want to visit again and again."',
        attr: '— Ed Park, author of Same Bed Different Dreams',
      },
      {
        quote: '"Pay As You Go is an exuberant, maximalist delight."',
        attr: '— Kelly Link, author of White Cat, Black Dog',
      },
      {
        quote: '"Both lampooning city life and confessing love for it, this story is a display of prodigious storytelling talent. It rushes by with the creative adrenaline of a one-man show; it hums with an infectious joy. […] Pay As You Go is a magnetic novel."',
        attr: '— Foreword Reviews, starred review',
      },
    ],
    link: { href: 'https://store.mcsweeneys.net/products/pay-as-you-go', label: 'Read Pay As You Go →' },
  },

  quote1: {
    type: 'quote',
    eyebrow: 'On Pay As You Go',
    quote: '"A magnetic voice, sly, witty, musical — an Augie March for a new time."',
    attr: '— T.C. Boyle',
  },

  stonybrook: {
    eyebrow: 'Faculty',
    title: 'Stony Brook University',
    body: 'Eskor David Johnson is a member of the creative writing faculty at Stony Brook University\'s MFA Program — one of the country\'s leading programs for emerging fiction writers.',
    link: { href: '#', label: 'Explore the MFA Program →' },
  },

  app: {
    eyebrow: 'Product · Essay Writing',
    title: 'Quill',
    body: 'Quill is an essay writing app I built for writers and students who take the craft seriously. It\'s designed to support the full writing process — from first thought to final draft — without the noise of a generic word processor.\n\nBuilt for people who care about sentences.',
    link: { href: 'https://www.itsquill.com/', label: 'Visit Quill →' },
  },

  essays: {
    eyebrow: 'Criticism',
    title: 'Essays & Reviews',
    body: 'Literary criticism, cultural commentary, and reviews at the intersection of fiction, culture, and contemporary life.',
    link: { href: '#', label: 'Read →' },
  },

  bio: {
    eyebrow: 'About',
    title: 'Eskor David Johnson',
    body: 'Eskor David Johnson is a writer, professor, and critic from Trinidad and Tobago and the United States. His work tackles large-scale narratives of the modern age.\n\nHis debut novel Pay As You Go was published by McSweeney\'s in 2023. Finalist, Center for Fiction First Novel Prize. Winner, NYPL Young Lions Fiction Award. Longlisted, Mark Twain American Voice in Literature.',
    link: { href: '#', label: 'Full bio →' },
  },

  photo1: {
    type: 'image',
    src: 'assets/images/photo-1.jpg',
    alt: 'Photography',
  },

  quote2: {
    type: 'quote',
    eyebrow: 'Kirkus Reviews · Starred Review',
    quote: '"An inventive, beautifully written debut that will leave readers wanting more."',
    attr: '— Kirkus Reviews',
  },

  mailing: {
    eyebrow: 'Newsletter',
    title: 'Follow the thinking.',
    body: 'Join the mailing list for updates on new writing, essays, teaching, and events.',
    type: 'form',
  },

  social: {
    eyebrow: 'Find Eskor',
    title: 'Online',
    type: 'social',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Substack', href: '#' },
      { label: 'Twitter / X', href: '#' },
    ],
  },

  photo2: {
    type: 'image',
    src: 'assets/images/photo-2.jpg',
    alt: 'Photography / Video',
  },

  accolades: {
    eyebrow: 'Recognition',
    title: 'Awards & Recognition',
    type: 'list',
    items: [
      { label: 'Center for Fiction First Novel Prize', detail: 'Finalist, 2023' },
      { label: 'NYPL Young Lions Fiction Award', detail: '2023' },
      { label: 'Mark Twain American Voice in Literature', detail: 'Longlisted, 2023' },
    ],
  },
};

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const overlay   = document.getElementById('modalOverlay');
const panel     = document.getElementById('modalPanel');
const contentEl = document.getElementById('modalContent');
const closeBtn  = document.getElementById('modalClose');

// ─── Build modal HTML ─────────────────────────────────────────────────────────

function buildHTML(data) {
  const type = data.type || 'text';

  // Reset size variant; book sets its own
  panel.dataset.size = '';

  if (type === 'image') {
    panel.dataset.theme = 'dark';
    return `<img class="modal-img" src="${data.src}" alt="${data.alt}" />`;
  }

  if (type === 'book') {
    panel.dataset.theme = 'light';
    panel.dataset.size = 'large';
    const bodyHTML = data.body.map(p => `<p class="modal-body-para">${p}</p>`).join('');
    const praiseHTML = data.praise.map(p => `
      <div class="modal-praise-item">
        <div class="modal-praise-quote">${p.quote}</div>
        <div class="modal-praise-attr">${p.attr}</div>
      </div>`).join('');
    return `
      <div class="modal-book">
        <div class="modal-book-cover">
          <img class="modal-book-img" src="assets/images/payg-cover.jpg" alt="Pay As You Go" />
          <a href="${data.link.href}" class="modal-book-cta" target="_blank" rel="noopener">${data.link.label}</a>
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-accolades-blurb">${data.accolades}</p>
            <div class="modal-body">${bodyHTML}</div>
            <div class="modal-praise">
              <div class="modal-praise-heading">Praise</div>
              ${praiseHTML}
            </div>
          </div>
        </div>
      </div>`;
  }

  panel.dataset.theme = 'light';
  let html = '<div class="modal-inner">';

  if (data.eyebrow) {
    html += `<div class="modal-eyebrow">${data.eyebrow}</div>`;
  }

  if (type === 'quote') {
    html += `
      <div class="modal-quote">${data.quote}</div>
      <div class="modal-attr">${data.attr}</div>
    `;
  } else {
    if (data.title) {
      html += `<h2 class="modal-title">${data.title}</h2>`;
    }

    if (data.body) {
      const paras = data.body
        .split('\n\n')
        .map(p => `<p class="modal-body-para">${p}</p>`)
        .join('');
      html += `<div class="modal-body">${paras}</div>`;
    }

    if (type === 'list' && data.items) {
      html += '<div class="modal-list">';
      data.items.forEach(item => {
        html += `
          <div class="modal-list-item">
            <span class="modal-list-label">${item.label}</span>
            <span class="modal-list-detail">${item.detail}</span>
          </div>`;
      });
      html += '</div>';
    }

    if (type === 'social' && data.links) {
      html += '<div class="modal-social">';
      data.links.forEach(link => {
        html += `<a href="${link.href}" class="modal-social-link">${link.label}</a>`;
      });
      html += '</div>';
    }

    if (type === 'form') {
      html += `
        <div class="modal-form-row">
          <input class="modal-email-inp" type="email" placeholder="your@email.com" />
          <button class="modal-email-btn">Join</button>
        </div>`;
    }

    if (data.link) {
      html += `<a href="${data.link.href}" class="modal-cta">${data.link.label}</a>`;
    }
  }

  html += '</div>';
  return html;
}

// ─── Open / close ─────────────────────────────────────────────────────────────

function openModal(key) {
  const data = MODALS[key];
  if (!data) return;
  contentEl.innerHTML = buildHTML(data);
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ─── Event listeners ──────────────────────────────────────────────────────────

document.querySelectorAll('[data-modal]').forEach(tile => {
  tile.addEventListener('click', e => {
    // Don't hijack clicks on interactive elements inside a tile
    if (e.target.closest('input, button, a')) return;
    openModal(tile.dataset.modal);
  });
});

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
