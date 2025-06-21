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