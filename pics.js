const cloudName = 'dufjup172';
const uploadPreset = 'our-album';
const folder = 'our-pics';

const myWidget = cloudinary.createUploadWidget({
    cloudName,
    uploadPreset,
    folder
},(error,result) => {
    if(!error && result && result.event ==="success"){
        console.log("uploaded")
//        showImages();
    }
}
);

document.getElementById('upload-widget').addEventListener("click",() => {
    myWidget.open();
});


async function showImages(){
    const gallery = document.getElementById("gallery");
    gallery.innerHTML='<p>Loading...</p>';

    try{
        const response = await fetch("https://res.cloudinary.com/${cloudName}/image/list/${folder}.json");
        if(!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();

        gallery.innerHTML='';
        data.resources.forEach((img) => {
            const imgEl = document.createElement('img');
            imgEl.src = `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.jpg`;
            gallery.appendChild(imgEl);
            console.log("a picture");
        }); 
    }catch(err){
        console.error(err);
        gallery.innerHTML = "<p>Failed to load images. Please try again later.</p>";
    }
}

showImages();
