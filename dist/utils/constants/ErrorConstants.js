"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStatus = exports.ErrorMessage = void 0;
exports.ErrorMessage = {
    cannot_create_user: "Não foi possível criar o usuário",
    user_already_registered: "Usuário já registrado",
    user_or_password_incorrect: "Usuário ou senha incorreta",
    user_id_not_found: "Id do usuário não encontrado",
    admin_already_registered: "Administrador já registrado",
    user_not_registered: "Username não encontrado",
    id_not_found: "Id não encontrado",
    movie_id_not_found: "Id do filme não encontrado",
    password_invalid: "Usuário ou senha incorreta",
    permission_denied: "Permissão negada",
    token_expired: "Token expirado",
    could_not_send_image: "Erro ao enviar imagem para AWS",
    could_not_delete_image: "Erro ao delete imagem da AWS",
    url_invalid_on_activate: 'Não é possível ativar link sem uma url válida',
    title_invalid_on_activate: 'Não é possível ativar link sem um titulo válido'
};
exports.ErrorStatus = {
    internal_server_error: 500,
    bad_request: 400,
    unauthorized: 401,
    not_found: 404,
};
//# sourceMappingURL=ErrorConstants.js.map