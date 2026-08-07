
# HabitTracker 

Sistema de seguimiento de metas diarias con notificación automática de constancia mensual.

## Tecnologías
- Formulario web (HTML/CSS/JS)
- Webhook + n8n (automatización)
- PostgreSQL (persistencia)
- Google Sheets (historial y reporte mensual)
- Gmail (notificación personalizada según nivel de constancia)

## Flujo
1. El usuario registra si cumplió su meta del día por categoría (Salud, Estudio, Finanzas, Mente).
2. El webhook en n8n guarda el registro en PostgreSQL.
3. Se calcula el % de cumplimiento del mes en curso.
4. Se guarda un historial en Google Sheets, con una pestaña de resumen mensual calculado por fórmulas.
5. Según el nivel de constancia (Bajo/Medio/Alto), se envía un correo personalizado por Gmail.
