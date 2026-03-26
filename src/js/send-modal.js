const sendButton = document.querySelector('[data-send-open]');
const sendModal = document.querySelector('[data-send-modal]');
const sendModalCard = sendModal?.querySelector('.send-modal');
const sendEnvelope = document.querySelector('[data-send-envelope]');
const sendStatus = document.querySelector('[data-send-status]');
const sendHint = document.querySelector('[data-send-hint]');
const applyForm = document.querySelector('.inputs-form');

if (
  sendButton &&
  sendModal &&
  sendModalCard &&
  sendEnvelope &&
  sendStatus &&
  sendHint &&
  applyForm
) {
  let closeTimer = null;
  let statusTimer = null;
  const requiredFields = [
    applyForm.querySelector('#user-name'),
    applyForm.querySelector('#email'),
    applyForm.querySelector('#phone'),
    applyForm.querySelector('#user-comment'),
  ];

  const clearCloseTimer = () => {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const clearStatusTimer = () => {
    if (statusTimer) {
      window.clearTimeout(statusTimer);
      statusTimer = null;
    }
  };

  const closeSendModal = () => {
    sendModal.hidden = true;
    sendEnvelope.classList.remove('is-flying');
    sendModalCard.classList.remove('send-modal--error');
    sendHint.classList.remove('is-visible');
    sendHint.textContent = '';
    sendStatus.textContent = 'Sending...';
    document.body.classList.remove('menu-open');
  };

  const showSendModal = ({
    statusText,
    hintText = '',
    animateEnvelope,
    autoCloseDelay,
    isError = false,
  }) => {
    clearCloseTimer();
    clearStatusTimer();
    sendModal.hidden = false;
    document.body.classList.add('menu-open');
    sendStatus.textContent = statusText;
    sendModalCard.classList.toggle('send-modal--error', isError);

    sendHint.textContent = hintText;
    sendHint.classList.toggle('is-visible', hintText.length > 0);

    sendEnvelope.classList.remove('is-flying');

    if (animateEnvelope) {
      void sendEnvelope.offsetWidth;
      sendEnvelope.classList.add('is-flying');
    }

    closeTimer = window.setTimeout(() => {
      closeSendModal();
      closeTimer = null;
    }, autoCloseDelay);
  };

  sendButton.addEventListener('click', () => {
    const hasFieldErrors = requiredFields.some(
      field => !field || field.value.trim() === '' || !field.checkValidity()
    );

    if (hasFieldErrors) {
      showSendModal({
        statusText: 'Something does not look right.',
        hintText: 'Please check the form.',
        animateEnvelope: false,
        autoCloseDelay: 2600,
        isError: true,
      });
      return;
    }

    showSendModal({
      statusText: 'Sending...',
      animateEnvelope: true,
      autoCloseDelay: 1700,
    });

    statusTimer = window.setTimeout(() => {
      sendStatus.textContent = 'Message sent!';
      statusTimer = null;
    }, 900);
  });

  sendModal.addEventListener('click', event => {
    if (event.target === sendModal) {
      clearCloseTimer();
      clearStatusTimer();
      closeSendModal();
    }
  });
}
