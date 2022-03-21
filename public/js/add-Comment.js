const commentFormHandler = async (event) => {
    event.preventDefault();

	console.log('this is the form handler function before the if statements')

    const response = document.querySelector('#response').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1 ];

    // need to append an element onto dashboard page on each post
    if (response) {
        const newComment = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 
                response,
                post_id
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (newComment.ok) {
			document.location.replace('/');
        } else {
            alert(newComment.statusText)
        }
    }
};

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);
