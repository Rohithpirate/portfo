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


  var navLinks = document.querySelectorAll(".nav-links a");
  var navLinksWrap = document.querySelector(".nav-links");
  var navInner = document.querySelector(".nav-inner");
  var currentPage = document.body.getAttribute("data-page");

  if (navLinksWrap && navInner) {
    var menuToggle = document.createElement("button");
    menuToggle.className = "menu-toggle";
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-label", "Toggle menu");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = "<span></span><span></span><span></span>";
    navInner.appendChild(menuToggle);

    menuToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("data-page") === currentPage);
  });


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
