// const commentFormHandler = async (event) => {
//     event.preventDefault();
//     const comment = document.querySelector('#newComment').value.trim();

//     // need to append an element onto dashboard page on each post
//     if (comment) {
//         const response = await fetch('/comment', {
//             method: 'POST',
//             body: JSON.stringify({ response, topic, date_created }),
//             headers: { 'Content-Type': 'application/json' },
//         });
//         console.log('create comment was a success!')
//         if (response.ok) {
//             alert('comment posted!')
//         } else {
//             alert(response.statusText)
//         }
//     }
// };

// document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);

const commentFormHandler = async function (event) {
	event.preventDefault();

	const blog_id = document.querySelector('.commentForm').dataset.blogid;

	const comment_description = document.querySelector('#newComment').value.trim();

	if (comment_description) {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				blog_id,
				comment_description,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		document.location.reload();
	}
};

document
	.querySelector('.commentForm')
	.addEventListener('submit', commentFormHandler);