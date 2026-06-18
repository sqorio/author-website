/* ============================================================
   script.js — Eskor David Johnson
   ============================================================ */

import { tiles as layoutTiles } from './grid-layout.js';
import { navigateWithFade, initPageEnterFade, OH_URL } from './page-transition.js';

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
    type: 'bio',
    img: 'assets/images/bio-pic.jpg',
    eyebrow: 'About',
    title: 'Eskor David Johnson',
    body: [
      'Eskor David Johnson is a writer from Trinidad and Tobago and the United States. His debut novel <em>Pay As You Go</em> (McSweeney\'s, 2023) was named an NPR 2023 Book of the Year, was a finalist for the Center for Fiction First Novel Prize as well as the New York Public Library Young Lions Fiction Award, and longlisted for the Mark Twain American Voice in Literature Award.',
      'His writing has appeared in <em>BOMB Magazine</em>, <em>McSweeney\'s Quarterly Concern</em>, <em>The Los Angeles Review of Books</em>, <em>The Believer</em>, and <em>Guernica Magazine</em>.',
      'A professor of Fiction Writing at Stony Brook University, he lives in New York City.',
    ],
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
    type: 'institution',
    logo: 'assets/images/stony-brook-logo.png',
    eyebrow: 'Teaching',
    title: 'Stony Brook University',
    body: [
      'I\'m an Assistant Professor of Creative Writing in Stony Brook\'s Creative Writing and Literature department. My courses tend to cover a range of genres, modes, and scope, with a primary focus on scene construction in fiction.',
    ],
    courses: [
      { title: 'Introduction to Creative Writing',         pdf: 'assets/content/CW 202 Syllabus - EDJ.pdf' },
      { title: 'Introduction to Contemporary Literature',  pdf: 'assets/content/CWL 190.S01 E.Johnson.pdf' },
      { title: 'Topics in Fiction: Anatomy of a Scene',    pdf: 'assets/content/CWL 305.S07 E.Johnson.pdf' },
    ],
  },

  app: {
    type: 'app',
    img: 'assets/images/quill-logo-wordmark-gradient.jpg',
    intro: 'While writing my novel I used to work with high school students writing their college essays. During the pandemic I started building an app to keep in touch with them.',
    eyebrow: 'Essay Writing',
    title: 'Quill',
    body: [
      'Quill is a simple, structured platform that guides students through the crucial early stages of writing their college application essays.',
      'Think of it as TurboTax for the personal statement: an intuitive, step-by-step process that helps students transform their initial ideas into a detailed, personalized draft ready for refining.',
    ],
    link: { href: 'https://www.itsquill.com/', label: 'Visit Quill →' },
  },

  essays: {
    type: 'writing',
    img: 'assets/images/sisyphus-in-the-capital.jpg',
    eyebrow: 'Stories, Essays & Reviews',
    title: 'Selected Writing',
    intro: 'Although writing novels is more satisfying, they do take long to write. In my moments in between, I try my hand at shorter pieces.',
    sections: [
      {
        label: 'Stories',
        items: [
          {
            title: '"My Mountain is Taller Than All The Living Trees"',
            publication: "McSweeney's Issue 52",
            links: [
              { label: 'Read excerpt', href: 'https://www.mcsweeneys.net/articles/from-mcsweeneys-issue-52-my-mountain-is-taller-than-all-the-living-trees' },
              { label: 'Purchase issue', href: 'https://store.mcsweeneys.net/products/mcsweeney-s-issue-52?taxon_id=3' },
            ],
          },
          {
            title: '"Taximen"',
            publication: 'Guernica',
            links: [
              { label: 'Read story', href: 'https://www.guernicamag.com/taximen/' },
            ],
          },
        ],
      },
      {
        label: 'Essays',
        items: [
          {
            title: '"Sisyphus in the Capital"',
            publication: 'Believer Magazine',
            links: [
              { label: 'Read essay', href: 'https://www.thebeliever.net/sisyphus-in-the-capital/' },
            ],
          },
          {
            title: '"Black Artists and the Logic of the Market: On Cord Jefferson\'s American Fiction"',
            publication: 'Los Angeles Review of Books',
            links: [
              { label: 'Read essay', href: 'https://lareviewofbooks.org/article/black-artists-and-the-logic-of-the-market-on-cord-jeffersons-american-fiction/' },
            ],
          },
        ],
      },
    ],
  },

  interviews: {
    type: 'writing',
    img: 'assets/images/interviews-tile.png',
    eyebrow: 'Interviews & Profiles',
    title: 'In Conversation',
    intro: 'I enjoy any chance I get to talk about writing. Sometimes my own, sometimes about writing in general.',
    sections: [
      {
        label: 'Interviews',
        items: [
          {
            title: 'Video Interview — Pay As You Go',
            publication: 'YouTube',
            links: [
              { label: 'Watch', href: 'https://www.youtube.com/watch?v=mdBRk2lGJRg' },
            ],
          },
          {
            title: 'The Bookshelf of Jennifer Morrison — Ep. 23 w/ Taylor Goldsmith',
            publication: 'Apple Podcasts · March 2025',
            links: [
              { label: 'Listen', href: 'https://podcasts.apple.com/us/podcast/episode-23-jennifer-special-guest-taylor-goldsmith/id1695507506?i=1000697647612' },
            ],
          },
          {
            title: 'An Interview with Eskor David Johnson — 2023 First Novel Prize Finalist',
            publication: 'Center for Fiction',
            links: [
              { label: 'Read interview', href: 'https://centerforfiction.org/interviews/an-interview-with-eskor-david-johnson-2023-first-novel-prize-finalist-for-pay-as-you-go/' },
            ],
          },
          {
            title: 'Masterclass on Prose Style',
            publication: 'Auraist · December 2023',
            links: [
              { label: 'Read interview', href: 'https://auraist.substack.com/p/masterclass-on-prose-style-from-eskor' },
            ],
          },
          {
            title: 'Author Spotlight: Eskor David Johnson, "Pay As You Go"',
            publication: 'Our Culture · October 2023',
            links: [
              { label: 'Read interview', href: 'https://ourculturemag.com/2023/10/29/author-spotlight-eskor-david-johnson-pay-as-you-go/' },
            ],
          },
        ],
      },
    ],
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
    type: 'social',
    img: 'assets/images/author-card-pic.jpg',
    intro: 'On Instagram and TikTok I keep a visual diary, and touch on all things life, literature, and culture. On Substack I go on the very occasional rant.',
    eyebrow: 'Online',
    title: 'I Post Online',
    channels: [
      {
        platform: 'Instagram',
        handle: '@sqorio',
        href: 'https://www.instagram.com/sqorio/',
        embedType: 'instagram',
        embedUrl: 'https://www.instagram.com/p/DXjyH55E9SQ/',
      },
      {
        platform: 'TikTok',
        handle: '@sqorio',
        href: 'https://www.tiktok.com/@sqorio',
        embedType: 'tiktok',
        videoId: '7555325007249837343',
      },
      {
        platform: 'Substack',
        handle: '@sqorio',
        href: 'https://sqorio.substack.com/p/sauteed-fillet-of-atlantic-loup-de',
        embedType: 'substack',
        title: 'Sautéed Fillet of Atlantic Loup de Mer with Bread',
        subtitle: 'On the impossibility of entrepreneurs',
        img: 'assets/images/substack-cover.jpg',
      },
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

  officehours: {
    type: 'officehours',
    intro: 'Every week on TikTok, I go live and take questions about writing: technique, books, gossip, or publishing. Submit something below. I\'ll answer it Thursday.',
    liveLink: 'https://www.tiktok.com/@sqorio',
    calLink: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Office+Hours+%E2%80%94+Eskor+David+Johnson&dates=20260618T000000Z%2F20260618T010000Z&recur=RRULE%3AFREQ%3DWEEKLY%3BBYDAY%3DTH&details=Weekly+live+Q%26A+on+writing.+Watch+on+TikTok+at+https%3A%2F%2Fwww.tiktok.com%2F%40sqorio',
    theme: 'TBD',
    formAction: 'https://formspree.io/f/xaqzkzdd',
    lastClipId: null,
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

  if (type === 'institution') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'large';
    const bodyHTML   = data.body.map(p => `<p class="modal-body-para">${p}</p>`).join('');
    const coursesHTML = data.courses.map(c => `
      <a class="modal-course-link" href="${c.pdf}" target="_blank" rel="noopener">
        <span class="modal-course-title">${c.title}</span>
        <span class="modal-course-arrow">↗</span>
      </a>`).join('');
    return `
      <div class="modal-book">
        <div class="modal-writing-left">
          <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:32px;">
            <img src="${data.logo}" alt="${data.title}" style="width:75%;object-fit:contain;display:block;background:#FAF7F2;padding:20px;border-radius:4px;" />
          </div>
          <p class="modal-writing-intro">${data.body[0]}</p>
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-courses">
              <div class="modal-courses-label">Courses</div>
              ${coursesHTML}
            </div>
          </div>
        </div>
      </div>`;
  }

  if (type === 'bio') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'large';
    const bodyHTML = data.body.map(p => `<p class="modal-body-para">${p}</p>`).join('');
    return `
      <div class="modal-book">
        <div class="modal-book-cover">
          <img class="modal-book-img" src="${data.img}" alt="${data.title}" style="aspect-ratio:3/4;object-position:center top;" />
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-body">${bodyHTML}</div>
          </div>
        </div>
      </div>`;
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

  if (type === 'app') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'large';
    const bodyHTML = data.body.map(p => `<p class="modal-body-para">${p}</p>`).join('');
    return `
      <div class="modal-book">
        <div class="modal-writing-left" style="background:#000;">
          <img class="modal-writing-img" src="${data.img}" alt="${data.title}" style="object-position:center;" />
          ${data.intro ? `<p class="modal-writing-intro">${data.intro}</p>` : ''}
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <img class="modal-app-screenshot" src="assets/images/quill-landing-page.png" alt="Quill app" />
            <div class="modal-body">${bodyHTML}</div>
            <a href="${data.link.href}" class="modal-cta" target="_blank" rel="noopener">${data.link.label}</a>
          </div>
        </div>
      </div>`;
  }

  if (type === 'social') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'social';
    const channelsHTML = data.channels.map(c => {
      let embedHTML = '';
      if (c.embedType === 'instagram') {
        embedHTML = `<blockquote class="instagram-media modal-social-embed"
          data-instgrm-permalink="${c.embedUrl}?utm_source=ig_embed"
          data-instgrm-version="14"></blockquote>`;
      } else if (c.embedType === 'tiktok') {
        embedHTML = `<iframe class="modal-tiktok-iframe"
          src="https://www.tiktok.com/embed/v2/${c.videoId}?autoplay=0"
          allowfullscreen
          allow="encrypted-media"></iframe>`;
      } else if (c.embedType === 'substack') {
        const coverImg = c.img
          ? `<a href="${c.href}" target="_blank" rel="noopener" class="modal-substack-cover-link"><img class="modal-substack-cover" src="${c.img}" alt="" /></a>`
          : `<div class="modal-substack-cover-placeholder"></div>`;
        embedHTML = `<div class="modal-substack-preview">
          ${coverImg}
          <div class="modal-substack-body">
            <div class="modal-substack-label">Latest post</div>
            <div class="modal-substack-title">${c.title}</div>
            <div class="modal-substack-sub">${c.subtitle}</div>
          </div>
        </div>`;
      }
      return `
        <div class="modal-social-channel">
          <div class="modal-social-embed-wrap">${embedHTML}</div>
          <a class="modal-social-channel-link" href="${c.href}" target="_blank" rel="noopener">
            ${c.platform}${c.handle ? ` ${c.handle}` : ''} ↗
          </a>
        </div>`;
    }).join('');
    return `
      <div class="modal-book">
        <div class="modal-writing-left">
          <img class="modal-writing-img" src="${data.img}" alt="" style="object-position:center top;" />
          <p class="modal-writing-intro">${data.intro}</p>
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-social-trio">${channelsHTML}</div>
          </div>
        </div>
      </div>`;
  }

  if (type === 'officehours') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'large';
    const clipHTML = data.lastClipId
      ? `<div class="oh-last-clip">
          <div class="oh-clip-label">Last week</div>
          <iframe class="oh-clip-iframe"
            src="https://www.tiktok.com/embed/v2/${data.lastClipId}?autoplay=0"
            allowfullscreen allow="encrypted-media"></iframe>
        </div>`
      : '';
    return `
      <div class="modal-book">
        <div class="modal-writing-left oh-modal-left">
          <div class="oh-left-inner">
            <div class="modal-eyebrow oh-eyebrow">Weekly Live</div>
            <h2 class="oh-heading">Office<br>Hours</h2>
            <div class="oh-schedule">
              <div class="oh-schedule-time">Thursdays · 8 PM ET</div>
              <a class="oh-schedule-link" href="${data.liveLink}" target="_blank" rel="noopener">Watch on TikTok ↗</a>
              <a class="oh-schedule-link" href="${data.calLink}" target="_blank" rel="noopener">Add to calendar ↗</a>
            </div>
          </div>
          <p class="modal-writing-intro">${data.intro}</p>
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="oh-theme">
              <div class="oh-theme-label">Theme of the week</div>
              <div class="oh-theme-text">${data.theme}</div>
            </div>
            <div class="oh-form-wrap">
              <form class="oh-form" id="oh-form"
                    action="${data.formAction}" method="POST">
                <input type="hidden" name="_subject" value="Office Hours — question submission" />
                <textarea class="oh-question" name="question"
                          placeholder="Your question or topic…" rows="3" required></textarea>
                <input class="oh-email-inp" type="email" name="email"
                       placeholder="Your email address" required />
                <textarea class="oh-links" name="links" rows="2"
                          placeholder="Is there something I should read first? Drop the link here (optional)"></textarea>
                <div class="oh-form-footer">
                  <span class="oh-promise">I'll answer it live on Thursday.</span>
                  <button class="oh-submit" type="submit">Submit →</button>
                </div>
              </form>
              <div class="oh-success" id="oh-success" aria-hidden="true">
                <div class="oh-success-inner">
                  <div class="oh-success-check">✓</div>
                  <p class="oh-success-msg">Question submitted.<br>See you Thursday.</p>
                </div>
              </div>
            </div>
            ${clipHTML}
          </div>
        </div>
      </div>`;
  }

  if (type === 'writing') {
    panel.dataset.theme = 'light';
    panel.dataset.size  = 'large';
    const sectionsHTML = data.sections.map(s => {
      const itemsHTML = s.items.map(item => {
        const linksHTML = item.links.map((l, i) =>
          `<a class="modal-writing-link" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>${i < item.links.length - 1 ? '<span class="modal-writing-link-sep">·</span>' : ''}`
        ).join('');
        return `
          <div class="modal-writing-item">
            <div class="modal-writing-title">${item.title}</div>
            <div class="modal-writing-pub">${item.publication}</div>
            <div class="modal-writing-links">${linksHTML}</div>
          </div>`;
      }).join('');
      return `
        <div class="modal-writing-section">
          <div class="modal-writing-label">${s.label}</div>
          ${itemsHTML}
        </div>`;
    }).join('');
    return `
      <div class="modal-book">
        <div class="modal-writing-left">
          ${data.img ? `<img class="modal-writing-img" src="${data.img}" alt="" />` : ''}
          ${data.intro ? `<p class="modal-writing-intro">${data.intro}</p>` : ''}
        </div>
        <div class="modal-book-text">
          <div class="modal-inner">
            <div class="modal-eyebrow">${data.eyebrow}</div>
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-writing-sections">${sectionsHTML}</div>
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
      // handled by dedicated branch below — fallthrough shouldn't reach here
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
  // Re-process any Instagram / TikTok embeds injected into the modal
  if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
  if (window.tiktok?.Embeds) window.tiktok.Embeds.render();
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
    if (e.target.closest('input, button')) return;
    // Allow href="#" tile CTAs to open the modal; block real external links
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href') !== '#') return;
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

// ── Postcard form ──────────────────────────────────────────────────────────
const postcardForm    = document.getElementById('postcard-form');
const postcardSuccess = document.getElementById('postcard-success');

if (postcardForm) {
  postcardForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = postcardForm.querySelector('.postcard-send');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(postcardForm.action, {
        method: 'POST',
        body: new FormData(postcardForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        postcardForm.style.opacity = '0';
        postcardForm.style.pointerEvents = 'none';
        postcardSuccess.setAttribute('aria-hidden', 'false');
        postcardSuccess.classList.add('is-visible');
        postcardForm.reset();
      } else {
        btn.disabled = false;
        btn.textContent = 'Send';
        alert('Something went wrong — please try again.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send';
      alert('Could not send — check your connection.');
    }
  });
}

// ── Smooth-scroll for nav + footer links ───────────────────────
document.querySelectorAll('a[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.dataset.scroll);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// ── Hamburger / mobile menu ──────────────────────────────────────
const navEl        = document.querySelector('.nav');
const hamburgerBtn = document.getElementById('navHamburger');
const mobileMenu   = document.getElementById('mobileMenu');

function openMobileMenu() {
  hamburgerBtn.classList.add('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  navEl?.classList.add('is-menu-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  hamburgerBtn.classList.remove('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  navEl?.classList.remove('is-menu-open');
  document.body.style.overflow = '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });
}

// Close menu when any mobile nav link is tapped
mobileMenu?.querySelectorAll('a[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    closeMobileMenu();
    const target = document.querySelector(link.dataset.scroll);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  });
});

// Close mobile menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) closeMobileMenu();
});

// ── Office Hours → dedicated page with fade ────────────────────
function bindOhNavigation() {
  const ohTile   = document.querySelector('.t-officehours');
  const ohNav    = document.querySelector('.nav-oh');
  const ohMobile = mobileMenu?.querySelector('.mobile-oh');

  const go = (e, afterClose) => {
    e.preventDefault();
    if (afterClose) {
      closeMobileMenu();
      setTimeout(() => navigateWithFade(OH_URL), 200);
    } else {
      navigateWithFade(OH_URL);
    }
  };

  ohNav?.addEventListener('click', e => go(e, false));
  ohMobile?.addEventListener('click', e => go(e, true));
  ohTile?.addEventListener('click', e => {
    if (e.target.closest('input, button')) return;
    go(e, false);
  });
}

bindOhNavigation();

// ── Office Hours form (event-delegated — form lives inside modal) ─
document.getElementById('modalContent').addEventListener('submit', async e => {
  if (!e.target.matches('#oh-form')) return;
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.oh-submit');
  btn.disabled    = true;
  btn.textContent = 'Submitting…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      form.style.opacity      = '0';
      form.style.pointerEvents = 'none';
      const successEl = document.getElementById('oh-success');
      if (successEl) {
        successEl.setAttribute('aria-hidden', 'false');
        successEl.classList.add('is-visible');
      }
      form.reset();
    } else {
      btn.disabled    = false;
      btn.textContent = 'Submit →';
      alert('Something went wrong — please try again.');
    }
  } catch {
    btn.disabled    = false;
    btn.textContent = 'Submit →';
    alert('Could not send — check your connection.');
  }
});

initPageEnterFade();
