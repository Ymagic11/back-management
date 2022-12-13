import { ElMessage as $message } from 'element-plus'
import { oldTime } from '@/mixin/handleToken'
import router from '@/router/index'

const interceptorApi = async (res: any) => {
    if (res.status === 1) {
        //token失效
        if (res.code) {
            router.push('/login')
            return Promise.reject(res.message)
        } else {
            //密码错误
            $message({
                showClose: true,
                message: res.message,
                type: 'error'
            })
        }
    } else if (res.status === 0) {
        if (res.code) {
            //注册成功
            $message({
                showClose: true,
                message: res.message,
                type: 'success'
            })
        } else {
            //登录成功
            const token = res.token
            if (token) {
                oldTime()
                localStorage.setItem('token', token)
                localStorage.setItem('info', JSON.stringify(res.info))
                $message({
                    showClose: true,
                    message: res.message,
                    type: 'success'
                })
            } else {
                if (res.message) {
                    $message({
                        showClose: true,
                        message: res.message,
                        type: 'success'
                    })
                }
                return res.data
            }
        }
    }
}

export default interceptorApi