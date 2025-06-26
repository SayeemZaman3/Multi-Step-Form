// JavaScript

// Current Step
let error = true;
let index = 1;
$('#step1').addClass('active');

// Nav Check
function navCheck() {
  // Next Button
  if (index === 4) {
    $('#next')
      .text('Confirm')
      .css('background', 'var(--purple600)')
  } else {
    $('#next')
      .text('Next Step')
      .css('background', 'var(--blue950)')
  }
  // Back Button
  index == 1
    ? $('#back').css('display', 'none')
    : $('#back').css('display', 'block')
    
  updateCrumbs();
}

// Next
$('#next').click(next)
function next() {
  // Confirm Button
  if (index === 4) {
    $('.step, #nav').css('display', 'none');
    $('#step5').css('display', 'flex');
    
    // For Desktop
    if ($(window).width() > 799) {
      $('form').css({
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'height': '100%'
      })
    }
  } 
  // Next
  else {
    $('.step').removeClass('active');
    $(`#step${++index}`).addClass('active');
  }
  
  navCheck();
}


// Back
function back(){
  $('.step').removeClass('active');
  index--;
  $(`#step${index}`).addClass('active');
  navCheck()
}
$('#back').click(back);

navCheck()


// Breadcrumbs
function updateCrumbs() {
  // Old
  $(`.stepNum`).css({
    background: 'none',
    color: '#fff'
  })
  // New
  $(`#progress${index}`).css({
    background: 'var(--blue200)',
    color: 'var(--blue950)'
  })
}

// Form
$('form').submit((e) => {
  e.preventDefault();
})



// Form Validaion
// Step 1
let locks = {
  lock1: false,
  lock2: false,
  lock3: false
}


$('#next').click(() => {
  
  // Email
  const validEmail = $('#email').val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  
  if (validEmail){
    locks.lock1 = false;
  } else {
    setError($('#email'), 'This is not a valid email')
    locks.lock1 = true
    $('#email').css('border-color', 'var(--red500)')
  }
  
  // Phone Number
  const validPhone = $('#phone').val().match(/^\+?[0-9]{7,15}$/);
  
  if(validPhone){
    locks.lock2 = false;
  } else {
    setError($('#phone'), 'This is not a valid phone number');
    locks.lock2 = true;
    $('#phone').css('border-color', 'var(--red500)');
  }
  
  // Checks if empty
  const inputs = $('#step1 input').toArray();
  
  inputs.some(input => {
    if (!$(input).val().trim()) {
      setError($(input), 'This field is required');
      $(input).css('border-color', 'var(--red500)')
    }
  });
  let filled = inputs.every((input) => $(input).val());
  locks.lock3 = !filled;
  
  
  error = locks.lock1 || locks.lock2 || locks.lock3;
  validateStep2();
  !error ? next() : null;
});

// Resets Error
$('input').click(() => {
  $('.error').css('display', 'none');
  $('input').css('border-color', 'var(--purple200)')
})

// Error Setter
function setError(input, error) {
  $(input).siblings('.error')
    .css('display', 'block')
    .text(error);
    
  error = true;
}


// Step 2
function validateStep2(){
  if($('#step2').hasClass('active')){
    if ($('input[name="plan"]:checked').length === 0) {
      $('#step2-err').css('display', 'block');
     
      back();
    } else {
      $('#step2-err').css('display', 'none');
    }
  }
}



// Pricing

// Data of prices
let totalPrice = 0;
let sel = {
  plan: 0,
  addon1: 0,
  addon2: 0,
  addon3: 0,
}
let prices = {
  monthly: {
    plan: {
      arcade: 9,
      advanced: 12,
      pro: 15
    },
    addons: {
      addon1: 1,
      addon2: 2,
      addon3: 2
    },
  },
  yearly: {
    plan: {
      arcade: 90,
      advanced: 120,
      pro: 150
    },
    addons: {
      addon1: 10,
      addon2: 20,
      addon3: 20
    },
  }
};

// Checked = Yearly, Unchecked = Monthly
let billL = 'mo';

function typeCheck() {
  $('.switch input').is(':checked') ?
    setPrice('yearly') : setPrice('monthly');
}
typeCheck()
$('.switch input, .checkbox').click(typeCheck)

// Sets price to step 2,3
function setPrice(type) {
  billL = type === 'monthly' ? 'mo' : 'yr';
  
  // Plan
  $('#arcadePrice').text(`+${prices[type].plan.arcade}/${billL}`);
  $('#advancedPrice').text(`+${prices[type].plan.advanced}/${billL}`);
  $('#proPrice').text(`+${prices[type].plan.pro}/${billL}`);
  
  // Discount
  type === 'yearly' ?
    $('.free').addClass('active') :
    $('.free').removeClass('active');
    
  // Add-ons
  $('.checkbox .price').each((index) => {
    $(`#addon${index + 1}-price`).text(`+$${prices[type].addons[`addon${index + 1}`]}/${billL}`);
  })
  
  setAddonPrice(type);
}

// Set to finishing page

$('input[name="plan"], .switch').click(setTopPrice);

function setTopPrice() {
  // Plan
  let plan = $('input[name="plan"]:checked').val();
  $('#planType').text(plan.charAt(0).toUpperCase() + plan.slice(1));
  
  // Billing
  let billing = $('#bill-switch').is(':checked') ? 'yearly' : 'monthly';
  $('#billType').text(`(${billing})`);
  
  // Price
  let planPrice = prices[billing].plan[plan];
  $('.plan-info .price').text(`$${planPrice}/${billL}`);
  
  sel.plan = parseInt(planPrice);
}

function setAddonsPrice() {
  $('.checkbox input').each((index, addon) => {
    $(addon).is(':checked') ?
      setAddon(index+1, 'flex') :
      setAddon(index+1, 'none');
  });
  
  sel.addon1 || sel.addon2 || sel.addon3 ?
    $('hr').css('display', 'block') : $('hr').css('display', 'none');
}
setAddonsPrice();
$('.checkbox').click(setAddonsPrice);

function setAddon(id, attr) {
  $(`#addon${id}`).css('display', `${attr}`);
}

function setAddonPrice(type) {
  $('#addon-info .price').each((index, element) => {
    let price = prices[type].addons[`addon${index+1}`];
    $(element).text(`$${price}/${billL}`);
  })
  
  $('.checkbox input').each((i, addon) => {
    if ($(addon).is(':checked')) {
      sel[`addon${i+1}`] = billL === 'mo' ?
        $(addon).val() : $(addon).val() * 10;
    } else {
      sel[`addon${i+1}`] = 0;
    }
  })
}

$('#next').click(() => {
  totalPrice = Object.values(sel).reduce((sum, val) => sum + Number(val), 0);
})

$('#next').click(() => {
  $('#total-price').text(`$${totalPrice}/${billL}`);
})