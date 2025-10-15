async function loadComment() {

    try {
            // Step 1: Check localStorage first
        let data = JSON.parse(localStorage.getItem("comment"));

        if (!data) {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            data = await response.json();
            console.log(data);
            localStorage.setItem("comment", JSON.stringify(data));
        }

        const commentContainer = document.getElementById("commentContainer");

        // Step 4: Render each card
        filteredData.forEach((element, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <div class="card-container">
            <div class="card-header">
                <img src="${element.logo}" alt="${element.name}" class="icon">
            </div>
            <div class="desCont">
                <div class="name">${element.name}</div>
                <div class="description">${element.description}</div>
            </div>
        </div>
        <div class="control">
            <button class="remove-btn">Remove</button>
            <div class="toggle ${element.isActive ? "active" : ""}"></div>
        </div>
        `;
    });
}

    catch (error) {
        console.error("Error fetching data:",(error));
    }
}

loadComment();