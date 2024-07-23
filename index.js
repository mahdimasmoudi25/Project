// Sample data for cars (replace with your actual data)
const cars = [
    { id: 1, brand: "Toyota", model: "Camry", price: 25000 },
    { id: 2, brand: "Honda", model: "Civic", price: 22000 },
    { id: 3, brand: "Ford", model: "Mustang", price: 35000 },
    { id: 4, brand: "BMW", model: "X5", price: 50000 }
];

document.addEventListener("DOMContentLoaded", function() {
    const carList = document.getElementById("car-list");
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Function to display cars
    function displayCars() {
        carList.innerHTML = "";
        cars.forEach(car => {
            const carItem = document.createElement("div");
            carItem.classList.add("car-item");
            carItem.innerHTML = `
                <h3>${car.brand} ${car.model}</h3>
                <p>Price: $${car.price}</p>
                <button class="viewBtn" data-car-id="${car.id}">View Details</button>
            `;
            carList.appendChild(carItem);
        });
    }

    // Event listener to open modal and display car details
    carList.addEventListener("click", function(e) {
        if (e.target.classList.contains("viewBtn")) {
            const carId = parseInt(e.target.getAttribute("data-car-id"));
            const car = cars.find(c => c.id === carId);
            modalBody.innerHTML = `
                <h2>${car.brand} ${car.model}</h2>
                <p>Price: $${car.price}</p>
            `;
            modal.style.display = "block";
        }
    });

    // Event listener to close modal
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Event listener to add car to cart (using localStorage)
    addToCartBtn.addEventListener("click", function() {
        const carId = parseInt(document.querySelector(".viewBtn").getAttribute("data-car-id"));
        const selectedCar = cars.find(car => car.id === carId);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(selectedCar);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Car added to cart!");
        modal.style.display = "none";
    });

    // Display cars when page loads
    displayCars();

    // Form submission handler for contact form
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        // Here you can implement the logic to handle the form submission (e.g., send an email, store in database, etc.)
        alert(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
    });
});
