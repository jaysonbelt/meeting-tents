export function initGiving() {
  const customInput = document.getElementById('custom-amount');
  const donateBtn = document.getElementById('donate-btn');

  if (!customInput || !donateBtn) return;

  let selectedAmount = null;

  customInput.addEventListener('input', () => {
    const val = parseInt(customInput.value, 10);
    selectedAmount = isNaN(val) || val < 1 ? null : val;
    donateBtn.textContent = selectedAmount
      ? `Donate $${selectedAmount}`
      : 'Donate now';
  });

  donateBtn.addEventListener('click', () => {
    if (!selectedAmount) {
      customInput.classList.add('shake');
      customInput.addEventListener(
        'animationend',
        () => customInput.classList.remove('shake'),
        { once: true }
      );
      customInput.focus();
      return;
    }

    // Payment integration placeholder
    // Replace with Stripe, Donorbox, or other processor
    console.log('Donate:', selectedAmount);
    alert(
      `Thank you! You're donating $${selectedAmount} to Meeting TENTS. (Payment processing coming soon.)`
    );
  });
}
