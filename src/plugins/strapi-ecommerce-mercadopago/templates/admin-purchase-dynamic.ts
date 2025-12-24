export const purchaseDynamic = {
  subject: 'Nuevo pedido #<%= invoice.id %> recibido :)',
  text: `
¡Tienes un nuevo pedido! 🥳
Pedido #<%= invoice.id %>

═══════════════════════════════════════════
📦 PRODUCTOS
═══════════════════════════════════════════

<%= productsText %>

═══════════════════════════════════════════
👤 INFORMACIÓN DEL CLIENTE
═══════════════════════════════════════════

Nombre completo: <%= shopper.name %> <%= shopper.last_name %>
Email: <%= shopper.email %>
Teléfono: <%= shopper.phone %>
DNI: <%= shopper.dni %>

═══════════════════════════════════════════
🚚 INFORMACIÓN DE ENVÍO
═══════════════════════════════════════════

Dirección: <%= shipping.address %>
Ciudad: <%= shipping.city %>
Departamento: <%= shipping.department %>
Código Postal: <%= shipping.postal_code || 'No especificado' %>
Mensaje: <%= shipping.message || 'Sin mensaje' %>

═══════════════════════════════════════════
💳 INFORMACIÓN DE PAGO
═══════════════════════════════════════════

TOTAL: $<%= invoice.total %>

Método de pago: <%= invoice.paid_with || 'No especificado' %>
ID de pago: <%= invoice.payment_id || 'Pendiente' %>
Estado: ✓ <%= invoice.payment_status %>

═══════════════════════════════════════════

Ver detalles completos del pedido:
https://cms.sagradacura.com/admin/content-manager/collection-types/plugin::strapi-ecommerce-mercadopago.invoice/<%= invoice.id %>

---
Este es un correo automático generado por el sistema de Sagrada Cura
`,
  html: `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { border-collapse: collapse; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        p { display: block; margin: 13px 0; }
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 { width: 100% !important; max-width: 100%; }
        }
        @media only screen and (max-width: 479px) {
            table.mj-full-width-mobile { width: 100% !important; }
            td.mj-full-width-mobile { width: auto !important; }
        }
        p, h1, h2, h3 { margin: 0px; }
        ul, li, ol { font-size: 11px; font-family: Ubuntu, Helvetica, Arial; }
        a { text-decoration: none; color: inherit; }
        @media only screen and (max-width: 480px) {
            .mj-column-per-100 { width: 100% !important; max-width: 100% !important; }
        }
        .info-section {
            background-color: #f5f5f5;
            border-radius: 5px;
            padding: 15px;
            margin: 15px 0;
        }
        .info-row {
            margin: 8px 0;
        }
        .label {
            font-weight: bold;
            color: #333;
        }
        .total-section {
            background-color: #e8f5e9;
            border-radius: 5px;
            padding: 15px;
            margin: 15px 0;
        }
    </style>
</head>
<body style="word-spacing: normal; background-color: #ffffff">
    <div style="background-color: #ffffff">
        <div style="margin: 0px auto; max-width: 600px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                <tbody>
                    <tr>
                        <td style="direction: ltr; font-size: 0px; padding: 10px 0px; text-align: center;">
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top" width="100%">
                                    <tbody>
                                        <!-- Logo -->
                                        <tr>
                                            <td align="center" style="font-size: 0px; padding: 0px;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 200px">
                                                                <img src="https://strapi-aws-develop-bucket.s3.us-east-2.amazonaws.com/sagradacura_black_82be04c33f.svg" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="600" height="auto"/>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <!-- Title -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; text-align: left; color: #000000;">
                                                    <h1 style="font-family: Ubuntu, sans-serif; font-size: 22px; text-align: center;">! Tienes un nuevo pedido ! 🥳</h1>
                                                    <p style="text-align: center; font-size: 16px; color: #666; margin-top: 10px;">Pedido #<%= invoice.id %></p>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Products Section -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; text-align: left; color: #000000;">
                                                    <h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">📦 Productos</h2>
                                                    <%= productsHtml %>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Customer Information -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; text-align: left; color: #000000;">
                                                    <h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">👤 Información del Cliente</h2>
                                                    <div class="info-section">
                                                        <div class="info-row">
                                                            <span class="label">Nombre completo:</span> <%= shopper.name %> <%= shopper.last_name %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Email:</span> <%= shopper.email %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Teléfono:</span> <%= shopper.phone %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">DNI:</span> <%= shopper.dni %>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Shipping Information -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; text-align: left; color: #000000;">
                                                    <h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">🚚 Información de Envío</h2>
                                                    <div class="info-section">
                                                        <div class="info-row">
                                                            <span class="label">Dirección:</span> <%= shipping.address %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Ciudad:</span> <%= shipping.city %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Departamento:</span> <%= shipping.department %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Código Postal:</span> <%= shipping.postal_code || 'No especificado' %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Mensaje:</span> <%= shipping.message || 'Sin mensaje' %>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- Payment Information -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.5; text-align: left; color: #000000;">
                                                    <h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">💳 Información de Pago</h2>
                                                    <div class="total-section">
                                                        <div class="info-row" style="font-size: 18px; padding-top: 10px; margin-top: 10px;">
                                                            <span class="label">Total:</span> <span style="color: #4caf50; font-size: 22px;">$<%= invoice.total %></span>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Método de pago:</span> <%= invoice.paid_with || 'No especificado' %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">ID de pago:</span> <%= invoice.payment_id || 'Pendiente' %>
                                                        </div>
                                                        <div class="info-row">
                                                            <span class="label">Estado:</span> <span style="color: #4caf50; font-weight: bold;">✓ <%= invoice.payment_status %></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <!-- CTA Button -->
                                        <tr>
                                            <td align="center" style="font-size: 0px; padding: 20px;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; width: auto; line-height: 100%;">
                                                    <tbody>
                                                        <tr>
                                                            <td align="center" bgcolor="#0092FF" role="presentation" style="border: none; border-radius: 5px; cursor: auto; font-style: normal; background: #0092ff;" valign="middle">
                                                                <a href="https://cms.sagradacura.com/admin/content-manager/collection-types/plugin::strapi-ecommerce-mercadopago.invoice/<%= invoice.id %>" style="display: inline-block; background: #0092ff; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-weight: normal; line-height: 100%; margin: 0; text-decoration: none; text-transform: none; padding: 15px 20px; border-radius: 5px;" target="_blank">
                                                                    <span>Ver detalles completos del pedido</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <!-- Footer -->
                                        <tr>
                                            <td align="left" style="font-size: 0px; padding: 15px;">
                                                <div style="font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 11px; line-height: 1.5; text-align: center; color: #999;">
                                                    <p>Este es un correo automático generado por el sistema de Sagrada Cura</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
`,
};
