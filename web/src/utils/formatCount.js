export const formatCount = (num) => {
    if(num >= 1000000000){
        let billions = Math.floor(num/1000000000);
        let hundredMillions = Math.floor((num%1000000000)/100000000);
    
        return `${billions}.${hundredMillions}B`;
    }

    else if(num >= 1000000){
        let millions = Math.floor(num/1000000);
        let hundredThousands = Math.floor((num % 1000000)/100000);

        return `${millions}.${hundredThousands}M`;
    }

    else if (num >= 1000){
        let thousands = Math.floor(num/1000);
        let hundreds = Math.floor((num%1000)/100);

        return `${thousands}.${hundreds}K`;
    }

    return num;
}