console.log('dziala')

const buttons = document.querySelectorAll('.user-card__btn');
const dashboardEl = document.querySelector('.dashboard');

console.log(dashboardEl);


const fetchData = async () => {
    const response = await fetch('./data.json');
    const activityData = await response.json();
    return activityData; 
}

const generateText = (clickedButton) => {
    switch (clickedButton) {
        case 'daily':
            return 'Last day'
        case 'weekly':
            return 'Last week'
        case 'monthly':
            return 'Last month'
    }
}


const renderActivity = async (clickedButton) => {
    data = await fetchData();
    console.log(clickedButton);

    const textForSpan = generateText(clickedButton)
    

    data.forEach(activity => {
        const timeframes = activity.timeframes[clickedButton];
        const classToAdd = activity.title.toLowerCase().replace(/\s/g, '-')
        const htmlString = `<div class="activity activity-${classToAdd}">
                                <div class="activity-info">
                                    <div class="activity-info__header">
                                        <span class="activity-info__name">${activity.title}</span>
                                        <button class="activity-btn">
                                            <img src="./images/icon-ellipsis.svg" alt="">
                                        </button>
                                    </div>
                                    <div class="activity-info__data">
                                        <span class="activity__time">${timeframes.current}${timeframes.current === 1 ? 'hr' : 'hrs'}</span>
                                        <span class="activity__last">${textForSpan} - ${timeframes.previous}${timeframes.previous === 1 ? 'hr' : 'hrs'}</span>
                                    </div>
                                </div>
                            </div>`
        dashboardEl.insertAdjacentHTML('beforeend', htmlString)
    })
}

//remove active from all btns and add active class to clicked button

const markActiveButton = (button) => {
    buttons.forEach(btn => {
        btn.classList.remove('user-card__btn-active');
    }) 
    button.classList.add('user-card__btn-active')

} 

//clear existing activities - remove them from html
const clearActivities = () => {
    const allActiviteies = document.querySelectorAll('.activity'); 
    console.log(allActiviteies);
    allActiviteies.forEach(activity => activity.remove());
}

// listen to events

buttons.forEach(button => {
    button.addEventListener('click', () => {
        clearActivities();
        markActiveButton(button);
        const clickedButton = button.dataset.button_type
        // console.log(clickedOption)
        renderActivity(clickedButton)
    })
})

fetchData();
renderActivity('daily');

// https://dev.to/jeannienguyen/insertadjacenthtml-vs-innerhtml-4epd insertAdjacentHTML