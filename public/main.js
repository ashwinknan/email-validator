const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('email'); // Corrected this line
const submitButton = emailForm.querySelector('button'); // Corrected this line
const result = document.getElementById('response'); // Corrected this line

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
            // If you want the user to be able to copy the ID to clipboard
            //result.textContent = 'Your ID: ' + data.id + ' (click to copy)';
            //result.addEventListener('click', function() {
            //    navigator.clipboard.writeText(data.id);
            //});
        }
    });
});
