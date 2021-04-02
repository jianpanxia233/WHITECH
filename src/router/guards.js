import request from '@/plugins/request';
import Cookies from 'js-cookie';

const whiteRouter = ['/','/login','/home','/activity']
export async function AuthGuard(to,from,next) {
    const token = Cookies.get(process.env.VUE_APP_COOKIE_KEY)||'undefined';
    if(token&&token!=='undefined') {
        const data = await request.get('/user/info')
        if(data){
            localStorage.setItem('userInfo',JSON.stringify(data))
            next()
        } else {
            if(whiteRouter.indexOf(to.path) !== -1){
                next()
            } else {
                next('/login')
            }
        }
    } else {
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        } else {
            next('/login')
        }
    }
}
