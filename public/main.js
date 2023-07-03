const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton');
const result = document.getElementById('result');

emailInput.addEventListener('input', function() {
    const email = emailInput.value;
    if (email && email.includes('@xyz.com')) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value;
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            result.textContent = data.error;
        } else {
            result.textContent = 'Your ID: ' + data.id;
        }
    });
});
