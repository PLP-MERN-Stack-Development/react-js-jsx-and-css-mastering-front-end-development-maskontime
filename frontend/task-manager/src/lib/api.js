// Small fetch-based API helper for the task manager frontend.
// Uses `import.meta.env.VITE_API_URL` if provided, otherwise defaults to '/api'.

const BASE = import.meta?.env?.VITE_API_URL || '/api'

async function request(path, options = {}) {
	const url = `${BASE}${path}`
	console.log('Making API request to:', url) // Debug log
	
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		...options,
	})

	if (!res.ok) {
		const contentType = res.headers.get('content-type')
		let message = res.statusText || 'API error'
		
		try {
			if (contentType && contentType.includes('application/json')) {
				const errorData = await res.json()
				message = errorData.message || errorData.error || message
			} else {
				const text = await res.text()
				// If it's HTML (like a 404 page), provide a more helpful message
				if (text.includes('<!doctype') || text.includes('<html')) {
					message = `Backend server not responding. Check if your backend is running on the correct port.`
				} else {
					message = text || message
				}
			}
		} catch (e) {
			// If we can't parse the error, use the status text
			message = `HTTP ${res.status}: ${res.statusText}`
		}
		
		const err = new Error(message)
		err.status = res.status
		throw err
	}

	// no content
	if (res.status === 204) return null

	// Check if response is JSON before parsing
	const contentType = res.headers.get('content-type')
	if (contentType && contentType.includes('application/json')) {
		return res.json()
	} else {
		throw new Error('Expected JSON response but received: ' + contentType)
	}
}

export async function getTasks() {
	return request('/tasks')
}

export async function getTask(id) {
	return request(`/tasks/${id}`)
}

export async function createTask(data) {
	return request('/tasks', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateTask(id, data) {
	return request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteTask(id) {
	return request(`/tasks/${id}`, { method: 'DELETE' })
}

export default {
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
}

