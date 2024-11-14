const commentsContainer = document.getElementById("comments-container");

// adding a main comment or reply
function addComment(parentElement = commentsContainer) {
    const inputField = parentElement === commentsContainer ? document.getElementById("comment-input") : parentElement.querySelector("textarea");
    const commentText = inputField.value;
    if (!commentText.trim()) return;

    // create comment element with tailwind style
    const comment = document.createElement("div");
    comment.classList.add("comment", "bg-white-100", "p-4", "rounded-lg", "shadow-sm", "relative");

    const commentContent = document.createElement("p");
    commentContent.classList.add("text-gray-800", "mb-2");
    commentContent.textContent = commentText;

    // edit Button
    const editButton = document.createElement("button");
    editButton.classList.add("text-yellow-500", "text-sm", "font-semibold", "hover:underline", "focus:outline-none", "mr-2");
    editButton.textContent = "Edit";
    editButton.onclick = () => editComment(comment, commentContent, editButton);

    // Reply Button
    const replyButton = document.createElement("button");
    replyButton.classList.add("text-blue-500", "text-sm", "font-semibold", "hover:underline", "focus:outline-none", "mr-2");
    replyButton.textContent = "Reply";
    replyButton.onclick = () => showReplyInput(comment);

    comment.appendChild(commentContent);
    comment.appendChild(editButton);
    comment.appendChild(replyButton);

    // delete button for replies
    if (parentElement !== commentsContainer) {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("text-red-500", "text-sm", "font-semibold", "hover:underline", "focus:outline-none", "absolute", "top-2", "right-2");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => comment.remove();
        comment.appendChild(deleteButton);
    }

    parentElement.appendChild(comment);
    inputField.value = ''; 
    if (parentElement !== commentsContainer) {
        const replyContainer = parentElement.querySelector(".reply-container");
        if (replyContainer) replyContainer.remove();
    }

}

// function to show reply input within a comment
function showReplyInput(comment) {
    // check if reply input already exists
    if (comment.querySelector(".reply-container")) return;

    const replyContainer = document.createElement("div");
    replyContainer.classList.add("reply-container", "mt-4", "ml-6");

    const replyInput = document.createElement("textarea");
    replyInput.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "transition");
    replyInput.placeholder = "Reply to this comment...";

    const postReplyButton = document.createElement("button");
    postReplyButton.classList.add("mt-2", "bg-blue-500", "text-white", "font-semibold", "py-1", "px-4", "rounded-lg", "hover:bg-blue-600", "transition");
    postReplyButton.textContent = "Post Reply";
    postReplyButton.onclick = () => addComment(comment);

    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(postReplyButton);

    comment.appendChild(replyContainer);
}

// function to edit a comment
function editComment(comment, commentContent, editButton) {
    // if already editing, save changes
    if (editButton.textContent === "Save") {
        commentContent.textContent = comment.querySelector("textarea").value;
        editButton.textContent = "Edit";
        comment.querySelector("textarea").remove();
    } else {
        // switch to edit mode
        const editTextarea = document.createElement("textarea");
        editTextarea.classList.add("w-full", "p-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-yellow-400", "transition", "mt-2");
        editTextarea.value = commentContent.textContent;

        comment.insertBefore(editTextarea, commentContent.nextSibling);
        editButton.textContent = "Save";
    }
}
// reset all comments
function resetComments() {
    commentsContainer.innerHTML = '';
}
