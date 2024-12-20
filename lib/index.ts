export function camelCaseToTitleCase(str: string) {
	const wordList = str.split(/(?=[A-Z])/g);
	console.log(wordList);
	return wordList.map(word => word.at(0)?.toUpperCase() + word.slice(1)).join(" ");
}

// export function titleCaseToCamelCase(str: string) {
// 	const wordList = str.split(/([A-Z])/g);
// 	return wordList.map(word => word.at(0)?.toUpperCase() + word.slice(1)).join(" ");
// }
