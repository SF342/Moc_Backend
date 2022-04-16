const Productid = require('../model/Productid');
const Product = require('../model/Product');
const axios = require('axios')


async function updateProduct() {
    const data = await Productid.find();

    const now = Date.now();
    const date = new Date(now)
    //console.log(date)
    var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    //console.log(year, month, day);
    const today = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day < 10 ? "0" + day : day);
    const getWeekAgo = () => {
        const day = date.getDate() - 7;
        if (day <= 0) {
            return year + '-' + ((month - 1) < 10 ? "0" + (month - 1) : (month - 1)) + '-' + ((30 + day) < 10 ? "0" + (30 + day) : (30 + day))
        } else {
            return year + '-' + (month < 10 ? "0" + month : month) + '-' + ((day) < 10 ? "0" + (day) : (day))
        }
    }
    const weekAgo = getWeekAgo();

    const url = (product_id) => {
        return "https://dataapi.moc.go.th/gis-product-prices?product_id=" + product_id + "&from_date=" + weekAgo + "&to_date=" + today;
    }

    data.forEach(async (element) => {
        await axios.get(url(element.product_id))
            .then(async (res) => {
                if (res.data.error != "Bad Request.") {
                    console.log(res.data);
                    const {
                        product_id,
                        product_name,
                        product_desc_en,
                        product_desc_th,
                        category_name,
                        group_name,
                        unit,
                        price_min_avg,
                        price_max_avg,
                        price_list
                    } = res.data;
                    await Product.updateOne({ product_id: product_id }, {
                        product_name,
                        product_desc_en,
                        product_desc_th,
                        category_name,
                        group_name,
                        unit,
                        price_min_avg,
                        price_max_avg,
                        price_list,
                        description: "last update data" + today
                    });
                }

            })
    });

    console.log("updateProduct Success date " + today);
}

module.exports = { updateProduct };
