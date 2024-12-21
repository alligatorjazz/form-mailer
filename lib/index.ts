export function camelCaseToTitleCase(str: string) {
	const wordList = str.split(/(?=[A-Z])/g);
	return wordList.map(word => word.at(0)?.toUpperCase() + word.slice(1)).join(" ");
}

export function titleCaseToCamelCase(str: string) {
	const wordList = str.split(" ");
	const firstWord = wordList[0].at(0)?.toUpperCase() + wordList[0].slice(1);
	return [firstWord, ...wordList.slice(1).map(word => word.at(0)?.toUpperCase() + word.slice(1))].join("");
}
