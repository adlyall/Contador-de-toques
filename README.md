# Contador de toques

Un contador de toques de pantalla te permite registrar cada pulsación sobre el panel de tu dispositivo móvil, lo que resulta ideal para contar repeticiones de ejercicios, llevar inventarios, registrar hábitos o contabilizar personas.

## Características

- Cada toque sobre el área central suma 1 al contador.
- Límite de toques configurable (por defecto, 45), con campo numérico y botones − y +.
- Barra de progreso y aviso de cuántos toques faltan.
- Al llegar al límite, el dispositivo vibra y suena un tono de finalización, y aparece una pantalla de «¡Listo!».
- Botón para reiniciar el contador en cualquier momento.
- El límite se guarda en el dispositivo.
- Modo claro y oscuro automático, según la configuración del teléfono.

## Archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura de la página |
| `style.css` | Estilos y diseño adaptado a pantallas móviles |
| `contador.js` | Lógica del contador, vibración y tono |

## Cómo usarla

1. Guardá los tres archivos en la misma carpeta.
2. Abrí `index.html` en el navegador del celular.
3. Definí el límite de toques en el campo superior.
4. Tocá el área central para contar. Al alcanzar el límite se activan la vibración y el tono.

## Notas

- La vibración funciona en Android (Chrome, Firefox). En iPhone/Safari el navegador no la permite, por lo que solo se muestran el tono y el aviso visual.
- El sonido se activa con el primer toque en la pantalla, y no se oye si el dispositivo está en silencio.
- Cambiar el límite reinicia el contador.

## Tecnologías

HTML, CSS y JavaScript, sin librerías externas.
