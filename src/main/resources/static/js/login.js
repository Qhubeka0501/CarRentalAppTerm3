const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const button = document.getElementById('loginButton');
const message = document.getElementById('loginMessage');
const toggle = document.getElementById('togglePassword');

toggle?.addEventListener('click', () => {
    const hidden = passwordInput.type === 'password';
    passwordInput.type = hidden ? 'text' : 'password';
    toggle.textContent = hidden ? 'Hide' : 'Show';
});

(async function redirectIfSignedIn() {
    try {
        const response = await fetch('/login/status');
        if (response.ok) window.location.replace('/dashboard.html');
    } catch (_) { /* server may still be starting */ }
})();

form?.addEventListener('submit', async event => {
    event.preventDefault();
    message.style.display = 'none';
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) {
        message.textContent = 'Enter both your email address and password.';
        message.style.display = 'block';
        return;
    }
    button.disabled = true;
    button.textContent = 'Signing in…';
    try {
        const response = await fetch('/login/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'Invalid email or password');
        window.location.replace('/dashboard.html');
    } catch (error) {
        message.textContent = error.message || 'Unable to connect to the server.';
        message.style.display = 'block';
    } finally {
        button.disabled = false;
        button.textContent = 'Sign in';
    }
});
