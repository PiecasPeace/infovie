export const convertMinsToHrs = (time:number) => {
    let hour = Math.floor(time / 60);
    hour < 10 ? `0${hour}` : hour;
  
    let minutes = time % 60;
    minutes < 10 ? `0${minutes}` : minutes;
  
    return hour && minutes ? `${hour}h ${minutes}m` : 'Uninformed';
  };
  