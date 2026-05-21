// Mobile menu
function toggleMenu(){
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('mob').classList.toggle('open');
}
document.addEventListener('DOMContentLoaded',function(){
  var menuLinks = document.querySelectorAll('.mobile-menu a,.mob-c,.mob-e');
  menuLinks.forEach(function(el){
    el.addEventListener('click',function(){
      var ham = document.getElementById('ham');
      var mob = document.getElementById('mob');
      if(ham) ham.classList.remove('open');
      if(mob) mob.classList.remove('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item = this.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen) item.classList.add('open');
    });
  });

  // Contact form captcha
  initCaptcha();
});

// Math captcha
var cA, cB, cOp;
function initCaptcha(){
  var q = document.getElementById('captchaQ');
  if(!q) return;
  cA = Math.floor(Math.random()*9)+1;
  cB = Math.floor(Math.random()*9)+1;
  cOp = Math.random()>0.5 ? '+' : '-';
  if(cOp==='-' && cB>cA){ var t=cA; cA=cB; cB=t; }
  q.textContent = 'Ověření: kolik je '+cA+' '+cOp+' '+cB+' ?';
}
function initCaptcha(){
  var q = document.getElementById('captchaQ');
  if(!q) return;
  cA = Math.floor(Math.random()*9)+1;
  cB = Math.floor(Math.random()*9)+1;
  cOp = Math.random()>0.5 ? '+' : '-';
  if(cOp==='-' && cB>cA){ var t=cA; cA=cB; cB=t; }
  q.textContent = 'Ověření: kolik je '+cA+' '+cOp+' '+cB+' ?';
}

function submitForm(e){
  e.preventDefault();
  // Honeypot
  if(document.getElementById('cf-hp') && document.getElementById('cf-hp').value !== '') return false;
  // Captcha
  var correct = cOp==='+' ? cA+cB : cA-cB;
  var userAns = parseInt(document.getElementById('cf-captcha').value);
  var res = document.getElementById('cf-result');
  if(isNaN(userAns) || userAns !== correct){
    res.style.color='#e05555';
    res.textContent = '✗ Špatná odpověď – zkuste znovu';
    initCaptcha();
    document.getElementById('cf-captcha').value='';
    return false;
  }
  var n = document.getElementById('cf-name').value;
  var t = document.getElementById('cf-tel').value;
  var s = document.getElementById('cf-type') ? document.getElementById('cf-type').value : '';
  var m = document.getElementById('cf-msg').value;
  var body = 'Jméno: '+n+'\nTelefon: '+t+(s?'\nSlužba: '+s:'')+'\nZpráva: '+m;
  var em = ['info','@','tech-design','.','cz'].join('');
  window.location.href = 'mailto:'+em+'?subject=Poptávka z webu'+(s?' – '+encodeURIComponent(s):'')+'&body='+encodeURIComponent(body);
  res.style.color='#7CB518';
  res.textContent = '✓ Otevírám váš e-mailový klient...';
  document.getElementById('contactForm').reset();
  initCaptcha();
}
