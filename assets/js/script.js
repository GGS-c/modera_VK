// Mobile navigation

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}


// Contact form demo

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!this.reportValidity()) return;

        alert("Thank you! Your enquiry demo was submitted.");

        this.reset();

    });

}
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("enquiryModal");
    const closeBtn = document.getElementById("closeEnquiry");
    const form = document.getElementById("popupEnquiryForm");

    if (!modal || !closeBtn || !form) {
        console.error("Enquiry popup elements not found!");
        return;
    }

    const popupKey = "medora_enquiry_popup_seen";

    // Show popup on first scroll only
    function showPopupOnScroll() {

        if (localStorage.getItem(popupKey)) {
            window.removeEventListener("scroll", showPopupOnScroll);
            return;
        }

        // Wait until visitor scrolls 100px
        if (window.scrollY > 100) {

            modal.classList.remove("hidden");
            modal.classList.add("flex");

            localStorage.setItem(popupKey, "true");

            window.removeEventListener("scroll", showPopupOnScroll);
        }
    }

    window.addEventListener("scroll", showPopupOnScroll, {
        passive: true
    });

    // Close popup
    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }

    closeBtn.addEventListener("click", closeModal);

    // Close when clicking outside
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Demo form submission
    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const phone = form.querySelector('[name="phone"]').value.trim();

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        alert("Thank you! Our counsellor will contact you soon.");

        form.reset();
        closeModal();

    });

});