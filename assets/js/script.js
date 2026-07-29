"use strict";

/* =====================================================
   AB Dentist Website
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("AB Dentist Website Loaded Successfully.");

    initializeStatisticsCounter();

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

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}
