const search = document.getElementById('search');
const matchList = document.getElementById('result');
var flag = 0;

search.addEventListener('input', () => searchFile(search.value));

// Search data.json & filter
const searchFile = async searchText => {
    const response = await fetch('data/data.json');
    const data = await response.json();
    
    // Match text to result
    let matches = data.filter(result => {
        const regex = new RegExp(`${searchText}`, 'gim');
        return result.title.match(regex) || result.body.match(regex);
    });

    if(searchText.length === 0 && flag == 1) {
        matches = [];
        matchList.innerHTML = '';
        flag = 0;
    }

    outputHtml(matches);
}

// Print html
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class="card card-body">
                <h4>${match.title}</h4>
                <h6>${match.body}</h6>
            </div>
        `).join('');

        matchList.innerHTML = html;
        flag = 1;
    } else if (flag == 1) {
        matchList.innerHTML = `
        <div class="card card-body">
        <h4>No results found...</h4>
        </div>
        `;
    }
    showLoading();
    setTimeout(animateCards, 2000);
}

//Display animations
function showLoading() {
    $('#loading').show(200);
}

function animateCards(){
    var i = 1;
    $('#loading').hide(100);
    $('.card').each(function(){
        var self = $(this);
        setTimeout(function(){
            self.slideDown(i*300);
            i++;
        });    
    });
}