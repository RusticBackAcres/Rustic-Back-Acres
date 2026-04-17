// ── Global site loader — pulls footer, nav social links from JSON ─────────────
(async function(){
  try {
    // Load footer data
    const fr = await fetch('/_data/footer.json');
    if(fr.ok){
      const fd = await fr.json();
      // Update social links everywhere
      if(fd.instagram){ document.querySelectorAll('a[data-social="instagram"]').forEach(a=>a.href=fd.instagram); }
      if(fd.tiktok){ document.querySelectorAll('a[data-social="tiktok"]').forEach(a=>a.href=fd.tiktok); }
      if(fd.facebook){ document.querySelectorAll('a[data-social="facebook"]').forEach(a=>a.href=fd.facebook); }
      if(fd.tagline){ document.querySelectorAll('.footer-tagline').forEach(el=>el.textContent=fd.tagline); }
      if(fd.copyright){ document.querySelectorAll('.footer-copyright').forEach(el=>el.textContent=fd.copyright); }
    }
  } catch(e){}
})();
