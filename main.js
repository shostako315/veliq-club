<!-- 各HTMLの </body> 直前に読み込み
<script src="main.js"></script>
-->

  // main.js
// 今は軽いスムーススクロール程度（将来：招待コード・簡易CMS接続など）
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});
