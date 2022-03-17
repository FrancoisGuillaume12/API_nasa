let date;

    
document.getElementById("choose1").valueAsDate = new Date();

date = document.getElementById("choose1");


function choosePhoto() {
 
    fetch(`https://api.nasa.gov/planetary/apod?api_key=SMLVn1hBRY5nAvArzdNIlwT2WB95Z3FGQlAVpRSF&date=${date.value}`)
    .then((res) =>{

        if (res.status == 400) {
            document.getElementById('title')
            .textContent = "INVALIDE DATE"
            
            document.getElementById('content')
            .textContent = "the date must be between June-16-1995 and today's date!"
            
            $('#modal').appendTo("body").modal('show')
            
            return Promise.reject("INVALID_DATE")
        }
        
        else if (res.status == 404){
            document.getElementById('title')
            .textContent = "INVALIDE DATE"
            
            document.getElementById('content')
            .textContent = `there is no media at the date of ${date.value} `
            
            $('#modal').appendTo("body").modal('show')
            
            return Promise.reject("INVALID_DATE")
        }
          
        return res.json()

    }
)
    .then((data) => {
        
        const nasa = data;
        let info = document.getElementById("card")
        info.innerHTML =""
        

        let urlA = new URL(nasa.url)
        let domain = urlA.hostname 

        let element ;

        if(domain === "www.youtube.com"){
            
            element =`
                <iframe  src=" ${nasa.url} " class=" pt-5 card-img-top" width="500px" height="600px" alt="image du jour" style="width: 50em;"></iframe>
            `
        
        }
        else{
            element =`
                <img  src=" ${nasa.url} " class=" pt-5 card-img-top" width="500px" height="600px" alt="image du jour" style="width: 50em;" />
            `
        }

        
        let template = `
                        <div class=" text-center shadow-lg p-3 mb-5 bg-white rounded card" style="width: 60rem;">
                        <h1 title="name" id="header"> ${nasa.title} </h1>
                        <p tiltle="date" id="date"> ${nasa.date} </p>
                            <div id="card2" class="d-flex justify-content-center">
                            ${element}
                            </div>
                            <div  class="card-body">
                            <h3 class="text-decoration-underline" >description : </h3>
                            <p id="content" class=" p-5 card-text"> ${nasa.explanation} </p>
                            </div>
                        </div>
        `
        
        info.innerHTML = template

        
    }).catch (error => {
        console.log(error);
    })
        
};
