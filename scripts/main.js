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
        matchList.innerHTML = '';
    }

    outputHtml(matches);
}

// Print html
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.title}</h4>
                <h6>${match.body}</h6>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchFile(search.value));