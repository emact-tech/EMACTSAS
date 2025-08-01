/**
 * SISTEMA EMACT - JavaScript Unificado
 * Controla todas las páginas del sistema
 * Número de WhatsApp actualizado: 573238087579
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== FUNCIONALIDAD COMÚN =====
    
    // 1. Actualizar año en el footer
    const updateFooterYear = () => {
        const yearElements = document.querySelectorAll('footer p:first-child');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            if (element.textContent.includes('2023')) {
                element.textContent = element.textContent.replace('2023', currentYear);
            } else if (!element.querySelector('#current-year')) {
                element.innerHTML = `© ${currentYear} EMACT - Todos los derechos reservados`;
            }
        });
    };
    
    // 2. Cargar Font Awesome
    const loadFontAwesome = () => {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
            document.head.appendChild(faLink);
        }
    };
    
    // 3. Soporte WhatsApp con número actualizado
    const setupWhatsAppSupport = () => {
        const soporteBtn = document.getElementById('soporteBtn');
        const warningBanner = document.getElementById('whatsappWarning');
        const warningMessage = document.getElementById('warningMessage');
        
        if (soporteBtn) {
            soporteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Configuración con número actualizado 573238087579
                const config = {
                    whatsappNumber: '573238087579', // Número actualizado con código de país
                    supportHours: {
                        days: [1, 2, 3, 4, 5], // Lunes a Viernes
                        startHour: 8,  // 8am
                        endHour: 18    // 6pm
                    },
                    allowedMedia: false // No se permiten archivos multimedia
                };
                
                // Verificar horario de atención
                const now = new Date();
                const day = now.getDay(); // 0 (Domingo) a 6 (Sábado)
                const hour = now.getHours();
                const minutes = now.getMinutes();
                
                // Convertir hora actual a minutos para comparación precisa
                const currentTimeInMinutes = (hour * 60) + minutes;
                const startTimeInMinutes = config.supportHours.startHour * 60;
                const endTimeInMinutes = config.supportHours.endHour * 60;
                
                const isWorkingDay = config.supportHours.days.includes(day);
                const isWorkingTime = currentTimeInMinutes >= startTimeInMinutes && 
                                     currentTimeInMinutes < endTimeInMinutes;
                
                if (isWorkingDay && isWorkingTime) {
                    // Mensaje predefinido con instrucciones
                    const defaultMessage = encodeURIComponent(
                        "Hola, equipo EMACT. Necesito ayuda con:\n\n" +
                        "• Asunto: [Describa brevemente]\n" +
                        "• Detalles: [Describa su problema]\n\n" +
                        "NOTA: Este canal es solo para soporte por texto.\n" +
                        "No se atenderán llamadas, videollamadas o archivos multimedia."
                    );
                    
                    // Abrir chat de WhatsApp
                    window.open(
                        `https://wa.me/${config.whatsappNumber}?text=${defaultMessage}`,
                        '_blank',
                        'noopener,noreferrer'
                    );
                    
                    // Mostrar advertencia sobre restricciones
                    showTemporaryWarning(
                        warningBanner, 
                        warningMessage, 
                        "Recuerde: Este canal es solo para mensajes de texto. No envíe archivos multimedia.",
                        5000
                    );
                    
                } else {
                    // Fuera del horario de atención
                    showTemporaryWarning(
                        warningBanner,
                        warningMessage,
                        "El soporte está disponible de Lunes a Viernes de 8am a 6pm",
                        5000
                    );
                }
            });
            
            // Prevenir acciones no permitidas
            document.addEventListener('paste', (e) => {
                if (e.clipboardData.files.length > 0) {
                    showTemporaryWarning(
                        warningBanner,
                        warningMessage,
                        "No puede pegar archivos en este chat de soporte",
                        3000
                    );
                    e.preventDefault();
                }
            });
            
            document.addEventListener('drop', (e) => {
                if (e.dataTransfer.files.length > 0) {
                    showTemporaryWarning(
                        warningBanner,
                        warningMessage,
                        "No puede arrastrar archivos en este chat de soporte",
                        3000
                    );
                    e.preventDefault();
                }
            });
        }
    };
    
    // Función para mostrar advertencias temporales
    const showTemporaryWarning = (bannerElement, messageElement, message, duration) => {
        messageElement.textContent = message;
        bannerElement.style.display = 'flex';
        setTimeout(() => {
            bannerElement.style.display = 'none';
        }, duration);
    };
    
    // ===== INICIALIZACIÓN =====
    updateFooterYear();
    loadFontAwesome();
    setupWhatsAppSupport();
    
    // Funciones existentes para otros formularios...
    // setupForms();
    // setupIndexPage();
});