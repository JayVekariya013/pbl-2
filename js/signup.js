function validateForm() {
    var username = document.getElementById('username').value;
    var phone = document.getElementById('phoneNumber').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorElement = document.getElementById('error');
    errorElement.innerHTML = '';

    if (username === '' || phone === '' || email === '' || password === '' || confirmPassword === '') {
        errorElement.innerHTML = 'Please fill in all fields';
        return false;
    }

    if (password !== confirmPassword) {
        errorElement.innerHTML = 'Passwords do not match';
        return false;
    }

    // Your additional validation logic here (e.g., checking username uniqueness, valid email format, etc.)

    return true;
}
