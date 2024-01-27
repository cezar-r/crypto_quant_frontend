const riskToColor = (value) => {
    const normalizedValue = (parseFloat(value) + 1) / 2;

    let red, green, blue;
    if (normalizedValue < 0.5) {
        blue = Math.round(255 * (1 - normalizedValue * 2));
        green = Math.round(255 * (normalizedValue * 2));
        red = 0;
    } else {
        green = Math.round(255 * (2 - normalizedValue * 2));
        red = Math.round(255 * ((normalizedValue - 0.5) * 2));
        blue = 0;
    }

    return `rgb(${red}, ${green}, ${blue})`;
};

const riskToColorTransparency = (value, transparency=0.2) => {
    const normalizedValue = (parseFloat(value) + 1) / 2;

    let red, green, blue;
    if (normalizedValue < 0.5) {
        blue = Math.round(255 * (1 - normalizedValue * 2));
        green = Math.round(255 * (normalizedValue * 2));
        red = 0;
    } else {
        green = Math.round(255 * (2 - normalizedValue * 2));
        red = Math.round(255 * ((normalizedValue - 0.5) * 2));
        blue = 0;
    }
    return `rgba(${red}, ${green}, ${blue}, ${transparency})`
}

export { riskToColor, riskToColorTransparency };
