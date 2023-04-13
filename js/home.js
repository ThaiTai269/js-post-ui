import postAPI from './api/postAPI'

function createPostElement(post) {
	if (!post) return
	try {
		// find and clone template
		const postTemplate = document.getElementById('postTemplate')
		if (!postTemplate) return
		const liElement = postTemplate.content.firstElementChild.cloneNode(true)
		if (!liElement) return
		// update title, des, author, thumbnail
		const titleElement = liElement.querySelector('[data-id="title"]')
		if (titleElement) titleElement.textContent = post.title
		const desElement = liElement.querySelector('[data-id="description"]')
		if (desElement) titleElement.textContent = post.description
		const authorElement = liElement.querySelector('[data-id="author"]')
		if (authorElement) titleElement.textContent = post.author
		// attach events
		return liElement
	} catch (error) {
		console.log(error)
	}
}
function renderPostList(postList) {
	console.log(postList)
	if (!Array.isArray(postList) || postList.length === 0) return
	const ulElement = document.getElementById('postList')
	if (!ulElement) return
	postList.forEach((post) => {
		const liElement = createPostElement(post)
		ulElement.appendChild(liElement)
	})
	console.log(ulElement)
}

;(async () => {
	try {
		const queryParams = {
			_page: 1,
			_limit: 5,
		}
		const { data, pagination } = await postAPI.getAll(queryParams)
		renderPostList(data)
		console.log(data)
	} catch (err) {
		console.log(err)
	}
})()
