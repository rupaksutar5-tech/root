


  const formSection = document.getElementById("formSection");
    const greetingSection = document.getElementById("greetingSection");
    const greetingText = document.getElementById("greetingText");
    const song = document.getElementById("diwaliSong");
    const toggleBtn = document.getElementById("toggleSong");

    // Show greeting
    function displayGreeting(name) {
      formSection.style.display = "none";
      greetingSection.style.display = "block";
      greetingText.innerHTML = `🪔 Happy Diwali from, <span style="color:#fff176;">${name}</span>! ✨`;
    }

    // When user clicks "Light Up My Greeting"
    document.getElementById("generateBtn").addEventListener("click", () => {
      const name = document.getElementById("nameInput").value.trim();
      if (!name) {
        alert("Please enter your name!");
        return;
      }
      const newUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}`;
      window.history.replaceState({}, '', newUrl);
      displayGreeting(name);
    });

    // "Make Your Own" button
    document.getElementById("makeOwnBtn").addEventListener("click", () => {
      window.location.href = window.location.pathname;
    });

    // Share button
    document.getElementById("shareBtn").addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name") || "my friend";
      const shareText = `🪔 Happy Diwali, ${name}! Wishing you joy, success, and prosperity. ✨`;
      const shareUrl = window.location.href;

      if (navigator.share) {
        navigator.share({
          title: "Happy Diwali 2025 🎉",
          text: shareText,
          url: shareUrl
        });
      } else {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert("Greeting copied to clipboard! 🎇");
      }
    });

    // Music toggle
    toggleBtn.addEventListener("click", () => {
      if (song.paused) {
        song.play();
        toggleBtn.innerText = "Pause Music 🎵";
      } else {
        song.pause();
        toggleBtn.innerText = "Play Music 🎵";
      }
    });

    // Check URL for ?name=
    window.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name");
      if (name) {
        displayGreeting(name);
      }
    });

    // Fireworks animation
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    let particles = [];
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    });

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = Math.random() * -5 - 2;
        this.alpha = 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const colors = ["#ffeb3b", "#ff5722", "#ff9800", "#ffffff"];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
    }

    setInterval(createFirework, 1000);
    animate();

     const music = document.getElementById("diwaliSong");
  const btn = document.getElementById("musicBtn");
  let isPlaying = false;

  // Start muted autoplay (for browsers that block sound)
  music.autoplay = true;
  music.muted = true;
  music.play().then(() => {
    setTimeout(() => {
      music.muted = false; // unmute after page interaction
    }, 1000);
  }).catch(() => {});

  // When button is clicked — play/pause toggle
  btn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      btn.innerText = "🔇"; // Change icon when paused
    } else {
      music.play();
      btn.innerText = "🎵"; // Change icon when playing
    }
    isPlaying = !isPlaying;
  });

  // Allow unmuting after any first user tap
  document.addEventListener("click", () => {
    music.muted = false;
  }, { once: true });

 // Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyDI6d7lN3rks3qY-na8fhFkLG3VVZi7I",
  authDomain: "visitor-counter-3471b.firebaseapp.com",
  projectId: "visitor-counter-3471b",
  storageBucket: "visitor-counter-3471b.firebasestorage.app",
  messagingSenderId: "154289956181",
  appId: "1:154289956181:web:fad20a76ac4dcac788fbdc",
  measurementId: "G-Z90NVVNXTR"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const visitorRef = db.collection("visitors").doc("count");
const visitorCountEl = document.getElementById("visitorCount");

// Increment visitor count
visitorRef.get().then((doc) => {
  if (doc.exists) {
    let count = doc.data().total || 0;
    count++; // Increment
    visitorCountEl.innerText = count;

    // Update back to Firestore
    visitorRef.set({ total: count });
  } else {
    // If document doesn't exist, create it
    visitorRef.set({ total: 1 });
    visitorCountEl.innerText = 1;
  }
}).catch((error) => {
  console.error("Error fetching visitor count: ", error);
});
