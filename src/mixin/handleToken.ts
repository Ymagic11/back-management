const limitTime = 24

export const oldTime = () => {
    const oldTime = Date.now()
    localStorage.setItem('old',JSON.stringify(oldTime))
}

export const handleToken = () => {
    const oldTime = JSON.parse(localStorage.getItem('old')!)
    const nowTime = Date.now()
    let res = (nowTime - oldTime) / (1000*60*60*24)
    if(res > limitTime){
        return false
    }else return true
}