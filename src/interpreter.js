var arr = [];
var loop = [];
let pointer = 0;
var i = 0;

async function interpret(){
    pointer = 0;
    arr = [];
    loop = [];
    arr.push(0);  
    i = 0;
    exec(); 
}

function exec(){
    let sourcecode = document.getElementById("scInput").value; 
    for(; i < sourcecode.length; i++){
        let c = sourcecode[i];
        if(c === '+')
            arr[pointer]++;
        if(c === '-')
            arr[pointer]--;
        if(c === '.')
                asciiOut(arr[pointer]);
        if(c === '<')
                pointerDec();
        if(c === '>')
                pointerInc();
        if(c === '[')
                loop.push(i)
        if(c === ']'){
            if(arr[pointer] !== 0){
                i = loop[loop.length-1];
            } else {
                loop.pop();
            }
        }
        if(c === ','){
            i++;
            break;
        }
        console.log(arr);
    }        
}

function resumeExec(){
    if(i !== 0){
        arr[pointer] = document.getElementById("terminal").value.charCodeAt(document.getElementById("terminal").value.length-1);
        exec();
    }
}

function pointerInc(){
    pointer++;
    if(pointer === arr.length){
        arr.push(0);
    }
    
}

function pointerDec(){
    pointer = pointer - 1;
    if(pointer < 0){
        alert("Pointer exceeds Array-Limits (<0)")
    }
}

function asciiOut(c){    
    let output = document.getElementById("terminal")
    output.value = output.value + String.fromCharCode(c);
}

