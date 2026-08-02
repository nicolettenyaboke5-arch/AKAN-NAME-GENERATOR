let form = document.getElementById("birthForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let birthdate = document.getElementById("birthdate").value;
    let gender = document.querySelector('input[name="gender"]:checked');

    if (birthdate == "" || gender == null) {
        alert("Please enter your birthdate and choose your gender.");
        return;
    }

    let date = new Date(birthdate);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let CC = parseInt(year.toString().substring(0, 2));
    let YY = parseInt(year.toString().substring(2, 4));

    let answer = ((CC / 4) - (2 * CC) - 1 + (5 * YY / 4) + (26 * (month + 1) / 10) + day) % 7;

    answer = Math.floor(answer);

    if (answer < 0) {
        answer = answer + 7;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let boys = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    let girls = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    let dayBorn = days[answer];
    let akanName = "";

    if (gender.value == "male") {
        akanName = boys[answer];
    } else {
        akanName = girls[answer];
    }

    document.getElementById("resultText").textContent =
        "You were born on " + dayBorn + ". Your Akan name is " + akanName + ".";

    document.getElementById("resultSection").classList.remove("hidden");
});

let clearButton = document.getElementById("clearBtn");

clearButton.addEventListener("click", function() {
    document.getElementById("birthForm").reset();
    document.getElementById("resultSection").classList.add("hidden");
});
