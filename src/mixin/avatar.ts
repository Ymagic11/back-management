import { ElMessage as $message } from 'element-plus'
import { changeavatar } from '../server/Interface'

export async function AvatarUpload(e: any, info?: any) {
    let file = e.file
    let index = file.name.lastIndexOf(".")
    let type = file.name.substr(index + 1)
    const typeList = ["png", "PNG", "jpg", "JPG"]
    const size = file.size / 1024
    if (size > 100) {
        $message({
            showClose: true,
            message: '图片太大',
            grouping: true,
            type: 'warning'
        })
        return false
    } else if (typeList.indexOf(type) < 0) {
        $message({
            showClose: true,
            message: '图片格式不符',
            type: 'warning',
            grouping: true
        })
        return false
    } else {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async e => {
                if (info) {
                    if (info.code) {
                        const res = await changeavatar({ pic: e.target?.result, code: info.code })
                        let newinfo = { ...info, user_pic: res }
                        window.$addStorage('info', JSON.stringify(newinfo))
                    } else {
                        const res = await changeavatar({ pic: e.target?.result })
                        let newinfo = { ...info, user_pic: res }
                        window.$addStorage('info', JSON.stringify(newinfo))
                    }
                } else {
                    let pic = e.target!.result as string
                    resolve(pic)
                }
            }
        })
    }
}