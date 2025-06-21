// JavaScript

// Current Step
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
$('#next').click(() => {
  // Changes Current Step
  if(index !== 4){
    $('.step').removeClass('active');
    $(`#step${++index}`).addClass('active');
  }
  
  navCheck();
  
  // Confirm Button
  if (index === 4) {
    
  }
})

// Back
$('#back').click(() => {
  $('.step').removeClass('active');
  index--;
  $(`#step${index}`).addClass('active');
  navCheck()
})
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