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
function next() {
  if (index !== 4) {
    $('.step').removeClass('active');
    $(`#step${++index}`).addClass('active');
  }
  
  navCheck();
  
  // Confirm Button
  if (index === 4) {
    
  }
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

// Monthly & Yearly
let prices = {
  monthly: {
    plan: {
      arcade: '9',
      advanced: '12',
      pro: '15'
    },
    addons: {
      addon1: '1',
      addon2: '2',
      addon3: '2'
    },
  },
  yearly: {
    plan: {
      arcade: '90',
      advanced: '120',
      pro: '150'
    },
    addons: {
      addon1: '10',
      addon2: '20',
      addon3: '20'
    },
  }
};

// Checked = Yearly, Unchecked = Monthly
$(document).click(typeCheck);

function typeCheck(){
  $('.switch input').is(':checked')
    ? setPrice('yearly') : setPrice('monthly');
}
typeCheck()

function setPrice(type) {
  // Plan
  $('#arcadePrice').text(`+${prices[type].plan.arcade}/mo`);
  $('#advancedPrice').text(`+${prices[type].plan.advanced}/mo`);
  $('#proPrice').text(`+${prices[type].plan.pro}/mo`);
  
  // Discount
  type === 'yearly' ?
  $('.free').addClass('active') :
  $('.free').removeClass('active');
  
  // Add-ons
  $('#addon1-price').text(`+${prices[type].addons.addon1}/mo`);
  $('#addon2-price').text(`+${prices[type].addons.addon2}/mo`);
  $('#addon3-price').text(`+${prices[type].addons.addon3}/mo`);
}


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
  
  !validEmail ?
    (setError($('#email'), 'This is not a valid email'), locks.lock1 = true) :
    locks.lock1 = false;
  
  // Phone Number
  const validPhone = $('#phone').val().match(/^\+?[0-9]{7,15}$/);
  
  !validPhone ?
    (setError($('#phone'), 'This is not a valid phone number'), locks.lock2 = true) :
    locks.lock2 = false;
  
  // Checks if empty
  const inputs = $('#step1 input').toArray();
  
  inputs.some(input => {
    if (!$(input).val().trim()) {
      setError($(input), 'This field is required');
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