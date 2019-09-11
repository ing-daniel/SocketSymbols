export const formatoDePesos = (cantidad, decimales) => {
    cantidad += '';
    cantidad = parseFloat(cantidad.replace(/[^0-9.]/g, ''));

    decimales = decimales || 0;

    if (isNaN(cantidad) || cantidad === 0)
        return parseFloat(0).toFixed(decimales);

    cantidad = '' + cantidad.toFixed(decimales);

    var amount_parts = cantidad.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, (`$1,$2`));

    return `$${amount_parts.join('.')}`;
}