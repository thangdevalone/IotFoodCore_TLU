export function handleMsv(text:string):string[]{
    const rs:string[]=['/assets/audio/detect.mp3','/assets/audio/A.mp3']
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        console.log(character)
        if(character in ['1','2','3','4','5','6','7','8','9']){
            rs.push(`/assets/audio/${character}.mp3`)
        }
      }
  
    return rs
}