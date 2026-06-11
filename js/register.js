  const PRICE_1M = 1050;
  const PRICE_3M = 2500;

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

  function updateCalc(){
    const months=getDuration();
    const people=getGroupCount();
    const disc=getDiscount(people);
    const base=getBasePrice(months);
    const final=base>0?Math.round(base*(1-disc/100)):0;
    document.getElementById('calc-duration').textContent=months?months+' month'+(months>1?'s':''):'—';
    document.getElementById('calc-people').textContent=people;
    document.getElementById('calc-discount').textContent=disc>0?disc+'% group discount applied':'No discount';
    document.getElementById('calc-base').textContent=base>0?'₹'+base.toLocaleString('en-IN'):'—';
    document.getElementById('calc-total').textContent=final>0?'₹'+final.toLocaleString('en-IN'):'—';
    document.getElementById('sidebar-total').textContent=final>0?'₹'+final.toLocaleString('en-IN'):'—';
    document.getElementById('payment-amount-display').textContent=final>0?'₹'+final.toLocaleString('en-IN'):'₹—';
  }

  function toggleGroup(){
    const isGroup=document.getElementById('group-toggle').checked;
    document.getElementById('group-members').classList.toggle('show',isGroup);
    updateCalc();
  }

  function handleSubmit(){
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const phone=document.getElementById('phone').value.trim();
    const age=document.getElementById('age').value.trim();
    const consent=document.getElementById('consent').checked;
    const duration=getDuration();
    if(!name){alert('Please enter your full name.');return;}
    if(!age){alert('Please enter your age.');return;}
    if(!email){alert('Please enter your email address.');return;}
    if(!phone){alert('Please enter your phone number.');return;}
    if(!duration){alert('Please select a duration — 1 month or 3 months.');return;}
    if(!consent){alert('Please read and confirm the statement at the bottom of the form.');return;}
    updateCalc();
    document.getElementById('payment-overlay').classList.add('show');
    document.body.style.overflow='hidden';
  }

  function showSuccess(){
    document.getElementById('payment-overlay').classList.remove('show');
    document.getElementById('success-overlay').classList.add('show');
  }

  updateCalc();