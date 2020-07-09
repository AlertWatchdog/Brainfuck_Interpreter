var arr = [];
var loop = [];
let pointer = 0;
var i = 0;
var running = false;

async function interpret(){
    document.getElementById("terminal").value="";
    document.getElementById("terminal").removeAttribute("readonly");
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
            if(arr[pointer] !== 0)
                loop.push(i);
            else {
                let tmp = true;
                let cnt = 0;
                while(tmp){
                    i++;
                    if(sourcecode[i] === '[')
                        cnt++;
                    if(sourcecode[i] === ']')
                        if(cnt === 0)
                            tmp = false;
                        else
                            cnt--;
                }
            }
        if(c === ']'){
            if(arr[pointer] > 0){
                i = loop[loop.length-1];
            } else {
                loop.pop();
            }
        }
        if(c === ','){
            i++;
            running = true;
            break;
        }             
    } 
    if(i === sourcecode.length){
        deactivateTerminal();
    }    
}

function resumeExec(){
    if(i !== 0 && running === true){
        arr[pointer] = document.getElementById("terminal").value.charCodeAt(document.getElementById("terminal").value.length-1);
        running = false;;
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

function deactivateTerminal(){
    let terminal = document.getElementById("terminal");
    terminal.value += "\n\n### Your Code has finished ###";
    terminal.setAttribute("readonly", "readonly");
}

