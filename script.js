const gifts = document.querySelectorAll('.gift');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let selectedGift = null;

gifts.forEach(gift => {
  gift.addEventListener('click', () => {
    selectedGift = gift.dataset.gift;
    popupText.textContent = `You chose the ${selectedGift} as a gift. Do you lock your choice?`;
    popup.classList.remove('hidden');
  });
});

yesBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  
    // Send data via FormSubmit (optional)
    fetch("https://getform.io/f/avrynzqa", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gift: selectedGift })
      }).catch(() => {
      alert("There was a problem recording your gift.");
    });
  
    // Redirect to success page with gift name in URL
    window.location.href = `success.html?gift=${encodeURIComponent(selectedGift)}`;
  });
  

noBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

