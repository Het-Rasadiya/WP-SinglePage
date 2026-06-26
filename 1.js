document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Optional: Close menu when a link is clicked
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Form submission handling via FormSubmit AJAX
  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector(".form-submit");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      const data = {
        name: document.getElementById("form-name").value,
        company: document.getElementById("form-company").value,
        phone: document.getElementById("form-phone").value,
        category: document.getElementById("form-category").value,
        message: document.getElementById("form-message").value,
        _subject: `New Sourcing Enquiry from ${document.getElementById("form-name").value}`,
      };

      fetch("https://formsubmit.co/ajax/algonprivatelimited@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((resData) => {
          if (resData.success === "true" || resData.success === true) {
            alert(
              "Thank you! Your enquiry has been sent successfully. We will get back to you shortly.",
            );
            form.reset();
          } else {
            alert(
              "Something went wrong. Please try again later or contact us directly at algonprivatelimited@gmail.com.",
            );
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert(
            "Something went wrong. Please try again later or contact us directly at algonprivatelimited@gmail.com.",
          );
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }
});
