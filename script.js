const CONFIG = {
  URL_FORMULARIO_CREACION: "https://getaway-mardi-managing.ngrok-free.dev/webhook-test/formulario-creacion2"
};

// Manejo de los botones tipo toggle (Cumplido)
function setupButtonGroup(groupId, hiddenInputId) {
    const group = document.getElementById(groupId);
    const hiddenInput = document.getElementById(hiddenInputId);

    group.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            hiddenInput.value = btn.getAttribute('data-value');
        });
    });
}

setupButtonGroup('cumplidoGroup', 'cumplido');

document.getElementById('habitForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const alertBox = document.getElementById('alertBox');

    if (!document.getElementById('cumplido').value) {
        showAlert('⚠️ Selecciona si cumpliste la meta.', 'error');
        return;
    }

    const payload = {
        usuario: {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim()
        },
        habito: {
            categoria: document.getElementById('categoria').value,
            habito: document.getElementById('habito').value.trim(),
            cumplido: document.getElementById('cumplido').value,
            comentario: document.getElementById('comentario').value.trim() || 'Sin comentarios',
            fecha_registro: new Date().toISOString()
        }
    };

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando a n8n... ⏳';
    alertBox.style.display = 'none';

    try {
        const response = await fetch(CONFIG.URL_FORMULARIO_CREACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showAlert('🎉 ¡Meta registrada con éxito!', 'success');
            document.getElementById('habitForm').reset();
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        } else {
            showAlert(`⚠️ El Webhook respondió con código: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('Error al conectar con n8n:', error);
        showAlert('❌ Error de conexión. Verifica que el túnel ngrok y n8n estén activos.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = '🚀 Registrar Meta en n8n';
    }
});

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.innerText = message;
    alertBox.className = `alert ${type}`;
}