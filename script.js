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

//Consult Form Info
document.getElementById("consultForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const goal = document.getElementById("goal").value;

  document.getElementById("displayFullName").textContent = fullName;
  document.getElementById("displayPhone").textContent = phone;
  document.getElementById("displayEmail").textContent = email;
  document.getElementById("displayRole").textContent = role;
  document.getElementById("displayGoal").textContent = goal;

  document.getElementById("result").style.display = "grid";
});

//Popup post card
const modalContent = document.querySelector(".modal-content");
const openModal = document.querySelectorAll(".read-more-link a");
const closeModalButton = document.querySelector(".close-modal");
const blurBg = document.querySelector(".blur-bg");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector(".modal-body p");
const modalImage = document.querySelector(".modal-image");

function closeModal() {
  modalContent.classList.add("hidden-modal");
  blurBg.classList.add("hidden-blur");
  document.body.classList.remove("modal-open");
}

openModal.forEach((om) => {
  om.addEventListener("click", (event) => {
    event.preventDefault();

    const postCard = om.closest(".post-card");
    const cardImage = postCard.querySelector(".image-wrapper img");
    modalTitle.textContent = postCard
      .querySelector(".card-title")
      .textContent.trim();
    modalImage.src = cardImage.src;
    modalBody.textContent = postCard
      .querySelector(".card-content")
      .textContent.trim();
    modalContent.classList.remove("hidden-modal");
    blurBg.classList.remove("hidden-blur");
    document.body.classList.add("modal-open");
    closeModalButton.focus();
  });
});

blurBg.addEventListener("click", closeModal);
closeModalButton.addEventListener("click", closeModal);
