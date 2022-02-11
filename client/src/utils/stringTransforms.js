
function levelSuffixTransform(level) {
    let levelSuffix = '';
    switch (level) {
        case '1': 
            levelSuffix = '1st';
            break;
        case '2': 
            levelSuffix = '2nd';
            break;
        case '3': 
            levelSuffix = '3rd';
            break;
        default:
            levelSuffix = level + 'th';
            break;
    } 
    return levelSuffix
}

export {
    levelSuffixTransform
};