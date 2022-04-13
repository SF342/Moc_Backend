const axios = require('axios')


const getDataApi = async (product_id) => {
    console.log('checkDatafFromApi');


    const now = Date.now();
    const date = new Date(now)
    //console.log(date)
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    //console.log(year, month, day);
    const today = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day < 10 ? "0" + day : day);


    const getWeekAgo = () => {

        return (year - 2) + '-' + ((month) < 10 ? "0" + (month) : (month)) + '-' + ((23 + day) < 10 ? "0" + (23 + day) : (23 + day))

    }


    const url = () => {
        const weekAgo = getWeekAgo();
        console.log(weekAgo);
        return "https://dataapi.moc.go.th/gis-product-prices?product_id=" + product_id + "&from_date=" + weekAgo + "&to_date=" + today;
    }

    let get = true;
    const fetchData = async () => {
        console.log(product_id);
        await axios.get(url())
            .then(response => {
                console.log(response.data, 11);

                if (response.data.error == "Bad Request.") {
                    return false
                } else {
                    console.log(response.data);
                    return true
                }
            })

    }

    fetchData()

}


module.exports = { getDataApi };