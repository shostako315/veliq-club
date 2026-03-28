// モバイルメニュー開閉
const toggle = document.querySelector('.nav-toggle');
const html = document.documentElement;
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = html.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // メニュー内リンクで自動クローズ
  document.querySelectorAll('#nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => html.classList.remove('nav-open'));
  });
}

// スクロールで現在セクションをハイライト
const sectionIds = ['use','orchestra','plans','flow','faq','contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const links = [...document.querySelectorAll('.nav a')].filter(a => a.hash && sectionIds.includes(a.hash.slice(1)));

const onScroll = () => {
  const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header')) || 64;
  const y = window.scrollY + headerH + 30;
  let current = sections[0]?.id;
  sections.forEach(s => { if (s && s.offsetTop <= y) current = s.id; });
  links.forEach(a => a.classList.toggle('is-active', a.hash === '#' + current));
};
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

// FAQ：summaryクリック範囲の拡張（ボタン以外でも開閉）
document.querySelectorAll('.faq details summary').forEach(sum => {
  sum.addEventListener('click', (e) => {
    // デフォルト挙動でOK（details開閉）。バブルで二重にならないように調整のみ。
  });
});


// FAQのaria-expanded同期（ 任意 ）
document.querySelectorAll('.faq details').forEach(d => {
  const btn = d.querySelector('.toggle-icon');
  const sum = d.querySelector('summary');
  const sync = () => btn && btn.setAttribute('aria-expanded', d.open ? 'true' : 'false');
  sum?.addEventListener('click', () => setTimeout(sync)); // details開閉後に同期
  sync();
});



