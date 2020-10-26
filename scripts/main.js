const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search data.json & filter
const searchFile = async searchText => {
    const response = await fetch('data/data.json');
    const data = await response.json();
    
    // Match text to result
    let matches = data.filter(result => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return result.title.match(regex) || result.body.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
    }

    console.log(matches);
}

search.addEventListener('input', () => searchFile(search.value));