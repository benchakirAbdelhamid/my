
const Access_Key = `9VLgVsvIPbEgvJR-liIN0t9jRPAYXTPqdffPEeb2wHc`
const Secret_key = `iJ_e7tEIr0BDoTw2zjqtzyaKbpvApNV4OFloG1raPRY`
const my_nbr_images = 10
let count = 0

const parent_collection = document.getElementById('parentCollection');

const collections = [
    'animal','car','People','model man',
    'hacking' ,'security',
    'sport','historic','3D Renders','Wallpapers',
    'Business Work','Fashion','Textures & Patterns    ',
    'Experimental','Architecture','Nature',
    'Athletics','Arts & Culture','Spirituality ','Animals','Travel',
    'Street Photography','Interiors','Health & Wellness','Food & Drink  ',
    ,'Experimental    ','Editorial    ','programming' ,'site web',
    'marocco' ,'gaming' ,'action','design','style'
];

function load(divv_parent_loading , situation){
    const img_load = document.querySelector('img[alt="loading"]')
    const parent_img_load =  document.createElement('span')
    parent_img_load.appendChild(img_load)
    if(situation === 'true'){
        img_load.style.display = "block";
    } else {
        img_load.style.display = "none";
    }
    divv_parent_loading.appendChild(parent_img_load)
}
// load(document.body,'false')
// load(document.body,'true')

function create_img(id,url_full,url_small,alt,parent,callback_overlay){
    const image  = document.createElement('img')
    image.setAttribute('id',  id ) 
    image.setAttribute('data-urlFull',url_full) 
    image.setAttribute('onclick',callback_overlay) 
    image.style.height = '160px'
    image.src = url_small
    image.alt = alt
    parent.appendChild(image)
}

for(let c in collections) {
    const xhttp = new XMLHttpRequest()
    function sendReauest(myAccess_Key,collection,nbr_images){
        xhttp.open("GET" ,
     `https://api.unsplash.com/search/photos/?query=${collection}&per_page=${nbr_images}&client_id=${myAccess_Key}`,
     true )
     xhttp.send()
     }      
     sendReauest(Access_Key,collections[c],my_nbr_images)
     xhttp.onreadystatechange = function () {
         if (this.readyState === 4 && this.status === 200) {
             data = JSON.parse(this.responseText);
            //  console.log(  collections[c]  , data  )
             parent_collection.innerHTML += `
             <section id="${collections[c]}">
             <h1 class="title">${collections[c]}</h1>
             <article id="article_images${collections[c]}" >  </article>
             </section>`;
           const article_images_parent = document.getElementById(`article_images${collections[c]}`)
           for(let x in data.results) {
            count += 1
            create_img(`id_${count}`, data.results[x].urls.full, data.results[x].urls.small ,data.results[x].description,article_images_parent,`overlay('${count}')` ) 
            } 
            load(document.body,'false')  
        }else{
            load(document.body,'true')
        }
    }
}

// icon ferme 
const iconclose = document.querySelector('svg')
iconclose.style.display = 'none'
function overlay(count){
    const img = document.querySelector(`#id_${count}`)
    // console.log(img)
    // console.log(count)
 
    let popupBox = document.createElement("div")
    popupBox.className = 'popup-box1'
    let imgHeading = document.createElement("h3")
    let imgText = document.createTextNode(img.alt)
    imgHeading.appendChild(imgText)
    popupBox.appendChild(imgHeading)
    
    let parent_popupBox = document.createElement("div")
    parent_popupBox.className = 'parent_popupBox'
    let pupopImage = document.createElement("img")
    pupopImage.className = 'img_pupop'
    
    pupopImage.src = img.getAttribute('data-urlFull')
    popupBox.appendChild(pupopImage)
    parent_popupBox.appendChild(popupBox)
    
    // --------------download------------------
    const link =  document.createElement('a')
    // link.setAttribute('href' , img.getAttribute('data-urlFull') ) 
    link.setAttribute('id',`download${count}`)
    link.setAttribute('onclick' , `limk( ${count})` ) 
    link.className = 'icon_download_link'

    const download = document.createElement('img')
    download.src = 'download.svg'
    link.appendChild(download)
    parent_popupBox.appendChild(link)
    
    // ----------------------------------------

    // icon previouse  <==
    const icon_previeu = document.createElement('img')
    icon_previeu.src = 'previe.svg'
    icon_previeu.setAttribute('class','icon_switch_prev') 
    icon_previeu.setAttribute('onclick' , `previo('${count}')` ) 
    parent_popupBox.appendChild(icon_previeu)
    
    // icon next ==>
    const icon_next = document.createElement('img')
    icon_next.src = 'next.svg'
        icon_next.setAttribute('class','icon_switch_next') 
        icon_next.setAttribute('onclick' , `nexto('  ${   count}')` ) 
        parent_popupBox.appendChild(icon_next)

    document.body.appendChild(parent_popupBox)

    iconclose.style.display = 'block'
    document.body.appendChild(iconclose)
    
    document.addEventListener("click" , function(e){
        if( e.target.className == 'parent_popupBox'  ){
            document.querySelector(".popup-box1").remove()
        document.querySelector(".parent_popupBox").remove()
        iconclose.style.display = 'none'
        n_icon_n = 0
    }
})
iconclose.addEventListener('click',function(){
    document.querySelector(".popup-box1").remove()
    document.querySelector(".parent_popupBox").remove()
    iconclose.style.display = 'none'
    n_icon_n = 0
})

}


let n_icon_n = 0
function nexto(n){
n_icon_n += 1

const img = document.querySelector(`#id_${ parseFloat(n) + n_icon_n  }`)

const img_pupop_next = document.querySelector(".parent_popupBox .popup-box1 .img_pupop")
const title_popup_box = document.querySelector(".parent_popupBox .popup-box1 h3")
title_popup_box.innerHTML = img.alt
img_pupop_next.src = img.src
img_pupop_next.alt = img.alt
}

function previo(p){
    n_icon_n -= 1
    const imgg = document.querySelector(`#id_${  parseFloat(p) + n_icon_n   }`)
    const img_pupop_prev = document.querySelector(".parent_popupBox .popup-box1 .img_pupop")
    const title_popup_box = document.querySelector(".parent_popupBox .popup-box1 h3")
    title_popup_box.innerHTML = imgg.alt
    img_pupop_prev.src = imgg.src
    img_pupop_prev.alt = imgg.alt
    if( parseFloat(p) + n_icon_n === 1){
        alert( " Can't this is the first picture  ")    
    } 
}  

function limk(c){
    console.log(c)
    const img_download = document.querySelector(".parent_popupBox .popup-box1 .img_pupop")
    const id_download = document.querySelector(`#download${c}`)
    // id_download.setAttribute('href' , '1.jpg' ) 
    id_download.setAttribute('href' , img_download.src ) 
    id_download.setAttribute('download','')
    // console.log(id_download)
    
}



// const IMG_URL = "https://media.gettyimages.com/photos/closeup-network-space-picture-id1013942164?s=612x612";


// function toDataURL(url) {
//   return fetch(url).then((response) => {
//           return response.blob();
//       }).then(blob => {
//           return window.URL.createObjectURL(blob);
//       });
// }

// async function download() {    
//     const a = document.createElement("a");
//     a.href = await toDataURL(IMG_URL);
//     a.download = "myImage.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }


// const mylink = document.createElement('a')
// mylink.setAttribute('id' , 'link')
// mylink.setAttribute('href' , '#')
// mylink.setAttribute('class' , 'classMyLink')

// const text = document.createTextNode('download')
// mylink.appendChild(text)
// document.body.appendChild(mylink)

// document.addEventListener('click' , function(e)  {
//   if(e.target.className == 'classMyLink'){
//     download()
//     console.log('aaaa')
//   }
// })


