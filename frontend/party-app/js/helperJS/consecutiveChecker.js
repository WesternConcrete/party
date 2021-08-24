export default function consecutiveChecker(username) {

	for(let i = 0; i < username.length - 1; i++) {
		if (username[i] === '.' && username[i+1] === username[i]){
			return true
		}
	}
	return false
}