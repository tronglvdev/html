//Event scroll

const stickyHeading = document.querySelector(".sticky-heading");
const topBar = document.querySelector(".top-bar");

function updateStickyHeading() {
  stickyHeading.classList.toggle(
    "is-stuck",
    window.scrollY >= topBar.offsetHeight,
  );
}
window.addEventListener("scroll", updateStickyHeading);
updateStickyHeading();

//Load data from local storage
window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("userConsultData");

  if (savedData) {
    const formData = JSON.parse(savedData);

    document.getElementById("fullName").value = formData.fullName || "";
    document.getElementById("phone").value = formData.phone || "";
    document.getElementById("email").value = formData.email || "";
    document.getElementById("role").value = formData.role || "";
    document.getElementById("goal").value = formData.goal || "";
  }
});

//Consult Form Info
document.getElementById("consultForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const phoneRegex =
    /^(?:0(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}|\+84(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}|\(\+84\)\s?(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7})$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const goal = document.getElementById("goal").value;

  let isValid = true;
  if (fullName.length < 2) {
    isValid = false;
  }
  if (!phoneRegex.test(phone)) {
    isValid = false;
  }
  if (!emailRegex.test(email)) {
    isValid = false;
  }

  if (isValid) {
    const formData = {
      fullName: fullName,
      phone: phone,
      email: email,
      role: role,
      goal: goal,
    };

    localStorage.setItem("userConsultData", JSON.stringify(formData));
    document.getElementById("displayFullName").textContent = fullName;
    document.getElementById("displayPhone").textContent = phone;
    document.getElementById("displayEmail").textContent = email;
    document.getElementById("displayRole").textContent = role;
    document.getElementById("displayGoal").textContent = goal;
    document.getElementById("result").style.display = "grid";
  }
});

// Show Popup
const modalContent = document.querySelector(".modal-content");
const openLink = document.querySelectorAll(".read-more-link a");
const openPost = document.querySelectorAll(".popular-post-content");
const closeModalButton = document.querySelector(".close-modal");
const blurBg = document.querySelector(".blur-bg");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector(".modal-body p");
const modalImage = document.querySelector(".modal-image");

function closeModal() {
  modalContent.classList.add("hidden-modal");
  blurBg.classList.add("hidden-blur");
}

function showModal() {
  modalContent.classList.remove("hidden-modal");
  blurBg.classList.remove("hidden-blur");
}

openLink.forEach((ol) => {
  ol.addEventListener("click", (event) => {
    event.preventDefault();

    const postCard = ol.closest(".post-card");
    const cardImage = postCard.querySelector(".image-wrapper img");
    modalTitle.textContent = postCard
      .querySelector(".card-title")
      .textContent.trim();
    modalImage.src = cardImage.src;
    modalBody.textContent = postCard
      .querySelector(".card-content")
      .textContent.trim();

    showModal();
  });
});

openPost.forEach((op) => {
  op.addEventListener("click", () => {
    const popularImage = op.querySelector(".popular-img img");
    const popularContent = op.querySelector(".popular-content p");
    modalTitle.textContent = "Bài viết phổ biến";
    modalImage.src = popularImage.src;
    modalBody.textContent = popularContent.textContent.trim();
    showModal();
  });
});

blurBg.addEventListener("click", closeModal);
closeModalButton.addEventListener("click", closeModal);
