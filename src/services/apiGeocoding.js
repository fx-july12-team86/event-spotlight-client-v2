export async function getAddress(/*{ latitude, longitude }*/) {
    const { latitude, longitude } = await getCoords()

    // console.log(latitude, longitude)
    const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=uk`
    );
    if (!res.ok) throw Error("Failed getting address");

    const data = await res.json();
    return data;
}

function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => reject(error) // Обработка ошибки
        );
    });
}

