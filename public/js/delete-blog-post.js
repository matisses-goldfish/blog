const deleteHandler = async (event) => {
  event.preventDefault();
      const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  
      const response = await fetch(`/api/blog_post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog post');
      }
    
  };

document.querySelector('.deleteBtn').addEventListener('submit', deleteHandler);
