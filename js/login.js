function validateForm() {
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorElement = document.getElementById('error');
    errorElement.innerHTML = '';

    if (username === '' || password === '') {
        errorElement.innerHTML = 'Please fill in all fields';
        return false;
    }

    // Your additional validation logic here (e.g., checking username/password against a database)

    return true;
}
