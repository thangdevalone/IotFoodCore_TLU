export function handleMsv(text:string):string[]{
    const rs:string[]=['/src/assets/audio/detect.mp3','/src/assets/audio/A.mp3']
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        console.log(character)
        if(character in ['1','2','3','4','5','6','7','8','9']){
            rs.push(`/src/assets/audio/${character}.mp3`)
        }
      }
      console.log(rs)
    return rs
}