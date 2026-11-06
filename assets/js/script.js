document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================
  const menuButton = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("mobileMenuIcon");

  function closeMobileMenu() {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    if (menuIcon) menuIcon.textContent = "☰";
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      const willOpen = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", !willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute(
        "aria-label",
        willOpen ? "Close navigation menu" : "Open navigation menu"
      );
      if (menuIcon) menuIcon.textContent = willOpen ? "✕" : "☰";
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close the mobile menu if the screen is resized to desktop width.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) closeMobileMenu();
    });
  }

  // ==========================================
  // 2. CONTACT FORM (FRONTEND DEMO ONLY)
  // ==========================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      alert(
        "Thank you! This is a website demo. Your enquiry has not been sent or saved yet."
      );
      contactForm.reset();
    });
  }

  // ==========================================
  // 3. FIRST-SCROLL ENQUIRY POPUP
  // ==========================================
  const modal = document.getElementById("enquiryModal");
  if (!modal) return; // Inner pages without the popup can still use this script.

  const popupKey = "medora_enquiry_popup_seen_v1";
  const closeButton = document.getElementById("closeEnquiry");
  const popupForm = document.getElementById("popupEnquiryForm");
  const popupMessage = document.getElementById("popupMessage");
  let popupIsOpen = false;

  function closePopup() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    popupIsOpen = false;
  }

  function showPopupOnFirstScroll() {
    if (localStorage.getItem(popupKey)) {
      window.removeEventListener("scroll", showPopupOnFirstScroll);
      return;
    }

    if (window.scrollY > 100) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
      popupIsOpen = true;

      // Mark as seen when displayed, so closing it also prevents it reappearing.
      localStorage.setItem(popupKey, "true");
      window.removeEventListener("scroll", showPopupOnFirstScroll);
    }
  }

  if (!localStorage.getItem(popupKey)) {
    window.addEventListener("scroll", showPopupOnFirstScroll, { passive: true });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closePopup);
  }

  // Close when the visitor taps the dark background outside the form.
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closePopup();
  });

  // Support Escape key for keyboard users.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popupIsOpen) closePopup();
  });

  // Popup form submission is a demo confirmation only; no data is transmitted.
  if (popupForm) {
    popupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!popupForm.reportValidity()) return;

      const phoneInput = popupForm.querySelector('[name="phone"]');
      const phone = phoneInput ? phoneInput.value.trim() : "";

      if (!/^[0-9]{10}$/.test(phone)) {
        if (popupMessage) {
          popupMessage.textContent = "Please enter a valid 10-digit mobile number.";
          popupMessage.className = "text-center text-sm text-red-600";
        }
        return;
      }

      if (popupMessage) {
        popupMessage.textContent =
          "Thank you! This is a demo. Your details have not been sent or saved yet.";
        popupMessage.className = "text-center text-sm text-green-700";
      }

      popupForm.reset();
      window.setTimeout(closePopup, 2200);
    });
  }
});
