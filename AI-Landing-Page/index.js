document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    // console.log(x);
    // console.log(y)

    elementsArray = document.querySelectorAll(".parallex")

    elementsArray.forEach(element => {
        const speed = element.getAttribute("data-speed");
        element.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`
    });
})

// SIGNIN PAGE OPEN AND CLOSE ANIMATIONS
const signinButton = document.getElementById("signinButton")
const signinPage = document.getElementById("signinPage");
const closeIcon = document.getElementById("closeIcon");

signinButton.addEventListener("click", () => {
    signinPage.classList.remove("closeSignin")
    signinPage.classList.add("openSignin")
})
closeIcon.addEventListener("click", () => {
    signinPage.classList.remove("openSignin")
    signinPage.classList.add("closeSignin")
})