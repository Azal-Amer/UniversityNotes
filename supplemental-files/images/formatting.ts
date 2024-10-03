export function imageFormatter(paths: string[],captions:string[]): string[] {
    function heiphen(toprow:string){
        let row = "\n|";
        for(let i = 0; i < toprow.length; i++){
            row += "-";
        }
        row += "|\n";
        return row;

    }
    function caption(cap:string){
        if(cap === ""){
            return "\n";
        }
        else{
            return `|${cap}|\n`;
        }
        // if there's no caption, make a single cell table, doing this over straight dropping in, was so formatting against the image is easier
        

    }
    return paths.map((url) => {
        return `\n|![${url}](${url})|${heiphen('![${url}](${url})')}${caption(captions[paths.indexOf(url)])}`;
    });
}