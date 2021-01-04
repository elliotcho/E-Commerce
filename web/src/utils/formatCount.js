export const formatCount = (num) => {
    if(num >= 1000000000){
        let billions = Math.floor(num/1000000000);
        let hundredMillions = Math.floor((num%1000000000)/100000000);
    
        return `${billions}.${hundredMillions}B`;
    }
}