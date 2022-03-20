const commentFormHandler = async (event) => {
    event.preventDefault();

	console.log('this is the form handler function before the if statements')

    const response = document.querySelector('#newComment').value.trim();

    // need to append an element onto dashboard page on each post
    if (response) {
        const newComment = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ response }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('successfully created a new coment')

        if (newComment.ok) {
			document.location.replace('/');
        } else {
            alert(newComment.statusText)
        }
    }
};

document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);
