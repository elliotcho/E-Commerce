export const formatDate = (d) => {
    const dateStr = new Date(d).toLocaleString();
    const split = dateStr.split(",");

    if(split[0] === 'Invalid Date'){
        return 'Loading...';
    }

    return split[0];
}