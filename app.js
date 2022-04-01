const product = [
  {
    id: 0,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
  },
  {
    id: 1,
    name: '刷色直筒牛仔褲',
    price: 1299,
  }
]

const main = document.querySelector('main')
const header = document.querySelector('.header')
const navbarToggleLabel = document.querySelector('.navbar-toggle-label')
const navbarToggle = document.querySelector('#navbar-toggle')

const stepContainer = document.querySelectorAll('.step-container')

const cardWrapper = document.querySelector('.card-wrapper')
const subtotalPrice = document.querySelector('.subtotal-price')
const productNumber = document.querySelectorAll('.number')

const buttonControl = document.querySelector('.button-control')
const sendingAddress = document.querySelector('.sending-address')
const shippingMethod = document.querySelector('.shipping-method')
const payingInformation = document.querySelector('.paying-information')

let step = 1

// 當點選nav清單時暫時隱藏main的內容
function mainHidden() {
  if (navbarToggle.checked) {
    main.classList.toggle('d-none')
  }
}

// 點擊商品+-按鈕修改數量及金額
function changeProductionNum() {
  const target = event.target

  if (target.classList[0] === 'minus') {
    let number = target.nextElementSibling
    if (Number(number.innerHTML) !== 0) {
      number.innerHTML -= 1
    }
  } else if (target.classList[0] === 'plus') {
    let number = target.previousElementSibling
    number.innerHTML = Number(number.innerHTML) + 1
  }

  let totalPrice = product[0].price * Number(productNumber[0].innerHTML) + product[1].price * Number(productNumber[1].innerHTML) 

  // toLocaleString('en-US')：將數字轉為有逗點的字串
  subtotalPrice.innerHTML = `$${totalPrice.toLocaleString('en-US')}`
}


// 隨step切換不同頁面、按鈕及stepperbar
function changeStep() {
  if (event.target.classList.contains('btn-primary') && step !== 3) {
    step += 1
  } else if (event.target.classList.contains('btn-outline') && step !== 1) {
    step -= 1
  }
  changeButton()
  changeStepBar()
  changeSection()
}

// 設置不同步驟時的按鈕顯示
function changeButton() {
  const firstButton = buttonControl.firstElementChild
  const lastButton = buttonControl.lastElementChild
  if (step === 1) {
    firstButton.classList.add('d-none')
    lastButton.classList.add('first-step')
    lastButton.innerHTML = '下一步 →'
  } 
  else if (step === 2) {
    firstButton.classList.remove('d-none')
    lastButton.classList.remove('first-step')
    lastButton.innerHTML = '下一步 →'
  } else if (step === 3){
    lastButton.innerHTML = '送出表單'
  }
}

// 設置不同步驟時的step顯示
function changeStepBar() {
  if (step === 1) {
    // changeStepBar
    stepContainer[0].classList.remove('checked')
    stepContainer[0].classList.add('active')
    stepContainer[0].firstElementChild.innerHTML = '1'
    stepContainer[1].classList.remove('active')
    stepContainer[1].previousElementSibling.classList.remove('active')
  } 
  else if (step === 2) {
    stepContainer[0].classList.add('checked')
    stepContainer[0].classList.remove('active')
    stepContainer[0].firstElementChild.innerHTML = ''
    stepContainer[1].classList.add('active')
    stepContainer[1].classList.remove('checked')
    stepContainer[1].previousElementSibling.classList.add('active')
    stepContainer[1].firstElementChild.innerHTML = '2'
    stepContainer[2].classList.remove('active')
    stepContainer[2].previousElementSibling.classList.remove('active')
  } else if (step === 3){
    stepContainer[1].classList.add('checked')
    stepContainer[1].classList.remove('active')
    stepContainer[1].firstElementChild.innerHTML = ''
    stepContainer[2].classList.add('active')
    stepContainer[2].previousElementSibling.classList.add('active')
  }
}

// 設置不同步驟時的section顯示
function changeSection() {
  if (step === 1) {
    sendingAddress.classList.remove('d-none')
    shippingMethod.classList.add('d-none')
  } 
  else if (step === 2) {
    shippingMethod.classList.remove('d-none')
    sendingAddress.classList.add('d-none')
    payingInformation.classList.add('d-none')

  } else if (step === 3){
    payingInformation.classList.remove('d-none')
    shippingMethod.classList.add('d-none')
  }
}






header.addEventListener('click', mainHidden)
cardWrapper.addEventListener('click', changeProductionNum)
buttonControl.addEventListener('click', changeStep)
