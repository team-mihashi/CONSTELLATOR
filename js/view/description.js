// Set global values
let canClick = false;
let displayConstellationIdx;
let coordinates = {};
const MAX_DESCRIPTION_SIZE = 100;

// Judge if nearest point is where and it is in 50 px
const judgeIfDisplayDescription = (x, y) => {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
            if (Math.abs(points[i][j][0] - x) < 20 && Math.abs(points[i][j][1] - y) < 20) {
                coordinates.x = x;
                coordinates.y = y;
                displayConstellationIdx = i;
                return true;
            }
        }
    }
    return false;
}

// Event listeners
canvas.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (judgeIfDisplayDescription(x, y)) {
        canClick = true;
        $('.canvas-wrapper').css('cursor', 'pointer');
    } else {
        canClick = false;
        $('.canvas-wrapper').css('cursor', 'default');
    }
});

canvas.addEventListener('click', (e) => {
    if (canClick) {
        if ($('.description').length) {
            $('.description')[0].remove();
        }
        $('.canvas-wrapper').append('<div class="description"></div>');
        let descriptionStyle = {};
        if (coordinates.x + MAX_DESCRIPTION_SIZE > canvas.width) {
            descriptionStyle['right'] = canvas.width - coordinates.x + 'px';
        } else {
            descriptionStyle['left'] = coordinates.x + 'px';
        }
        if (coordinates.y + MAX_DESCRIPTION_SIZE > canvas.height) {
            descriptionStyle['bottom'] = canvas.height - coordinates.y + 'px';
        } else {
            descriptionStyle['top'] = coordinates.y + 'px';
        }
        descriptionStyle['min-width'] = MAX_DESCRIPTION_SIZE + 'px';
        descriptionStyle['min-height'] = MAX_DESCRIPTION_SIZE + 'px';
        descriptionStyle['max-width'] = canvas.width;
        descriptionStyle['max-height'] = canvas.height;
        $('.description').css(descriptionStyle);
        $('.description').append('<p>' + constellations[displayConstellationIdx].name + '</p>');
        $('.description').append('<p>' + constellations[displayConstellationIdx].description + '</p>')
    } else {
        $('.description').remove();
    }
})