async function loadComment() {
  try {
    // Step 1: Check localStorage
    let data = JSON.parse(localStorage.getItem("comment"));

    if (!data) {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error("Failed to load JSON file");

      data = await response.json();
      localStorage.setItem("comment", JSON.stringify(data));
    }

    const commentContainer = document.getElementById("mainContainer");
    commentContainer.innerHTML = ""; // clear old items


    // Step 2: Loop through comments
    data.comments.forEach(comment => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-header">
            <div>
                <div class="profile-card">
                    <div class="profile">
                        <img src="${comment.user.image.png}" alt="${comment.user.username}">
                        <div class="name">${comment.user.username}</div>
                        <div>${comment.createdAt}</div>
                    </div>
                    <div>
                        <img src="/images/icon-reply.svg" alt="reply">
                        <p><a href="#">reply</a></p>
                    </div>
                </div>
                <p class="content">${comment.content}</p>
            </div>
            <div class="upvote">
                <div>
                    <img src="/images/icon-plus.svg" alt="reply">
                </div>
                <div class="score">${comment.score}</div>
                <div>
                    <img src="/images/icon-minus.svg" alt="reply">
                </div>
            </div>
        </div>

    
      `;

      // append to container
      commentContainer.appendChild(card);

      // Handle replies (if any)
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          const replyCard = document.createElement("div");
          replyCard.className = "card";
          replyCard.style.marginLeft = "2rem";
          replyCard.innerHTML = `
           <div class="card-header">
            <div>
                <div class="profile-card">
                    <div class="profile">
                        <img src="${reply.user.image.png}" alt="${reply.user.username}">
                        <div class="name">${reply.user.username}</div>
                        <div>${reply.createdAt}</div>
                    </div>
                    <div>
                        <img src="/images/icon-reply.svg" alt="reply">
                        <p><a href="#">reply</a></p>
                    </div>
                </div>
                <p class="content">${reply.content}</p>
            </div>
            <div class="upvote">
                <div>
                    <img src="/images/icon-plus.svg" alt="reply">
                </div>
                <div class="score">${reply.score}</div>
                <div>
                    <img src="/images/icon-minus.svg" alt="reply">
                </div>
            </div>
        </div>
          `;
          commentContainer.appendChild(replyCard);
        });
      }
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

loadComment();
