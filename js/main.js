var $openIMDB = document.querySelector('#open-imdb');
var $closeIMDB = document.querySelector('#close-imdb');
var $modals = document.querySelectorAll('.modal');

function toggleModals(targetModal) {
  for (var i = 0; i < $modals.length; i++) {
    if ($modals[i].getAttribute('data-modal') === targetModal) {
      if (data.modal.open === true) {
        $modals[i].className = 'modal hidden';
        data.modal.open = false;
      } else {
        $modals[i].className = 'modal';
        data.modal.current = targetModal;
        data.modal.open = true;
      }
    } else {
      $modals[i].className = 'modal hidden';
    }
  }
}

function toggleIMDBmodal(event) {
  toggleModals('imdb');
}

$openIMDB.addEventListener('click', toggleIMDBmodal);
$closeIMDB.addEventListener('click', toggleIMDBmodal);
