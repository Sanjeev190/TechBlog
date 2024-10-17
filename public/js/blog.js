document.addEventListener('DOMContentLoaded', fetchBlogs);//Call the fetchBlogs function when the page loads or based on user interaction
document.querySelector("#blogForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const title = document.querySelector("#blogTitle").value.trim();
    const content = document.querySelector("#blogContent").value.trim();
  
    if (title && content) {
      // Post the blog data to the server (adjust the API endpoint as needed)
      const response = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // Blog added successfully, do something (e.g., reload page, close modal)
        alert("Blog added successfully!");
        document.querySelector("#blogForm").reset(); // Reset form
        const modalElement = document.querySelector("#blogModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide(); // Close modal
        fetchBlogs(); // Fetch and render the updated blog list
      } else {
        alert("Failed to add blog.");
      }
    }
})
    async function fetchBlogs() {
        try {
          const response = await fetch('/api/blog'); // Adjust the endpoint as necessary
          
          const blogs = await response.json(); // Parse the JSON response
        //   console.log(blogs);
          renderBlogs(blogs); // Call renderBlogs to display the fetched data
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      }
      
      // Call the fetchBlogs function when the page loads or based on user interaction
    //   document.addEventListener('DOMContentLoaded', fetchBlogs);
      
  


  function renderBlogs(blogs) {
    const blogContainer = document.getElementById('blogContainer'); // Assuming this is the ID of your container in the HTML
    blogContainer.innerHTML = ''; // Clear the existing blogs
  
    // Check if there are blogs to display
    if (blogs.length === 0) {
      blogContainer.innerHTML = '<p>No blogs available.</p>';
      return;
    }
  
    blogs.forEach(blog => {
      const blogElement = document.createElement('div'); // Create a new div for each blog
      blogElement.classList.add('blog-card', 'card', 'shadow-sm', 'mb-4'); // Add classes for styling
  
      blogElement.innerHTML = `
        <!-- Top section with title, username, and created at -->
        
 
        <div class="card-header bg-secondary text-white mb-2">
          <div class="d-flex justify-content-between">
            <h3 class="blog-title mb-0"> ${blog.title}</h3>
            <p class="blog-author mb-0">By: ${blog.user.username} in ${blog.createdAtFormatted}</p>
          </div>
        </div>
        
        <!-- Bottom section with content -->
        <div class="card-body bg-white text-dark">
          <p class="blog-text">${blog.content}</p>
          <button class="btn btn-primary btn-sm  edit-btn" edit-id=${blog.id}>Edit</button>
    <button class="btn btn-danger btn-sm  delete-btn"  data-id=${blog.id}>Delete</button>
        </div>
        </div>
        
      `;
      
      blogContainer.appendChild(blogElement); // Append the new blog to the container
    });
  }

//  
document.getElementById('blogContainer').addEventListener('click', async function(event) {
    if (event.target.classList.contains('delete-btn')) {
      console.log('delete button clicked');
      const id = event.target.getAttribute('data-id');

      console.log(id)
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // alert('Blog deleted successfully!');
        fetchBlogs(); // Reload the blogs to reflect changes
      } else {
        alert('Failed to deletess blog.');
      }
    }
  });

document.getElementById('blogContainer').addEventListener('click', async function(event) {
    if (event.target.classList.contains('edit-btn')) {
      console.log('edit button clicked');
      const id = event.target.getAttribute('edit-id');
      console.log(id);
      const blogTitle = event.target.closest('.blog-card').querySelector('.blog-title').innerText;
        const blogContent = event.target.closest('.blog-card').querySelector('.blog-text').innerText;
        // prefills the modal form with the current blog details
        document.querySelector("#newBlogTitle").value = blogTitle;
        document.querySelector("#newBlogContent").value = blogContent;
        const modalElement = document.querySelector("#NewUpdateBlogModal");
        // console.log(modalElement);
        const modalInstance = new bootstrap.Modal(modalElement);
        console.log(modalInstance);
        modalInstance.show();
        document.querySelector("#newUpdateblogForm").addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent form submission
            const title = document.querySelector("#newBlogTitle").value.trim();
            const content = document.querySelector("#newBlogContent").value.trim();
            console.log('update button clicked')
            if (title && content) {
              const response = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
              });
              if (response.ok) {
                alert('Blog updated successfully!');
                modalInstance.hide(); // Close modal
                fetchBlogs(); // Reload the blogs
              } else {
                alert('Failed to update blog.');
              }
            }
          });
        }
    });


