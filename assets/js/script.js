"use strict";

/* =====================================================
   AB Dentist Website
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("AB Dentist Website Loaded Successfully.");

    initializeStatisticsCounter();
    initializeNavigation();

});

/* =====================================================
   Statistics Counter
===================================================== */

function initializeStatisticsCounter() {

    const counters = document.querySelectorAll(".counter");

    if (counters.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

}

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    const duration = 2000;

    const frameRate = 16;

    const totalFrames = duration / frameRate;

    const increment = target / totalFrames;

    let current = 0;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            counter.textContent = target.toLocaleString() + "+";

            clearInterval(timer);

            return;

        }

        counter.textContent = Math.floor(current).toLocaleString();

    }, frameRate);

}

function initializeNavigation() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".primary-navigation");

    if (!menuToggle || !navigation) {
        return;
    }

    const closeNavigation = () => {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openNavigation = () => {
        navigation.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
    };

    menuToggle.addEventListener("click", () => {
        if (navigation.classList.contains("is-open")) {
            closeNavigation();
            return;
        }

        openNavigation();
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeNavigation();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("is-open")) {
            closeNavigation();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeNavigation();
        }
    });
}
