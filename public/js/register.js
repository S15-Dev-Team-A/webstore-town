const registerForm = document.getElementById("registerForm");
const registerSubmitBtn = document.getElementById("registerSubmit");

registerSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
});
