document.addEventListener("DOMContentLoaded", function () {
    const volunteerBtn = document.querySelector(".btn-form");
    const formContainer = document.getElementById("formContainer");
  
    volunteerBtn.addEventListener("click", () => {
      if (!document.getElementById("volunteerForm")) {
        const form = document.createElement("form");
        form.id = "volunteerForm";
        form.innerHTML = `
          <label>Name: <input type="text" name="name" required></label><br>
          <label>Email: <input type="email" name="email" required></label><br>
          <label>Phone: <input type="tel" name="phone"></label><br>
          <button class="submit-btn"type="submit">Submit</button>
        `;
        formContainer.appendChild(form);
  
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Thank you for signing up!");
          form.remove(); 
        });
      }
    });
  });


  const readMoreBtns = document.querySelectorAll(".readMoreBtn");
  const moreTexts = document.querySelectorAll(".moreText");
  readMoreBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const moreText = moreTexts[index];
      if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btn.textContent = "Read Less";
      } else {
        moreText.style.display = "none";
        btn.textContent = "Read More";
      }
    });
  });