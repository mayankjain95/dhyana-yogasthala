  const PRICE_1M = 1050;
  const PRICE_3M = 2500;
  const REGISTRATION_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz8Cdz6OreMzP6xb9iZeT9t_HOJhhNDLd__PNDSwFGw3cJaxG8-krPxoK5qPgjaFmtE0g/exec';
  const FORM_KEY = 'sthira-2026';
  const WHATSAPP_NUMBER = '918950867190';

  let lastRegistrationData = null;

  function getValue(id){
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function getCheckedValue(name){
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : '';
  }

  function getDuration(){ const d=document.querySelector('input[name="duration"]:checked'); return d?parseInt(d.value):0; }
  function getGroupCount(){
    const isGroup=document.getElementById('group-toggle').checked;
    if(!isGroup)return 1;
    const names=document.querySelectorAll('.member-name');
    let count=1;
    names.forEach(n=>{if(n.value.trim())count++;});
    return count;
  }
  function getDiscount(count){ if(count>=5)return 25; if(count>=3)return 15; if(count>=2)return 10; return 0; }
  function getBasePrice(m){ if(m===1)return PRICE_1M; if(m===3)return PRICE_3M; return 0; }

  function calculateFee(){
    const months=getDuration();
    const people=getGroupCount();
    const discount=getDiscount(people);
    const base=getBasePrice(months);
    const final=base>0?Math.round(base*(1-discount/100)):0;
    return { months, people, discount, base, final };
  }

  function updateCalc(){
    const fee=calculateFee();
    document.getElementById('calc-duration').textContent=fee.months?fee.months+' month'+(fee.months>1?'s':''):'—';
    document.getElementById('calc-people').textContent=fee.people;
    document.getElementById('calc-discount').textContent=fee.discount>0?fee.discount+'% group discount applied':'No discount';
    document.getElementById('calc-base').textContent=fee.base>0?'₹'+fee.base.toLocaleString('en-IN'):'—';
    document.getElementById('calc-total').textContent=fee.final>0?'₹'+fee.final.toLocaleString('en-IN'):'—';
    document.getElementById('sidebar-total').textContent=fee.final>0?'₹'+fee.final.toLocaleString('en-IN'):'—';
    document.getElementById('payment-amount-display').textContent=fee.final>0?'₹'+fee.final.toLocaleString('en-IN'):'₹—';
  }

  function toggleGroup(){
    const isGroup=document.getElementById('group-toggle').checked;
    document.getElementById('group-members').classList.toggle('show',isGroup);
    updateCalc();
  }

  function collectGroupMembers(){
    const members=[];
    document.querySelectorAll('#member-list .member-row').forEach((row,index)=>{
      const inputs=row.querySelectorAll('input');
      const member={
        number:index+2,
        name:inputs[0] ? inputs[0].value.trim() : '',
        email:inputs[1] ? inputs[1].value.trim() : '',
        phone:inputs[2] ? inputs[2].value.trim() : ''
      };
      if(member.name || member.email || member.phone) members.push(member);
    });
    return members;
  }

  function collectRegistrationData(){
    const fee=calculateFee();
    return {
      submittedAt:new Date().toISOString(),
      formKey:FORM_KEY,
      submissionType:'registration',
      source:'Sthira registration page',
      paymentStatus:'Pending verification',
      programme:'Sthira',
      name:getValue('name'),
      age:getValue('age'),
      gender:getValue('gender'),
      phone:getValue('phone'),
      email:getValue('email'),
      city:getValue('city'),
      caLevel:getValue('ca-level'),
      attemptType:getValue('attempt-type'),
      upcomingExam:getValue('attempt'),
      challenge:getValue('challenge'),
      preferredBatch:getCheckedValue('batch'),
      preferredDays:getCheckedValue('days'),
      durationMonths:fee.months,
      groupRegistration:document.getElementById('group-toggle').checked ? 'Yes' : 'No',
      groupPeople:fee.people,
      groupMembers:collectGroupMembers(),
      groupDiscountPercent:fee.discount,
      baseFeePerPerson:fee.base,
      finalFeePerPerson:fee.final,
      health:getValue('health'),
      priorYoga:getValue('prior-yoga'),
      notes:getValue('notes')
    };
  }

  function validateRegistration(data){
    const phoneDigits=data.phone.replace(/\D/g,'');
    if(!data.name)return 'Please enter your full name.';
    if(data.name.length<2)return 'Please enter your full name.';
    if(!data.age)return 'Please enter your age.';
    if(Number(data.age)<10 || Number(data.age)>60)return 'Please enter an age between 10 and 60.';
    if(!data.gender)return 'Please select your gender.';
    if(!data.phone)return 'Please enter your phone number.';
    if(phoneDigits.length<8)return 'Please enter a valid phone number.';
    if(!data.email)return 'Please enter your email address.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return 'Please enter a valid email address.';
    if(!data.city)return 'Please enter your current city / location.';
    if(data.city.length<2)return 'Please enter your current city / location.';
    if(!data.caLevel)return 'Please select your CA level.';
    if(!data.attemptType)return 'Please select your attempt type.';
    if(!data.preferredBatch)return 'Please select your preferred timing.';
    if(!data.preferredDays)return 'Please select your preferred days.';
    if(!data.durationMonths)return 'Please select a duration — 1 month or 3 months.';
    if(!document.getElementById('consent').checked)return 'Please read and confirm the statement at the bottom of the form.';
    return '';
  }

  function buildRegistrationWhatsAppMessage(data){
    const memberLines=data.groupMembers.length
      ? data.groupMembers.map(m=>`Member ${m.number}: ${m.name || '—'} | ${m.email || '—'} | ${m.phone || '—'}`).join('\n')
      : 'None';
    return `Hi Shruti, I have registered for Sthira but the website could not save my details automatically.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
City: ${data.city}
CA Level: ${data.caLevel}
Attempt Type: ${data.attemptType}
Upcoming Exam: ${data.upcomingExam || '—'}
Challenge: ${data.challenge || '—'}
Preferred Batch: ${data.preferredBatch}
Preferred Days: ${data.preferredDays}
Duration: ${data.durationMonths} month${data.durationMonths > 1 ? 's' : ''}
Group Size: ${data.groupPeople}
Group Members:
${memberLines}
Amount Per Person: ₹${data.finalFeePerPerson.toLocaleString('en-IN')}
Health Info: ${data.health || '—'}
Prior Yoga: ${data.priorYoga || '—'}
Notes: ${data.notes || '—'}`;
  }

  function buildPaymentWhatsAppMessage(data){
    return `Hi Shruti, I have completed the UPI payment for Sthira.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Duration: ${data.durationMonths} month${data.durationMonths > 1 ? 's' : ''}
Preferred Batch: ${data.preferredBatch}
Preferred Days: ${data.preferredDays}
Group Size: ${data.groupPeople}
Amount Paid Per Person: ₹${data.finalFeePerPerson.toLocaleString('en-IN')}

Please confirm my registration.`;
  }

  function openWhatsApp(message){
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message), '_blank');
  }

  async function sendRegistrationToSheet(data){
    if(!REGISTRATION_ENDPOINT) return false;
    await fetch(REGISTRATION_ENDPOINT, {
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify(data)
    });
    return true;
  }

  function collectPaymentConfirmationData(data){
    return {
      formKey:FORM_KEY,
      submissionType:'payment_confirmation',
      confirmedAt:new Date().toISOString(),
      source:'Sthira payment confirmation button',
      programme:data.programme || 'Sthira',
      name:data.name,
      phone:data.phone,
      email:data.email,
      city:data.city,
      caLevel:data.caLevel,
      preferredBatch:data.preferredBatch,
      preferredDays:data.preferredDays,
      durationMonths:data.durationMonths,
      groupPeople:data.groupPeople,
      finalFeePerPerson:data.finalFeePerPerson,
      paymentStatus:'User clicked I Have Paid',
      notes:data.notes || ''
    };
  }

  async function sendPaymentConfirmationToSheet(data){
    if(!REGISTRATION_ENDPOINT) return false;
    await fetch(REGISTRATION_ENDPOINT, {
      method:'POST',
      mode:'no-cors',
      headers:{'Content-Type':'text/plain;charset=utf-8'},
      body:JSON.stringify(collectPaymentConfirmationData(data))
    });
    return true;
  }

  async function handleSubmit(){
    const data=collectRegistrationData();
    const validationError=validateRegistration(data);
    if(validationError){alert(validationError);return;}

    const btn=document.querySelector('.btn-submit-main');
    const originalText=btn.textContent;
    btn.textContent='Saving Registration...';
    btn.disabled=true;

    try{
      const saved=await sendRegistrationToSheet(data);
      lastRegistrationData=data;
      if(!saved){
        alert('Google Sheet is not connected yet. WhatsApp will open with the registration details as a fallback.');
        openWhatsApp(buildRegistrationWhatsAppMessage(data));
      }
      updateCalc();
      document.getElementById('payment-overlay').classList.add('show');
      document.body.style.overflow='hidden';
    }catch(err){
      lastRegistrationData=data;
      alert('We could not save your registration automatically. WhatsApp will open with your registration details as a fallback.');
      openWhatsApp(buildRegistrationWhatsAppMessage(data));
      updateCalc();
      document.getElementById('payment-overlay').classList.add('show');
      document.body.style.overflow='hidden';
    }finally{
      btn.textContent=originalText;
      btn.disabled=false;
    }
  }

  async function showSuccess(){
    const btn=document.querySelector('.payment-done-btn');
    const originalText=btn ? btn.textContent : '';
    if(btn){
      btn.textContent='Recording Payment Confirmation...';
      btn.disabled=true;
    }

    try{
      if(lastRegistrationData) await sendPaymentConfirmationToSheet(lastRegistrationData);
    }catch(err){
      if(lastRegistrationData){
        alert('We could not record the payment confirmation automatically. WhatsApp will open as a backup.');
        openWhatsApp(buildPaymentWhatsAppMessage(lastRegistrationData));
      }
    }finally{
      if(btn){
        btn.textContent=originalText;
        btn.disabled=false;
      }
    }

    document.getElementById('payment-overlay').classList.remove('show');
    document.getElementById('success-overlay').classList.add('show');
  }

  updateCalc();
