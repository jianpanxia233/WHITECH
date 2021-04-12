import request from '@/plugins/request';
import Cookies from 'js-cookie';

const whiteRouter = ['/','/login','/home','/activity']
export async function AuthGuard(to,from,next) {
    const token = Cookies.get(process.env.VUE_APP_COOKIE_KEY)||'undefined';
    if(token&&token!=='undefined') {
        await request.get(`/user/info`).then(result => {
            localStorage.setItem('realName',result.realName)
            localStorage.setItem('userId',result.userId)
            localStorage.setItem('avatar',result.avatar)
        })
        next()
    } else {
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        } else {
            next('/login')
        }
    }
}
