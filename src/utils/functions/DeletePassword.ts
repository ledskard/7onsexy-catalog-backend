import {User} from "../../entities/User";

export function deletePassword(data: User){
    delete data.tempPassword;
    delete data.password;
    return data;
}
