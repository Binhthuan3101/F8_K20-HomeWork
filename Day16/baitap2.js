const text =
  "javascript là ngôn ngữ lập trình phổ biến javascript chạy trên trình duyệt và javascript cũng chạy trên server";

function getWords(text) {
    return text.split(" ");
}

function countWord(text, word) {
    const words = getWords(text);
    let count = 0;
    for (let i = 0; i < words.length; i++){
        if (words[i] === word) {
            count++;
        }
    }
    return count;
}

function getUniqueWords(text) {
    const words = getWords(text);
    const uniqueWords = [];
    for (const word of words) {
        if (uniqueWords.indexOf(word)===-1) {
            uniqueWords.push(word);
        }
    }
     uniqueWords.sort();
    const indexVa = uniqueWords.indexOf("và");
    if (indexVa !== -1) {
        uniqueWords.splice(indexVa, 1); 
        uniqueWords.unshift("và"); 
    }
    
    return uniqueWords;
}

function getTopWords(text, n) {
    const words = getWords(text);
    const wordCounts = {};
    for (const word of words) {
        if (wordCounts[word] === undefined) {
            wordCounts[word] = 1;
        }
        else {
            wordCounts[word]++;
        }
    }
    const result = [];
    for (const key in wordCounts) {
        result.push({
            word: key,
            count:wordCounts[key]
        })
    }
    result.sort((a, b) => {
        return b.count - a.count;
    });
    return result.slice(0, n);
}

function highlight(text, word) {
    const pieces = text.split(word);
    return pieces.join("**" + word + "**");
}
console.log(getWords(text));
console.log(countWord(text, "javascript"));
console.log(countWord(text, "chạy"));
console.log(countWord(text, "python"));
console.log(getUniqueWords(text));
console.log(getTopWords(text, 3));
console.log(highlight(text, "javascript") );
