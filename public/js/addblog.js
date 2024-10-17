document.getElementById('newCommentBtn').addEventListener('click', function () {
    const commentForm = document.getElementById('commentForm');
    commentForm.style.display = 'block' 
  });
  closeCommentBtn.addEventListener('click', () => {
    commentForm.style.display = 'none';
  });
  
  // Submit the new comment
  // document.addEventListener('DOMContentLoaded', fetchComments);
  document.getElementById('submitCommentBtn').addEventListener('click', async function (event) {
    event.preventDefault();
    console.log('button is clicked')
    const commentText = document.getElementById('commentText').value.trim();
    const blogId = document.getElementById('blogId').innerText; // Assuming the blog ID is available in the handlebars context
    
    if (commentText) {
      const response = await fetch(`/comment`, {
        method: 'POST',
        body: JSON.stringify({comment_text: commentText, blog_id: blogId}),
        headers: { 
          'Content-Type': 'application/json' }
      });
      console.log(response)
      
      if (response.ok) {

        alert('Comment added successfully!');
         // Clear the text area and hide the comment form
         document.getElementById('commentText').value = '';
         document.getElementById('commentForm').style.display = 'none';
 
         // Fetch the updated comments and display them
        //  fetchComments();
        alert('Comment added successfully!');
        window.location.reload(); // Reload the page to display the new comment
      } else {
        alert('Failed to add comment.');
      }
    }
  });

  async function fetchComments() {
    try {
      const response = await fetch(`/comment`);
      if (response.ok) {
        const comments = await response.json();
  
        // Clear the blogContainer
        const blogContainer = document.getElementById('blogContainer');
        blogContainer.innerHTML = '';
  
        // Loop through the comments and display them
        comments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.classList.add('col-12', 'mb-3');
  console.log(comment)
          commentElement.innerHTML = `
            <div class="card p-2">
              <p><strong>${comment.user.username}</strong> commented:</p>
              <p>${comment.comment_text}</p>
              <small class="text-muted">Posted on ${new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          `;
  
          blogContainer.appendChild(commentElement);
        });
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
