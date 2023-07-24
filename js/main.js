    let defaultTransform = 0;
    let slideWidth = 1150; // Width of each carousel slide, adjust as needed
    let totalSlides = document.querySelectorAll(".flex.items-center.stretch").length;
    let containerWidth = document.getElementById("sliderContainer").clientWidth;
    function updateContainerWidth() {
        containerWidth = document.getElementById("sliderContainer").clientWidth;
    }
    function goNext() {
        updateContainerWidth();
        const slidesPerContainer = Math.floor(containerWidth / slideWidth);
        if (defaultTransform > -(slideWidth * (totalSlides - slidesPerContainer))) {
            defaultTransform -= slideWidth;
        }
        const slider = document.getElementById("slider");
        slider.style.transform = `translateX(${defaultTransform}px)`;
    }
    let next = document.getElementById("next");
    next.addEventListener("click", goNext);

    function goPrev() {
        updateContainerWidth();
        const slidesPerContainer = Math.floor(containerWidth / slideWidth);

        if (defaultTransform < 0) {
            defaultTransform += slideWidth;
        }

        const slider = document.getElementById("slider");
        slider.style.transform = `translateX(${defaultTransform}px)`;
    }

    let prev = document.getElementById("prev");
    prev.addEventListener("click", goPrev);

    // Function to count the number of divs inside the slider div
    function countDivsInsideSlider() {
        const slider = document.getElementById("slider");
        const divElements = slider.querySelectorAll("div.flex.items-center.stretch"); // Select all div elements inside the slider
        const count = divElements.length;
        console.log("Number of divs inside the slider:", count);
        return count;
    }

    // Call the function to count the divs
    const divCount = countDivsInsideSlider();
    // Smooth scrolling for links inside the flex container
const links = document.querySelectorAll('.flex a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const headerOffset = 100; // Change this value as needed to offset the header height
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - headerOffset;
        const duration = 800; // Adjust the scroll duration as needed

        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            // Easing function, you can use different easing functions for a different effect
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
    location.reload();
});
// Sample data array for carousel items
const carouselData = [
    {
        image: "./img/book.png",
        stars: 2,
        title: "Bundle 1",
        price: {
            oldPrice: 50,
            promoPrice: 30,
        },
    },
    {
        image: "./img/book.png",
        stars: 4,
        title: "Bundle 2",
        price: {
            oldPrice: 60,
            promoPrice: 40,
        },
    },
    {
        image: "./img/book.png",
        stars: 5,
        title: "Bundle 3",
        price: {
            oldPrice: 70,
            promoPrice: 50,
        },
    },
    {
        image: "./img/book.png",
        stars: 3,
        title: "Bundle 4",
        price: {
            oldPrice: 100,
            promoPrice: 30,
        },

    },
    {
        image: "./img/book.png",
        stars: 2,
        title: "Bundle 5",
        price: {
            oldPrice: 50,
            promoPrice: 30,
        },
    }
    // Add more carousel items data as needed
];

// Function to generate HTML for carousel items
// Function to generate HTML for carousel items
function createCarouselItem(data) {
  const starIcons = getStarIcons(data.stars); // Get the star icons HTML based on the rating

  return `
    <div class="flex items-center stretch">
        <div class="flex flex-col items-center">
            <div class="mb-8">
                <img src="${data.image}" alt="bundle" class="object-cover object-center w-48 h-48 sm:w-56 sm:h-56"/>
            </div>
            <div class="flex items-center mb-1">
                ${starIcons} <!-- Insert the dynamic star icons here -->
            </div>
            <div class="flex items-center mb-1 text-lg font-bold">${data.title}</div>
            <div class="flex items-center mt-1 justify-between mb-2">
                <span class="text-xl text-red-400 line-through font-extrabold mr-2">$${data.price.oldPrice.toFixed(2)}</span>
                <span class="text-xl font-bold text-black ml-2">$${data.price.promoPrice.toFixed(2)}</span>
            </div>
            <button class="mt-2 px-12 py-2 text-sm font-medium text-white bg-teal-400 rounded-full focus:outline-none focus:bg-teal-600">
                Learn More
            </button>
        </div>
    </div>`;
}

// Helper function to generate star icons based on rating
function getStarIcons(starCount) {
  const filledStar = '<img src="./img/star-filled.png" class="w-4 h-4 mr-1"/>'; // Use the filled star image
  const emptyStar = '<img src="./img/star-empty.png" class="w-4 h-4 mr-1"/>'; // Use the empty star image
  return filledStar.repeat(starCount) + emptyStar.repeat(5 - starCount);
}


// Helper function to generate star icons based on rating
function getStarIcons(starCount) {
    const filledStar = '<img src="./img/star-filled.png" class="w-4 h-4 mr-1 filled"/>';
    const emptyStar = '<img src="./img/star-empty.png" class="w-4 h-4 mr-1"/>';
    return filledStar.repeat(starCount) + emptyStar.repeat(5 - starCount);
}

// Function to populate the carousel with data
function populateCarousel(data) {
    const sliderContainer = document.getElementById('slider');
    sliderContainer.innerHTML = data.map(createCarouselItem).join('');
}

// Call the populateCarousel function with the carouselData array
populateCarousel(carouselData);
const sliderContainer = document.getElementById("slider");
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

sliderContainer.addEventListener("touchstart", touchStart);
sliderContainer.addEventListener("touchmove", touchMove);
sliderContainer.addEventListener("touchend", touchEnd);
sliderContainer.addEventListener("touchcancel", touchEnd);
function touchStart(event) {
  if (!isDragging) {
    isDragging = true;
    startX = event.touches[0].clientX;
  }
}

function touchMove(event) {
    if (isDragging) {
      const currentX = event.touches[0].clientX;
      const diffX = currentX - startX;
      currentTranslate = prevTranslate + diffX;

      // Limit the carousel movement to prevent scrolling past the first and last items
      const slidesPerContainer = Math.floor(containerWidth / slideWidth);
      const maxTransform = -(slideWidth * (totalSlides - slidesPerContainer));

      if (currentTranslate > 0) {
        currentTranslate = 0;
      } else if (currentTranslate < maxTransform) {
        currentTranslate = maxTransform;
      }

      sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

function touchEnd() {
  isDragging = false;
  prevTranslate = currentTranslate;
}

