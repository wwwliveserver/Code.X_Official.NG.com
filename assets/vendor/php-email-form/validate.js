/**
 * Formspree Email Form Handler
 * Adapted from BootstrapMade PHP Email Form
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let action = form.getAttribute("action");

      if (!action) {
        displayError(form, "Form action is not set!");
        return;
      }

      // UI states
      form.querySelector(".loading").classList.add("d-block");
      form.querySelector(".error-message").classList.remove("d-block");
      form.querySelector(".sent-message").classList.remove("d-block");

      let formData = new FormData(form);

      fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          form.querySelector(".loading").classList.remove("d-block");

          if (response.ok) {
            // ✅ SUCCESS
            form.querySelector(".sent-message").classList.add("d-block");
            form.reset(); // clear fields
          } else {
            return response.json().then((data) => {
              throw new Error(
                data.error || "Form submission failed. Please try again."
              );
            });
          }
        })
        .catch((error) => {
          displayError(form, error.message);
        });
    });
  });

  function displayError(form, message) {
    form.querySelector(".loading").classList.remove("d-block");
    form.querySelector(".error-message").innerHTML = message;
    form.querySelector(".error-message").classList.add("d-block");
  }
})();
