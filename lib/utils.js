
function formattedLocation(data) {
    return {
        formatted_query: data[0].display_name,
        latitude: data[0].lat,
        longitude: data[0].lon,
    };
}

function formattedWeather(wdata) {
    const formattedLink = wdata.data.map((wItem) => {
        return {
            forecast: wItem.weather.description,
            time: new Date(wItem.ts * 1000).toDateString(),
        }
    })
    const final = formattedLink.slice(0, 7);
    return final;
}

function formattedReview(rdata) {
    const formattedLink = rdata.businesses.map((rItem) => {
        return {
            name: rItem.name,
            image_url: rItem.image_url,
            rating: rItem.rating,
            price: rItem.price,
            url: rItem.url
        }
    })
    return formattedLink;
}
module.exports = {
    formattedLocation,
    formattedWeather,
    formattedReview
}