// Caesar
function caesar(text,shift){
    let result="";
    for(let i=0;i<text.length;i++){
        let c=text.charCodeAt(i);
        if(c>=65&&c<=90) result+=String.fromCharCode((c-65+shift)%26+65);
        else if(c>=97&&c<=122) result+=String.fromCharCode((c-97+shift)%26+97);
        else result+=text[i];
    }
    return result;
}

// Vigenere
function vigenere(text,key){
    text=text.toUpperCase(); key=key.toUpperCase();
    let result="";
    for(let i=0;i<text.length;i++){
        let t=text.charCodeAt(i)-65;
        let k=key.charCodeAt(i%key.length)-65;
        if(t>=0&&t<26) result+=String.fromCharCode((t+k)%26+65);
        else result+=text[i];
    }
    return result;
}

// Substitution
function substitution(text,key){
    let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; key=key.toUpperCase();
    text=text.toUpperCase(); let result="";
    for(let i=0;i<text.length;i++){
        let idx=alphabet.indexOf(text[i]);
        result += (idx!=-1)? key[idx] : text[i];
    }
    return result;
}

// Rail Fence
function railFence(text,rails){
    let fence = [];
    for(let i=0;i<rails;i++) fence.push([]);
    let dir=1,row=0;
    for(let ch of text){
        fence[row].push(ch);
        row+=dir;
        if(row===0||row===rails-1) dir*=-1;
    }
    return fence.flat().join('');
}

// Atbash
function atbash(text){
    let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let reverse="ZYXWVUTSRQPONMLKJIHGFEDCBA";
    text=text.toUpperCase();
    let result="";
    for(let ch of text){
        let idx=alphabet.indexOf(ch);
        result += (idx!=-1)? reverse[idx] : ch;
    }
    return result;
}

// Playfair
function generatePlayfairMatrix(key){
    key=key.toUpperCase().replace(/J/g,"I");
    let alphabet="ABCDEFGHIKLMNOPQRSTUVWXYZ";
    let matrix=[],used="";
    key=(key+alphabet);
    for(let c of key){
        if(!used.includes(c)){used+=c; matrix.push(c);}
    }
    return matrix;
}
function playfair(text,key){
    let matrix=generatePlayfairMatrix(key);
    text=text.toUpperCase().replace(/J/g,"I").replace(/[^A-Z]/g,"");
    if(text.length%2!==0) text+="X";
    let result="";
    for(let i=0;i<text.length;i+=2){
        let a=text[i],b=text[i+1];
        let posA=matrix.indexOf(a),posB=matrix.indexOf(b);
        let rowA=Math.floor(posA/5),colA=posA%5;
        let rowB=Math.floor(posB/5),colB=posB%5;
        if(rowA===rowB){result+=matrix[rowA*5+(colA+1)%5]; result+=matrix[rowB*5+(colB+1)%5];}
        else if(colA===colB){result+=matrix[((rowA+1)%5)*5+colA]; result+=matrix[((rowB+1)%5)*5+colB];}
        else{result+=matrix[rowA*5+colB]; result+=matrix[rowB*5+colA];}
    }
    return result;
}

// Hill (2x2)
function hill(text,key){
    let k=key.split(",").map(Number);
    let a=k[0],b=k[1],c=k[2],d=k[3];
    text=text.toUpperCase().replace(/[^A-Z]/g,"");
    if(text.length%2!==0) text+="X";
    let result="";
    for(let i=0;i<text.length;i+=2){
        let x=text.charCodeAt(i)-65,y=text.charCodeAt(i+1)-65;
        let e1=(a*x+b*y)%26,e2=(c*x+d*y)%26;
        result+=String.fromCharCode(e1+65)+String.fromCharCode(e2+65);
    }
    return result;
}

// Affine
function affine(text,key){
    let parts=key.split(",").map(Number);
    let a=parts[0],b=parts[1];
    text=text.toUpperCase();
    let result="";
    for(let ch of text){
        let c=ch.charCodeAt(0);
        if(c>=65&&c<=90){
            result+=String.fromCharCode((a*(c-65)+b)%26+65);
        }else result+=ch;
    }
    return result;
}