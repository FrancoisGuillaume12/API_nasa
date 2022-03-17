function photoDuJour() {
    
    

    fetch("https://api.nasa.gov/planetary/apod?api_key=SMLVn1hBRY5nAvArzdNIlwT2WB95Z3FGQlAVpRSF")
    .then((res) => res.json())
    .then((data) => {

        const nasa = data;
        
        let urlA = new URL(nasa.url)
        let domain = urlA.hostname 

        if(domain === "www.youtube.com"){
            
            let element = document.createElement("div")
            element.innerHTML =`
                <iframe id="media" src=" ${nasa.url} " class=" pt-5 card-img-top" width="500px" height="600px" alt="image du jour" style="width: 50em;"></iframe>
            `
            let div = document.getElementById("commeTuVeux")
            div.appendChild(element); 
        }
        else{
            let element2 = document.createElement("div")
            element2.innerHTML =`
                <img id="media" src=" ${nasa.url} " class=" pt-5 card-img-top" width="500px" height="600px" alt="image du jour" style="width: 50em;" />
            `
            let div2 = document.getElementById("commeTuVeux")
            div2.appendChild(element2)
        }
        
        document.getElementById('header')
        .textContent = nasa.title

        document.getElementById('date')
        .textContent = nasa.date
        
        document.getElementById('content')
        .textContent  = nasa.explanation
        
    })

};

photoDuJour();

