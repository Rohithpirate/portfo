(function () {
  document.body.classList.add("js-ready");

  // Liquid background mesh and optional video layer.
  var mesh = document.createElement("div");
  mesh.className = "liquid-mesh";
  document.body.prepend(mesh);

  var bgVideo = document.createElement("video");
  bgVideo.className = "liquid-bg-video";
  bgVideo.autoplay = true;
  bgVideo.loop = true;
  bgVideo.muted = true;
  bgVideo.playsInline = true;
  bgVideo.src = "assets/media/liquid-metal-video_yX6NvjdW.mp4";
  bgVideo.addEventListener("error", function () {
    bgVideo.remove();
  });
  document.body.prepend(bgVideo);


  var typingTarget = document.getElementById("typing-role");
  if (typingTarget) {
    var roles = [
      "Full Stack Developer",
      "Web Developer",
      "Website Developer",
      "Frontend Builder"
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function typeRole() {
      var current = roles[roleIndex];
      if (!deleting) {
        charIndex += 1;
        typingTarget.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeRole, 1200);
          return;
        }
        setTimeout(typeRole, 80);
        return;
      }

      charIndex -= 1;
      typingTarget.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(typeRole, deleting ? 42 : 90);
    }

    typeRole();
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  // About page stat count-up animation.
  var countItems = document.querySelectorAll(".count-up");
  function animateCount(el) {
    if (el.dataset.done === "true") return;
    var target = parseInt(el.getAttribute("data-target") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
        el.dataset.done = "true";
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    countItems.forEach(function (item) {
      countObserver.observe(item);
    });
  } else {
    countItems.forEach(function (item) {
      animateCount(item);
    });
  }

  // Home skill progress bars animation.
  var skillFills = document.querySelectorAll(".skill-bar-fill");
  function animateSkillFill(el) {
    if (el.dataset.done === "true") return;
    var targetWidth = el.getAttribute("data-width") || "0%";
    el.style.width = targetWidth;
    el.dataset.done = "true";
  }

  if ("IntersectionObserver" in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateSkillFill(entry.target);
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    skillFills.forEach(function (fill) {
      skillObserver.observe(fill);
    });
  } else {
    skillFills.forEach(function (fill) {
      animateSkillFill(fill);
    });
  }

  var tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      var rect = card.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var rotateY = ((x / rect.width) - 0.5) * 10;
      var rotateX = ((y / rect.height) - 0.5) * -10;
      card.style.transform = "perspective(1200px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  var visualCenters = document.querySelectorAll("[data-visual-center]");
  visualCenters.forEach(function (center) {
    var parent = center.closest(".hero-visual, .page-visual");
    if (!parent) return;

    parent.addEventListener("mousemove", function (event) {
      var rect = parent.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var rotateY = ((x / rect.width) - 0.5) * 16;
      var rotateX = ((y / rect.height) - 0.5) * -16;
      center.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    parent.addEventListener("mouseleave", function () {
      center.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });

  var homeHero = document.querySelector("body[data-page='home'] .hero-visual");
  if (homeHero) {
    homeHero.addEventListener("mousemove", function (event) {
      var rect = homeHero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;

      homeHero.style.setProperty("--ring-one-x", (x * 16).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-one-y", (y * 16).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-two-x", (x * -12).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-two-y", (y * -12).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-three-x", (x * 20).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-three-y", (y * -18).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-four-x", (x * -26).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-four-y", (y * 14).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-five-x", (x * 10).toFixed(2) + "px");
      homeHero.style.setProperty("--ring-five-y", (y * 10).toFixed(2) + "px");

      var warm = Math.round(170 + ((x + 0.5) * 60));
      var violet = Math.round(140 + ((y + 0.5) * 70));
      var cyan = Math.round(180 + ((1 - (x + 0.5)) * 50));
      var pink = Math.round(150 + ((1 - (y + 0.5)) * 55));

      homeHero.style.setProperty("--ring-one-color", "rgba(" + warm + ", 196, 255, 0.48)");
      homeHero.style.setProperty("--ring-two-color", "rgba(" + violet + ", 140, 255, 0.42)");
      homeHero.style.setProperty("--ring-three-color", "rgba(255, " + pink + ", 190, 0.34)");
      homeHero.style.setProperty("--ring-four-color", "rgba(" + cyan + ", 220, 255, 0.26)");
      homeHero.style.setProperty("--ring-five-color", "rgba(255, 255, 255, 0.34)");

      homeHero.style.setProperty("--ring-one-glow", "rgba(" + warm + ", 196, 255, 0.18)");
      homeHero.style.setProperty("--ring-two-glow", "rgba(" + violet + ", 140, 255, 0.18)");
      homeHero.style.setProperty("--ring-three-glow", "rgba(255, " + pink + ", 190, 0.14)");
      homeHero.style.setProperty("--ring-four-glow", "rgba(" + cyan + ", 220, 255, 0.12)");
      homeHero.style.setProperty("--ring-five-glow", "rgba(255, 255, 255, 0.12)");
    });

    homeHero.addEventListener("mouseleave", function () {
      [
        "--ring-one-x","--ring-one-y","--ring-two-x","--ring-two-y",
        "--ring-three-x","--ring-three-y","--ring-four-x","--ring-four-y",
        "--ring-five-x","--ring-five-y","--ring-one-color","--ring-two-color",
        "--ring-three-color","--ring-four-color","--ring-five-color",
        "--ring-one-glow","--ring-two-glow","--ring-three-glow",
        "--ring-four-glow","--ring-five-glow"
      ].forEach(function (prop) {
        homeHero.style.removeProperty(prop);
      });
    });
  }

  var navLinks = document.querySelectorAll(".nav-links a");
  var currentPage = document.body.getAttribute("data-page");
  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("data-page") === currentPage);
  });

  // Metallic cursor trail particles.
  var trailCanvas = document.createElement("canvas");
  trailCanvas.className = "cursor-trail";
  document.body.appendChild(trailCanvas);
  var trailCtx = trailCanvas.getContext("2d");
  var particles = [];
  var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  function resizeTrail() {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
  }
  resizeTrail();
  window.addEventListener("resize", resizeTrail);

  window.addEventListener("mousemove", function (event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    for (var i = 0; i < 3; i++) {
      particles.push({
        x: pointer.x,
        y: pointer.y,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6 - 0.4,
        life: 34 + Math.random() * 18,
        size: 1.8 + Math.random() * 2.8
      });
    }
    if (particles.length > 180) {
      particles.splice(0, particles.length - 180);
    }
  });

  function drawTrail() {
    if (!trailCtx) return;
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      var alpha = p.life / 52;
      var glow = trailCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
      glow.addColorStop(0, "rgba(220, 230, 255," + (alpha * 0.85) + ")");
      glow.addColorStop(0.45, "rgba(176, 196, 255," + (alpha * 0.55) + ")");
      glow.addColorStop(1, "rgba(255, 196, 166,0)");
      trailCtx.fillStyle = glow;
      trailCtx.beginPath();
      trailCtx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      trailCtx.fill();
    }
    requestAnimationFrame(drawTrail);
  }
  drawTrail();

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("contact-name").value.trim();
      var email = document.getElementById("contact-email").value.trim();
      var message = document.getElementById("contact-message").value.trim();
      var subject = encodeURIComponent("Portfolio Contact from " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message
      );
      var draftHref = "mailto:rohithpirate2005@gmail.com?subject=" + subject + "&body=" + body;
      var successCard = document.getElementById("contact-success");
      var openDraftBtn = document.getElementById("contact-open-draft");
      if (openDraftBtn) {
        openDraftBtn.setAttribute("href", draftHref);
      }
      if (successCard) {
        successCard.classList.add("show");
      }
    });
  }
})();
