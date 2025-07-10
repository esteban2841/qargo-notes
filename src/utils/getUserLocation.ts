export const getUserLocation = async () : Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
				console.log("TCL: coords", coords)
                resolve([ coords.longitude, coords.latitude])
            },
            ( err )=> {
                alert('No se pudo obtener la geolocalizacion');
                console.log(err)
                reject()
            },
            {maximumAge:60000, timeout:5000, enableHighAccuracy:true}
        )
    })
}