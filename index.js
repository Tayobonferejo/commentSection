
const commentContainer = document.getElementById("mainContainer");
const myForm = document.getElementById("submit-button");

async function loadComment() {
  try {
    let data = JSON.parse(localStorage.getItem("comment"));

    if (!data) {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error("Failed to load JSON file");

      data = await response.json();
      localStorage.setItem("comment", JSON.stringify(data));
    }

    commentContainer.innerHTML = ""; // clear old items

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
                        <p><a href="#" class="replyBtn">reply</a></p>
                    </div>
                </div>
                <p class="content">${comment.content}</p>
            </div>
            <div class="upvote">
                <div><img src="/images/icon-plus.svg" alt="reply"></div>
                <div class="score">${comment.score}</div>
                <div><img src="/images/icon-minus.svg" alt="reply"></div>
            </div>
        </div>
      `;
      commentContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

loadComment();

// 🧩 Add new comment
myForm.addEventListener("click", function(event) {
  event.preventDefault();
  const getUserComment = document.getElementById("getInput").value;

  if (getUserComment === "") {
    alert("Enter your comment");
  } else {
    const cardReply = document.createElement("div");
    cardReply.className = "card";
    cardReply.innerHTML = `
      <div class="card-header">
          <div>
              <div class="profile-card">
                  <div class="profile">
                      <img src="/images/avatars/image-juliusomo.png" alt="image-juliusomo">
                      <div class="name">juliusomo</div>
                      <div>now</div>
                  </div>
                  <div class="menu-div">
                      <div class="menu">
                          <img src="/images/icon-delete.svg" alt="delete">
                          <p><a href="#" class="deleteBtn">delete</a></p>
                      </div>
                      <div class="menu">
                          <img src="/images/icon-edit.svg" alt="edit">
                          <p><a href="#" class="editBtn">edit</a></p>
                      </div>
                  </div>
              </div>
              <p class="content">${getUserComment}</p>
          </div>
          <div class="upvote">
              <div><img src="/images/icon-plus.svg" alt="reply"></div>
              <div class="score">0</div>
              <div><img src="/images/icon-minus.svg" alt="reply"></div>
          </div>
      </div>
    `;

    commentContainer.appendChild(cardReply);
    document.getElementById("getInput").value = ""; // clear textarea
  }
});




// ✅ Inline Edit Handler — works for dynamically added comments too
commentContainer.addEventListener("click", (event) => {
  const editButton = event.target.closest(".editBtn");
  if (!editButton) return; // not clicking an edit button

  const card = editButton.closest(".card");
  const content = card.querySelector(".content");
  if (!content) return;

  // Prevent duplicate textareas
  if (card.querySelector("textarea")) return;

  // Create editable textarea
  const textarea = document.createElement("textarea");
  textarea.className = "edit-textarea";
  textarea.value = content.textContent.trim();

  // Replace the <p> with <textarea>
  content.replaceWith(textarea);

  // Create update button
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.className = "updateBtn";
  textarea.after(updateBtn);

  // Save new text when clicking "Update"
  updateBtn.addEventListener("click", () => {
    const newText = textarea.value.trim();
    if (newText === "") {
      alert("Comment cannot be empty!");
      return;
    }

    // Create new <p> and replace textarea
    const newContent = document.createElement("p");
    newContent.className = "content";
    newContent.textContent = newText;

    textarea.replaceWith(newContent);
    updateBtn.remove();

    // (Optional) Save the updated comments
    localStorage.setItem("commentContainerHTML", commentContainer.innerHTML);
  });
});




commentContainer.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".deleteBtn");
  if (!deleteButton) return; // if not a delete button, do nothing

  const card = deleteButton.closest(".card");
  if (card) {
    card.remove(); // deletes the entire comment card
  }
});


// 🧩 Handle reply button clicks dynamically
commentContainer.addEventListener("click", (event) => {
  const replyButton = event.target.closest(".replyBtn");
  if (!replyButton) return;

  const card = replyButton.closest(".card");

  // Prevent multiple reply boxes under the same comment
  if (card.querySelector(".reply-box")) return;

  // Create reply box container
  const replyBox = document.createElement("div");
  replyBox.className = "reply-box";
  replyBox.innerHTML = `
    <textarea class="reply-input" placeholder="Write a reply..."></textarea>
    <button class="send-reply-btn">Send</button>
  `;

  // Insert reply box right below the comment
  card.appendChild(replyBox);
});

// 📨 Handle sending replies
commentContainer.addEventListener("click", (event) => {
  const sendBtn = event.target.closest(".send-reply-btn");
  if (!sendBtn) return;

  const replyBox = sendBtn.closest(".reply-box");
  const replyText = replyBox.querySelector(".reply-input").value.trim();
  const card = sendBtn.closest(".card");

  if (replyText === "") {
    alert("Please enter your reply!");
    return;
  }

  // ✅ Create reply container
  const replyCard = document.createElement("div");
  replyCard.className = "reply-card";
  replyCard.innerHTML = `
    <div class="card-header">
          <div>
              <div class="profile-card">
                  <div class="profile">
                      <img src="/images/avatars/image-juliusomo.png" alt="image-juliusomo">
                      <div class="name">juliusomo</div>
                      <div>now</div>
                  </div>
                  <div class="menu-div">
                      <div class="menu">
                          <img src="/images/icon-delete.svg" alt="delete">
                          <p><a href="#" class="deleteBtn">delete</a></p>
                      </div>
                      <div class="menu">
                          <img src="/images/icon-edit.svg" alt="edit">
                          <p><a href="#" class="editBtn">edit</a></p>
                      </div>
                  </div>
              </div>
              <p class="content">${replyText}</p>
          </div>
          <div class="upvote">
              <div><img src="/images/icon-plus.svg" alt="reply"></div>
              <div class="score">0</div>
              <div><img src="/images/icon-minus.svg" alt="reply"></div>
          </div>
      </div>
  `;

  // Append reply under this comment
  card.appendChild(replyCard);

  // Clear reply box
  replyBox.remove();

  // (Optional) Save state
  localStorage.setItem("commentContainerHTML", commentContainer.innerHTML);
});



