/* script.js - Click to Play with Sound */

document.addEventListener("DOMContentLoaded", () => {
  // AOS Animation Init
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }

  const videos = document.querySelectorAll(".video-wrapper");

  videos.forEach((wrapper) => {
    const video = wrapper.querySelector("video");
    const muteIcon = wrapper.querySelector(".mute-btn i"); // Agar mute button hai to

    // Default state: Mute rakho taki browser error na de,
    // lekin play karte waqt hum unmute kar denge.
    video.muted = true;

    // --- CLICK LOGIC ---
    wrapper.addEventListener("click", (e) => {
      // Agar user ne Mute button par click kiya hai to video pause mat karo
      if (e.target.closest(".mute-btn")) return;

      if (video.paused) {
        // 1. Play Video
        // IMPORTANT: Browser ko batana padta hai ki user ne click kiya hai, tabhi sound aati hai
        video.muted = false; // Aawaj ON
        video.currentTime = 0; // Shuru se chalegi (Optional)
        video.play();

        // 2. UI Updates
        wrapper.classList.add("playing"); // Play button gayab

        // Agar mute icon hai to use update karo
        if (muteIcon) {
          muteIcon.classList.remove("fa-volume-mute");
          muteIcon.classList.add("fa-volume-up");
        }
      } else {
        // 1. Pause Video
        video.pause();

        // 2. UI Updates
        wrapper.classList.remove("playing"); // Play button wapas lao
      }
    });

    // Video khatam hone par play button wapas layein
    video.addEventListener("ended", () => {
      wrapper.classList.remove("playing");
      video.currentTime = 0;
    });
  });
});

/* --- AUTO THUMBNAIL GENERATOR --- */
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    // Agar pehle se poster laga hai to ye skip karega
    if (video.poster) return;

    // 1. Video load hone ka wait karein
    video.addEventListener("loadeddata", () => {
      // 2. Video ke 1.5 second par jump karein (Black screen avoid karne ke liye)
      video.currentTime = 2.5;
    });

    // 3. Jab video seek kar le (1.5 sec par pahunch jaye)
    video.addEventListener(
      "seeked",
      function generateThumbnail() {
        // Canvas create karein (Virtual drawing board)
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 4. Canvas ki photo khinch kar poster bana dein
        video.poster = canvas.toDataURL("image/jpeg");

        // 5. Video ko wapas shuru me bhej dein (0 sec) taki play wahi se ho
        video.currentTime = 0;

        // Event listener hata dein taki ye bar bar na chale
        video.removeEventListener("seeked", generateThumbnail);
      },
      { once: true }
    );
  });
});

/* --- LOADER LOGIC --- */
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");

  setTimeout(() => {
    loader.classList.add("hide-loader"); // 1. Fade Out shuru

    // 2. Background me HTML se remove kar de (Performance ke liye)
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // 0.5 sec wait karega transition khatam hone ka
  }, 1000); 
});



window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    setTimeout(() => {
        loader.classList.add('hide-loader');
        setTimeout(() => { loader.style.display = 'none'; }, 500);
    }, 1500);
});