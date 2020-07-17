var arr = [];   //brainfuck Storage array
var loop = [];  //Helper array for loops
let pointer = 0;    //pointer on  brainfuck storage
var i = 0;      //pointer for brainfuck source code
var running = false; //helper for user input

/**
 * Prepares and starts interpreter function
 */
function interpret(){
    document.getElementById("terminal").value="";
    document.getElementById("terminal").removeAttribute("readonly");
    pointer = 0;
    arr = [];
    loop = [];
    arr.push(0);  
    i = 0;
    exec(); 
}

/**
 * actual interpreter for Brainfuck 
 */
function exec(){
    let sourcecode = document.getElementById("scInput").value; 
    for(; i < sourcecode.length; i++){
        let c = sourcecode[i];
        if(c === '+')
            if(arr[pointer] < 255)        //Emulates behavior of char (0-255) 
                arr[pointer]++;
            else
                arr[pointer] = 0;
        if(c === '-')
            if(arr[pointer] > 0)        //Emulates behavior of char (0-255) 
                arr[pointer]--;
            else
                arr[pointer] = 255;
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
        else if(c === ']'){
            if(arr[pointer] !== 0){
                i = loop[loop.length-1];
            } else {
                loop.pop();
            }
        }
        if(c === ','){              //breaks loop for user interaction
            i++;
            running = true;         //helper to detect if loop was stopped for user interaction
            break;
        }             
    } 
    if(i === sourcecode.length){
        deactivateTerminal();
    }    
}

/**
 * resumes interpreting after user interaction
 */
function resumeExec(){
    if(i !== 0 && running === true){
        arr[pointer] = document.getElementById("terminal").value.charCodeAt(document.getElementById("terminal").value.length-1);
        running = false;;
        exec();
    }
}

/**
 * increases pointer and adds new cell (0) to arrayy, if last cell is reached
 */
function pointerInc(){
    pointer++;
    if(pointer === arr.length){
        arr.push(0);
    }
    
}

/**
 * decreases pointer, gives warning, when array is exceeded
 */
function pointerDec(){
    pointer = pointer - 1;
    if(pointer < 0){
        alert("Pointer exceeds Array-Limits (<0)")
    }
}

/**
 * Writes c in terminal textfield
 * @param {*} c = charcode for ASCII
 */
function asciiOut(c){    
    let output = document.getElementById("terminal")
    output.value = output.value + String.fromCharCode(c);
}

/**
 * Sets Terminal Textfield to readonly
 */
function deactivateTerminal(){
    let terminal = document.getElementById("terminal");
    terminal.value += "\n\n### Your Code has finished ###";
    terminal.setAttribute("readonly", "readonly");
}

