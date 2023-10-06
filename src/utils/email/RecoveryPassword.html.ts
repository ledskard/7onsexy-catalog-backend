export const html: string= `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        color: #0066cc;
      }
      .content {
        background-color: #f2f2f2;
        padding: 20px;
        margin-top: 20px;
        border-radius: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="header">Xbio - Recuperação de senha</h1>
      <div class="content">
        <p>Olá,</p>
        <p>Recebemos um pedido para redefinir sua senha. Aqui está sua nova senha:</p>
        <p>{{userPassword}}</p>
        <p>Se você não solicitou essa alteração, entre em contato conosco imediatamente.</p>
        <p>Obrigado,</p>
        <p>A equipe Xbio</p>
      </div>
    </div>
  </body>
</html>`