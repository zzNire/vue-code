dataFile = `##################################
Location: DEU
##################################
 Ammonia: 023 particles
 Nitrogen Oxide: 919 particles
 Carbon Monoxide: 027 particles
##################################
##################################
Location: USA
##################################
 Ammonia: 422 particles
 Nitrogen Oxide: 220 particles
 Carbon Monoxide: 130 particles
##################################
##################################
Location: AUS
##################################
 Ammonia: 122 particles
 Nitrogen Oxide: 102 particles
 Carbon Monoxide: 399 particles
##################################
##################################
Location: BHS
##################################
 Ammonia: 323 particles
 Nitrogen Oxide: 363 particles
 Carbon Monoxide: 399 particles
##################################
##################################
Location: BRB
##################################
 Ammonia: 344 particles
 Nitrogen Oxide: 324 particles
 Carbon Monoxide: 314 particles
##################################
##################################
Location: CHN
##################################
 Ammonia: 422 particles
 Nitrogen Oxide: 477 particles
 Carbon Monoxide: 398 particles
##################################
##################################
Location: COG
##################################
 Ammonia: 044 particles
 Nitrogen Oxide: 144 particles
 Carbon Monoxide: 244 particles
##################################
##################################
Location: CRI
##################################
 Ammonia: 092 particles
 Nitrogen Oxide: 099 particles
 Carbon Monoxide: 399 particles
##################################
##################################
Location: ISL
##################################
 Ammonia: 021 particles
 Nitrogen Oxide: 009 particles
 Carbon Monoxide: 077 particles
##################################
##################################
Location: VEN
##################################
 Ammonia: 102 particles
 Nitrogen Oxide: 103 particles
 Carbon Monoxide: 022 particles
##################################`
function parseData() {
let datas = {
    Ammonia :[],
    ['Nitrogen Oxide']:[],
    ['Carbon Monoxide']:[]
}
let right_country;
var str = dataFile.split('\n').filter(line=>line[0]!=='#').map(v=>{
    if(v.match(/Location: (\w+)/)){
        right_country = v.match(/Location: (\w+)/)[1];
    }
    let data = v.match(/([\w ]+): (\d+) particles/);
    if(data){
        if(data[1].trim()=== 'Ammonia') datas.Ammonia.push([right_country,data[2]]);
        if(data[1].trim()=== 'Nitrogen Oxide') datas['Nitrogen Oxide'].push([right_country,data[2]]);
        if(data[1].trim()=== 'Carbon Monoxide') datas['Carbon Monoxide'].push([right_country,data[2]]);
    }
})

let results = [];
for(key in datas){
    datas[key].sort((a,b)=>b[1] - a[1]);
    datas[key] = datas[key].filter(v=>v[1]===datas[key][0][1]);
    let result = `${key} levels in`;
    datas[key].forEach(v =>result = result+' '+v[0]+',');
    result = result.substr(0,result.length-1);
    result+=` are too high.`
    results.push(result);
}
return results.join(' ');
}

parseData();