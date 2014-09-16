/**
 * Created by samminns on 16/09/14.
 */
function spitToList(arr) {
    var splitList = new Array();
    arr.forEach(function (coll) {
        coll.data.List.forEach(function (house) {
            if (house.RateableValue && parseInt(house.RateableValue, 10) > 100000 && house.GeographicLocation != undefined) {
                splitList.push(house);
            }
        })
    })
    return splitList;
}
function splitToBand(col) {
    var allBandsArr = new Array();
    var inc = col.length / bands;
    var num = inc;
    var idx = 0;
    for (var i = 0; i < bands; i++) {
        var band = col.slice(idx, num);
        idx = num;
        num += inc;
        allBandsArr.push(band);
    }
    return allBandsArr;
}

function priceSort(a, b) {
    console.log("sorting fings");
    return a.RateableValue - b.RateableValue;
}
