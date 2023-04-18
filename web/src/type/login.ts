export interface LoginForm {
    username: string
    password: string
}

/**
 *  定义登陆方法使用的data
 */
export class LoginData {
    ruleForm: LoginForm = {
        username: "",
        password: ""
    }
}