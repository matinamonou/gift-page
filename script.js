const gifts = document.querySelectorAll('.gift');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');

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

function lockGift() {
  popup.classList.add('hidden');
  
  // Save the selected gift to local storage
  localStorage.setItem('selectedGift', selectedGift);
  
  // Send data via FormSubmit with keepalive
  console.log("Sending data to FormSubmit");
  fetch("https://getform.io/f/avrynzqa", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gift: selectedGift }),
    keepalive: true // This allows the request to continue after page navigation
  }).then(response => {
    console.log("Data sent successfully");
  }).catch(error => {
    console.error("Error sending data:", error);
  });
  
  // Redirect immediately - request will continue in background
  window.location.href = `success.html?gift=${encodeURIComponent(selectedGift)}`;
}

function cancelSelection() {
  popup.classList.add('hidden');
}

