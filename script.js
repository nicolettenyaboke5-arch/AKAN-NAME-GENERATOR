document.getElementById('akanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Retrieve User Inputs
    const dateInput = document.getElementById('birthdate').value;
    const genderInput = document.querySelector('input[name="gender"]:checked');

    // 2. Form Input Validation
    if (!dateInput || !genderInput) {
        alert("Error: Please provide both your birthdate and gender.");
        return;
    }

    const birthDate = new Date(dateInput);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1; // Months are 0-indexed in JS
    const year = birthDate.getFullYear();
    const gender = genderInput.value;

    // Check for logical limits
    if (day < 1 || day > 31 || month < 1 || month > 12) {
        alert("Error: Invalid date format or numeric boundary values.");
        return;
    }

    // 3. Extract Formula Parameters
    const CC = parseInt(year.toString().substring(0, 2));
    const YY = parseInt(year.toString().substring(2, 4));
    const MM = month;
    const DD = day;

    // 4. Calculate Day of the Week via the Required Formula
    // Added +35 to eliminate negative results during modulus evaluation
    let dayOfWeek = Math.floor(((CC / 4) - (2 * CC) - 1 + (5 * YY / 4) + (26 * (MM + 1) / 10) + DD) % 7);
    
    // Normalize index configuration to ensure it matches Sunday(0) through Saturday(6)
    dayOfWeek = (dayOfWeek + 7) % 7;

    // 5. Setup Data Structures
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
    const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

    let akanName = "";
    if (gender === "male") {
        akanName = maleNames[dayOfWeek];
    } else {
        akanName = femaleNames[dayOfWeek];
    }

    // 6. Manipulate DOM to Output Results Safely
    const bornDay = days[dayOfWeek];
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');

    resultText.textContent = `You were born on a ${bornDay}. Your Akan name is ${akanName}!`;
    resultSection.classList.remove('hidden');
});

// 7. Clear Form Fields After Event To Boost Portfolio State Polish
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('akanForm').reset();
    document.getElementById('resultSection').classList.add('hidden');
});
