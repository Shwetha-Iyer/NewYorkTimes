function createTag(element,elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
        tag.setAttribute("class",elementClass);    
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}

var container = createTag("div","container");
var header = createTag("header");
var row1 = createTag("div","row");
var r1col1 = createTag("div","col-12 text-center");
r1col1.setAttribute("style","font-family:Berkshire Swash;font-size:50px;margin-top:20px;");
r1col1.innerHTML = "NEW YORK TIMES <hr>";
row1.append(r1col1);
header.append(row1);

var navdiv = createTag("div","nav-scroller py-1 mb-2");
var nav = createTag("nav","nav justify-content-between");
var a1 = createTag("a","p-2 text-muted a-size","home");
a1.addEventListener("click",callapi);
a1.innerHTML = "Home".toUpperCase();
var a2 = createTag("a","p-2 text-muted a-size","world");
a2.addEventListener("click",callapi);
a2.innerHTML = "World".toUpperCase();
var a3 = createTag("a","p-2 text-muted a-size","politics");
a3.addEventListener("click",callapi);
a3.innerHTML = "Politics".toUpperCase();
var a4 = createTag("a","p-2 text-muted a-size","magazine");
a4.addEventListener("click",callapi);
a4.innerHTML = "Magazine".toUpperCase();
var a5 = createTag("a","p-2 text-muted a-size","technology");
a5.addEventListener("click",callapi);
a5.innerHTML = "Technology".toUpperCase();
var a6 = createTag("a","p-2 text-muted a-size","science");
a6.addEventListener("click",callapi);
a6.innerHTML = "Science".toUpperCase();
var a7 = createTag("a","p-2 text-muted a-size","health");
a7.addEventListener("click",callapi);
a7.innerHTML = "Health".toUpperCase();
var a8 = createTag("a","p-2 text-muted a-size","sports");
a8.addEventListener("click",callapi);
a8.innerHTML = "Sports".toUpperCase();
var a9 = createTag("a","p-2 text-muted a-size","arts");
a9.addEventListener("click",callapi);
a9.innerHTML = "Arts".toUpperCase();
var a10 = createTag("a","p-2 text-muted a-size","fashion");
a10.addEventListener("click",callapi);
a10.innerHTML = "Fashion".toUpperCase();
var a11 = createTag("a","p-2 text-muted a-size","food");
a11.addEventListener("click",callapi);
a11.innerHTML = "Food".toUpperCase();
var a12 = createTag("a","p-2 text-muted a-size","travel");
a12.addEventListener("click",callapi);
a12.innerHTML = "Travel".toUpperCase();
nav.append(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
navdiv.append(nav);
container.append(header,navdiv);
document.body.append(container);
callapi();

async function callapi(){
    var click="";
    if(this.id){
    click = this.id;
    }
    else
    click="home";
    try{
        var response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${click}.json?api-key=aZO08PUEcWtB7hoPaJkZrgoHWlJ5tdjM`);
        var data = await response.json();
        document.body.innerHTML = "";
        document.body.append(container);
        for(var i=0;i<data.results.length;i++){
            var carddiv = createTag("div","col-12")
            carddiv.setAttribute("style","margin-top:20px;width:80%;margin-left:auto;margin-right:auto; ");
            var card = createTag("div","card border-dark");
            cardrow = createTag("div","row");
            cardcol1 = createTag("div","col-sm-9");
            cardbody = createTag("div","card-body");
            var h5 = createTag("h2","section-card");
            if(click === "home")
            h5.innerText = "Home";
            else
            h5.innerText = data.section;
            var h6 = createTag("h4","card-title");
            h6.innerText = data.results[i].title;
            var carddate = createTag("div","card-date text-muted");
            var d = new Date(data.results[i].created_date);
            var options = { month: 'long'};
            var month = new Intl.DateTimeFormat('en-US', options).format(d);
            carddate.innerText = d.getDate()+" "+month+" "+d.getFullYear();
            var cardp = createTag("p","card-abstract");
            cardp.innerText = data.results[i].abstract;
            var contin = createTag("a","continueReading");
            contin.setAttribute("href",data.results[i].url)
            contin.innerText = "Continue Reading";

            cardbody.append(h5,h6,carddate,cardp,contin);
            cardcol1.append(cardbody);

            var cardcol2 = createTag("div","col-sm-3");
            var img = createTag("img","img-thumbnail");
            img.setAttribute("src",data.results[i].multimedia[0].url);
            cardcol2.append(img);
            cardrow.append(cardcol1,cardcol2);
            card.append(cardrow);
            carddiv.append(card);
            document.body.append(carddiv);
        }
    }
    catch(error){
        console.log("error");
    }
}
