let dayData = {
    SUN: { title: "", description: "" },
    MON: { title: "", description: "" },
    TUE: { title: "", description: "" },
    WED: { title: "", description: "" },
    THUS: { title: "", description: "" },
    FRI: { title: "", description: "" },
    SAT: { title: "", description: "" },
};

function storeDay(day) {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const day1Content = document.getElementById("day1Content");
    const dayButtons = document.querySelectorAll('.day');

    dayData[day].title = titleInput.value;
    dayData[day].description = descriptionInput.value;

    day1Content.innerHTML = `
        <input id="title1" type="text" placeholder="Title" value="${dayData[day].title}">
        <input id="description1" type="text" placeholder="Description" value="${dayData[day].description}">
        <button class="float" onclick="deleteData('${day}')">Delete</button>
    `;

   
    dayButtons.forEach(button => {
        button.classList.remove('active');
    });

    
    const clickedButton = document.getElementById(day);
    clickedButton.classList.add('active');
}

function deleteData(day) {
    const day1Content = document.getElementById("day1Content");
    const dayButtons = document.querySelectorAll('.day');

    dayData[day].title = "";
    dayData[day].description = "";

    day1Content.innerHTML = `
        <input id="title1" type="text" placeholder="Title">
        <input id="description1" type="text" placeholder="Description">
        <button class="float" onclick="deleteData('${day}')">Delete</button>
    `;

    
    dayButtons.forEach(button => {
        button.classList.remove('active');
    });
}

function saveData() {
    localStorage.setItem('dayData', JSON.stringify(dayData));
}

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    const selectedDay = document.getElementById('dateInput').value;
    storeDay(selectedDay);
    saveData();
});

window.onload = () => {
    dayData = JSON.parse(localStorage.getItem('dayData')) || dayData;

    // Highlight the initially selected day (if any)
    const selectedDay = document.getElementById('dateInput').value;
    if (selectedDay) {
        const clickedButton = document.getElementById(selectedDay);
        clickedButton.classList.add('active');
    }
};
