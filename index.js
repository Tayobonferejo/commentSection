async function loadComment() {
    try {
        let data = JSON.parse(localStorage.getItem("comment"));

        if (!data) {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            data = await response.json();
            console.log(data);
        }
    }

    catch (error) {
        console.error("Error fetching data:",(error));
    }
}

loadComment();