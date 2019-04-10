function getRandomColor() {
    var letters = '1289ABEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isDark(col){
    console.log(col.r * 0.2126 + col.g * 0.7152 + col.b * 0.0722);
    if (col.r * 0.2126 + col.g * 0.7152 + col.b * 0.0722 > 255 / 2)
    {
        return false;
    }
    return true;
}

