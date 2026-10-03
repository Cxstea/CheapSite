(function(){
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim()
    };
    try{
      const subject = encodeURIComponent('Mesaj nou de pe site - ' + data.name);
      const body = encodeURIComponent(
        'Nume: ' + data.name + '\n' +
        'Email: ' + data.email + '\n' +
        'Telefon: ' + data.phone + '\n\n' +
        data.message
      );
      window.location.href = 'mailto:cheap.w3bsite@gmail.com?subject=' + subject + '&body=' + body;
      msg.textContent = 'S-a deschis aplicația ta de email — apasă „trimite" acolo pentru a finaliza.';
      msg.className = 'form-msg ok';
    } catch(err){
      msg.textContent = 'A apărut o problemă la trimitere. Încearcă din nou.';
      msg.className = 'form-msg err';
    }
  });
})();
