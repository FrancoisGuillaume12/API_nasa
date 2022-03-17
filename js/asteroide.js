let date1;
let date2;

let date = new Date();
date.setDate(date.getDate()-7);;

    
document.getElementById("choose1").valueAsDate = date ;
document.getElementById("choose2").valueAsDate = new Date();

date1 = document.getElementById("choose1");
date2 = document.getElementById("choose2");


function checkDate(verif1, verif2){

    verif1 = Date.parse(verif1)
    verif2 = Date.parse(verif2)

    const range = 1000 * 60 * 60 * 24 * 7

    if (verif2 >= verif1){


        if (verif2 - verif1 <= range){
            return true
        }
        else{
            
            document.getElementById('title')
            .textContent = "INVALID DATE"
        
            document.getElementById('content')
            .textContent = "the two dates more than 7 days apart !"
        
            $('#modal').appendTo("body").modal('show')
        }
    }
    else{
        document.getElementById('title')
        .textContent = "INVALID DATE"
        
        document.getElementById('content')
        .textContent = "the second date must be equal to or greater than the first date !"
        
        $('#modal').appendTo("body").modal('show')
    }
}



function chooseDate(){
    if( ! checkDate(date1.value, date2.value)){
        return
    }
    
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date1.value}&end_date=${date2.value}&api_key=SMLVn1hBRY5nAvArzdNIlwT2WB95Z3FGQlAVpRSF`)
    .then((res) => res.json())
    .then((data) => {

        let tableauInfo = document.getElementById("card")
        tableauInfo.innerHTML = "";
        for (let key in data.near_earth_objects) {

            let card2;

            for (let index in data.near_earth_objects[key]) {

                for (const key2 in data.near_earth_objects[key][index].close_approach_data) {
                    
                    let info3 = data.near_earth_objects[key][index].close_approach_data[key2];
                    card2 =                 
                    `
                            <li> close approach date : ${info3.close_approach_date} </li>
                            <li> close approach date full : ${info3.close_approach_date_full} </li>
                            <li> epoch date close approach : ${info3.epoch_date_close_approach} </li>
                            <li> kilometers per second : ${info3.relative_velocity.kilometers_per_second} </li>
                            <li> kilometers per hour : ${info3.relative_velocity.kilometers_per_hour} </li>
                            <li> miles per hour : ${info3.relative_velocity.miles_per_hour} </li>
                            <li> miss distance astronomical : ${info3.miss_distance.astronomical} </li>
                            <li> miss distance lunar : ${info3.miss_distance.lunar} </li>
                            <li> miss distance kilometers : ${info3.miss_distance.kilometers} </li>
                            <li> miss distance miles : ${info3.miss_distance.miles} </li>
                            <li> orbiting body : ${info3.orbiting_body} </li>
                        `
                };
                
                let info2 = data.near_earth_objects[key][index];
                let card =
                `
                        <div class="shadow-lg p-3 mb-5 bg-white m-2 card" style="width: 32rem;">
                            <h2 class="text-center"> ${info2.name} </h2>
                            <h3 class="text-center"> date : ${key} </h3>
                            <div class="card-body">
                                <ul>
                                <li>absolute magnitude h : ${info2.absolute_magnitude_h} </li>
                                <li>estimated diameter in kilometers min : ${info2.estimated_diameter.kilometers.estimated_diameter_min} </li>
                                <li>estimated diameter in kilometers max : ${info2.estimated_diameter.kilometers.estimated_diameter_max} </li>
                                <li>estimated diameter in meters min : ${info2.estimated_diameter.meters.estimated_diameter_min} </li>
                                <li>estimated diameter in meters max : ${info2.estimated_diameter.meters.estimated_diameter_max} </li>
                                <li>estimated diameter in miles min : ${info2.estimated_diameter.miles.estimated_diameter_min} </li>
                                <li>estimated diameter in miles max : ${info2.estimated_diameter.miles.estimated_diameter_max} </li>
                                <li>estimated diameter in feet min : ${info2.estimated_diameter.feet.estimated_diameter_min} </li>
                                <li>estimated diameter in feet max : ${info2.estimated_diameter.feet.estimated_diameter_max} </li>
                                <li>is potentially hazardous asteroid : ${info2.is_potentially_hazardous_asteroid} </li>
                                ${card2}
                                <li>is sentry object : ${info2.is_sentry_object} </li>
                                </ul>
                            </div>
                        </div>
                    
                `
                tableauInfo.innerHTML += card;              
                
            };            
        };
    });
};
    

