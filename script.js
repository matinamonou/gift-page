const gifts = document.querySelectorAll('.gift');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let selectedGift = null;

// Check if user has already selected a gift when page loads
window.addEventListener('DOMContentLoaded', () => {
  const savedGift = localStorage.getItem('selectedGift');
  if (savedGift) {
    // User has already selected a gift, redirect to success page
    window.location.href = `success.html?gift=${encodeURIComponent(savedGift)}`;
  }
});

gifts.forEach(gift => {
  gift.addEventListener('click', () => {
    selectedGift = gift.dataset.gift;
    popupText.textContent = `You chose the ${selectedGift} as a gift. Do you lock your choice?`;
    popup.classList.remove('hidden');
  });
});

yesBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  
    // Save the selected gift to local storage
    localStorage.setItem('selectedGift', selectedGift);
  
    // Send data via FormSubmit (optional)
    fetch("https://formsubmit.co/ajax/matinamonou@gmail.com", {
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

