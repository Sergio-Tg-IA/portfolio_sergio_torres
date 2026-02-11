// Background Animation (Reusable Particle System)
class Background {
    constructor(canvasId, particleCount = 60) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = particleCount;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());

        // Listen for mouse movement on the canvas container or window
        const target = this.canvas.parentElement || window;
        target.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;

            // Global spotlight variable
            document.body.style.setProperty('--x', e.clientX + 'px');
            document.body.style.setProperty('--y', e.clientY + 'px');
        });
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.width = parent ? parent.offsetWidth : window.innerWidth;
        this.height = parent ? parent.offsetHeight : window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        if (!this.canvas) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Background Gradient
        const gradient = this.ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, Math.max(this.width, this.height)
        );
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#030712');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            if (this.mouse.x !== null) {
                let dx = this.mouse.x - p.x;
                let dy = this.mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    p.x -= directionX * force * 2;
                    p.y -= directionY * force * 2;
                }
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
            this.ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Project Data and Modal Logic
const projectData = {
    'dentalstock': {
        title: 'DentalStock',
        subtitle: 'Logística y Continuidad Operativa',
        logo: 'assets/dentalstock_logo.jpg',
        description: `
                <div class="modal-body-content">
                    <!-- HEADER -->
                    <div class="modal-header">
                        <img src="assets/dentalstock_logo.jpg" alt="DentalStock Logo">
                        <div>
                            <div class="branding" style="font-size: 2rem; margin-bottom: 0.2rem;">
                                <span class="branding-dental">Dental</span><span class="branding-stock">Stock</span>
                            </div>
                            <p style="color: var(--accent-blue); font-weight: 600;">Logística y Continuidad Operativa</p>
                        </div>
                    </div>

                    <!-- SECCIÓN EXPLICATIVA: DASHBOARD Y FLUJO -->
                    <div class="modal-section-container" style="margin-top: 2.5rem; margin-bottom: 4rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 3rem; backdrop-filter: blur(20px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                        <div class="modal-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem;">
                            <!-- Columna Izquierda: Dashboard Operativo -->
                            <div>
                                <h3 style="color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Dashboard Operativo</h3>
                                <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.05rem;">Un centro de mando diseñado para facilitar la gestión del inventario:</p>
                                <ul style="list-style: none; padding-left: 0; color: rgba(255,255,255,0.8); line-height: 1.8;">
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-blue); font-size: 1.2rem; line-height: 1;">•</span>
                                        <span><strong>Control en Vivo:</strong> Visualiza el stock real de cada material con actualización instantánea.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-blue); font-size: 1.2rem; line-height: 1;">•</span>
                                        <span><strong>Transacciones Rápidas:</strong> Registra entradas y salidas en segundos, minimizando el tiempo administrativo.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-blue); font-size: 1.2rem; line-height: 1;">•</span>
                                        <span><strong>Monitor de Críticos:</strong> El panel destaca automáticamente los productos que requieren tu atención.</span>
                                    </li>
                                    <li style="display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-blue); font-size: 1.2rem; line-height: 1;">•</span>
                                        <span><strong>Trazabilidad Total:</strong> Historial completo de movimientos por producto y usuario para un control absoluto.</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Columna Derecha: Flujo sin fricción -->
                            <div>
                                <h3 style="color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Flujo sin fricción</h3>
                                
                                <div style="margin-bottom: 2.2rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">
                                        🚦 Cantidad de producto a tiempo real:
                                    </p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;">
                                        Control visual inmediato mediante un sistema de semáforo (Verde, Naranja, Rojo) para auditar el almacén de un vistazo.
                                    </p>
                                </div>

                                <div style="margin-bottom: 2.2rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">
                                        🤖 Solicitud automática:
                                    </p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;">
                                        Recomendación inteligente de productos a reponer para alcanzar el stock ideal sin errores manuales.
                                    </p>
                                </div>

                                <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">
                                        ✨ Simplicidad:
                                    </p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;">
                                        Marcar entradas, salidas y generar solicitudes se realiza con total facilidad en solo 2-3 clicks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- GALERÍA DEL PROYECTO -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                        <div style="width: 40px; height: 2px; background: var(--accent-blue);"></div>
                        <h2 style="font-size: 1.3rem; color: #fff; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Galería del Proyecto</h2>
                    </div>

                    <div class="modal-gallery-vertical" style="display: flex; flex-direction: column; gap: 2.5rem;">
                        
                        <!-- ITEM 1: INVENTARIO -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item">
                                <div class="slider-container" style="aspect-ratio: 16/10; border-radius: 12px; border: 1px solid var(--glass-border); overflow: hidden;">
                                    <div class="slider-img-container">
                                        <img src="galeria_dentalstock/inventario_semaforo.png?v=3" alt="Inventario en tiempo real" class="modal-gallery-img">
                                        <img src="galeria_dentalstock/ejemplo_producto.png?v=3" alt="Detalle de producto" class="modal-gallery-img">
                                    </div>
                                    <div class="slider-nav prev">&lt;</div>
                                    <div class="slider-nav next">&gt;</div>
                                    <div class="slider-dots">
                                        <div class="dot active" data-index="0"></div>
                                        <div class="dot" data-index="1"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem;">Control de Inventario</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                                    <strong>Cantidad de producto a tiempo real:</strong> Sistema de semáforo con tres estados (Verde/OK, Naranja/Bajo, Rojo/Crítico) para auditar el almacén de un vistazo. Cada producto es totalmente personalizable, permitiendo definir niveles específicos de stock mínimo e ideal para una gestión precisa del flujo de materiales.
                                </p>
                            </div>
                        </div>

                        <!-- ITEM 2: REPOSICIÓN -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item">
                                <div class="slider-container" style="aspect-ratio: 16/10; border-radius: 12px; border: 1px solid var(--glass-border); overflow: hidden;">
                                    <div class="slider-img-container">
                                        <img src="galeria_dentalstock/ejemplo_solicitud_producto.png?v=3" alt="Reposición Inteligente" class="modal-gallery-img">
                                        <img src="galeria_dentalstock/ejemplo_salida_producto.png?v=3" alt="Registro de salida" class="modal-gallery-img">
                                    </div>
                                    <div class="slider-nav prev">&lt;</div>
                                    <div class="slider-nav next">&gt;</div>
                                    <div class="slider-dots">
                                        <div class="dot active" data-index="0"></div>
                                        <div class="dot" data-index="1"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem;">Reposición Inteligente</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                                    <strong>Automatización de Pedidos:</strong> Al registrar la salida de material, la app propone automáticamente su reposición mediante un Click Único. El sistema calcula con precisión las unidades exactas para alcanzar el stock ideal configurado, eliminando cálculos manuales y optimizando drásticamente el tiempo de gestión.
                                </p>
                            </div>
                        </div>

                        <!-- ITEM 3: VISIÓN ESTRATÉGICA -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item">
                                <div class="slider-container" style="aspect-ratio: 16/10; border-radius: 12px; border: 1px solid var(--glass-border); overflow: hidden;">
                                    <div class="slider-img-container">
                                        <img src="galeria_dentalstock/ejemplo_graficos.png?v=3" alt="Visión Estratégica" class="modal-gallery-img">
                                    </div>
                                    <div class="slider-nav prev" style="display: none;">&lt;</div>
                                    <div class="slider-nav next" style="display: none;">&gt;</div>
                                    <div class="slider-dots" style="display: none;">
                                        <div class="dot active" data-index="0"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem;">Análisis Estratégico</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                                    <strong>Visión Analítica:</strong> Dashboard avanzado para visualizar tendencias de consumo, distribución de costes por categorías y alertas críticas. Permite una toma de decisiones informada, optimizando el presupuesto y garantizando que el laboratorio opere siempre a su máxima capacidad productiva.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
        `
    },
    'autolabai': {
        title: 'AutoLabAI',
        subtitle: 'Inteligencia de Procesos y Automatización',
        description: `
                <div class="modal-body-content">
                    <!-- HEADER -->
                    <header class="modal-header">
                        <div class="project-logo-initials" style="width: 150px; height: 150px; background: linear-gradient(135deg, #2e1065, #8b5cf6); border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 4rem; font-weight: 800; border: 1px solid rgba(255,255,255,0.1);">AL</div>
                        <div>
                            <h2 class="branding" style="font-size: 3.5rem; margin-bottom: 0.5rem;">
                                <span class="branding-autolab">AutoLab</span><span class="branding-ai">AI</span>
                            </h2>
                            <p style="font-size: 1.25rem; color: var(--accent-violet);">Asistente de Gestión de Casos Automatizado</p>
                        </div>
                    </header>

                    <!-- SECCIÓN EXPLICATIVA -->
                    <div class="modal-section-container" style="margin-top: 1rem; margin-bottom: 4rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 3rem; backdrop-filter: blur(20px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                        <div class="modal-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem;">
                            <div>
                                <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="color: var(--accent-violet);">🤖</span> Funcionamiento del Workflow
                                </h3>
                                <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.05rem;">Un motor de IA que actúa como el primer punto de contacto del laboratorio:</p>
                                <ul style="list-style: none; padding-left: 0; color: rgba(255,255,255,0.8); line-height: 1.8;">
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Recepción de email:</strong> Activación instantánea al recibir una nueva orden de trabajo.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Extracción y anonimización de datos:</strong> Captura precisa de datos clínicos y protección de la privacidad del paciente.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Análisis y categorización con IA:</strong> Triaje inteligente para organizar la producción sin intervención humana.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="color: var(--accent-violet);">🔗</span> Ecosistema Conectado
                                </h3>
                                <div style="margin-bottom: 2.2rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">📡 Orquestación Total:</p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;">Sincronización en tiempo real entre n8n, Airtable, Trello y Telegram para una visibilidad 360° del flujo de trabajo.</p>
                                </div>
                                <div style="background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">📧 Comunicación Proactiva:</p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;">Envío automático de correos en HTML solicitando información faltante, eliminando cuellos de botella administrativos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- GALERÍA -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                        <div style="width: 40px; height: 2px; background: var(--accent-violet);"></div>
                        <h2 style="font-size: 1.3rem; color: #fff; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Galería del Proyecto</h2>
                    </div>

                    <div class="modal-gallery-vertical" style="display: flex; flex-direction: column; gap: 2rem;">
                        <!-- ITEM 1: VISIÓN TÉCNICA GLOBAL -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item">
                                <img src="AutoLabAI/presentacion_AutoLabAI/workflow_n8n_AutoLab_AI.png" alt="Arquitectura Completa n8n" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid var(--glass-border); filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.2));">
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem; font-family: 'Sora', sans-serif;">Ecosistema AutoLabAI: Visión Global</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">El ecosistema completo orquestado por n8n asegura una sincronización perfecta entre las herramientas de gestión (Airtable/Trello) y los nodos de inferencia de IA.</p>
                            </div>
                        </div>

                        <!-- ITEM 2: PASOS DETALLADOS DEL WORKFLOW -->
                        <div class="modal-gallery-card" style="display: flex; flex-direction: column; gap: 2.5rem; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.6rem; font-family: 'Sora', sans-serif; text-align: center;">Funcionamiento Detallado</h4>
                            
                            <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                                <!-- Paso 1 -->
                                <div style="display: grid; grid-template-columns: 0.3fr 1.7fr; gap: 3rem; align-items: center;">
                                    <div class="modal-photo-item" style="max-width: 150px;">
                                        <img src="AutoLabAI/presentacion_AutoLabAI/recepcion_email.png" alt="1. Recepción de Email" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                    </div>
                                    <div>
                                        <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">1. Recepción del correo</h5>
                                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                            Se activa el workflow al recibir un email.
                                        </p>
                                    </div>
                                </div>

                                <!-- Paso 2 -->
                                <div style="display: grid; grid-template-columns: 0.3fr 1.7fr; gap: 3rem; align-items: center;">
                                    <div class="modal-photo-item" style="max-width: 150px;">
                                        <img src="AutoLabAI/presentacion_AutoLabAI/extraccion_anonimizacion.png" alt="2. Extracción y Anonimización" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                    </div>
                                    <div>
                                        <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">2. Extracción y anonimización de datos</h5>
                                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                            Se extraen los datos recibidos por texto o por PDF y se sustituye el nombre completo del paciente por sus iniciales. Ejemplo: Carlos Martínez Rubio —> C.M.R.
                                        </p>
                                    </div>
                                </div>

                                <!-- Paso 3 -->
                                <div style="display: grid; grid-template-columns: 0.3fr 1.7fr; gap: 3rem; align-items: center;">
                                    <div class="modal-photo-item" style="max-width: 150px;">
                                        <img src="AutoLabAI/presentacion_AutoLabAI/analisis_y_categorizacion.png" alt="3. Análisis con IA" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                    </div>
                                    <div>
                                        <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">3. Análisis y categorización con IA</h5>
                                        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                            El Agente se encarga de analizar y categorizar el email recibido.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ITEM 2: CATEGORIZACIÓN INTELIGENTE -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1.5rem; font-size: 1.4rem; font-family: 'Sora', sans-serif;">Categorización Inteligente</h4>
                                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.05rem;">El Agente procesa el contenido y lo clasifica automáticamente en:</p>
                                <ul style="list-style: none; padding-left: 0; color: rgba(255,255,255,0.8); line-height: 1.8;">
                                    <li style="margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet);">•</span>
                                        <span><strong>Nuevo Caso:</strong> Apertura de órdenes de trabajo.</span>
                                    </li>
                                    <li style="margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet);">•</span>
                                        <span><strong>Información de Centros de Fresado:</strong> Sincronización de estados de producción.</span>
                                    </li>
                                    <li style="margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet);">•</span>
                                        <span><strong>Correo Basura:</strong> Filtrado automático de ruido.</span>
                                    </li>
                                    <li style="display: flex; align-items: center; gap: 0.8rem;">
                                        <span style="color: var(--accent-violet);">•</span>
                                        <span><strong>Revisión Humana:</strong> Alerta para casos complejos o ambiguos.</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="modal-photo-item">
                                <img src="AutoLabAI/presentacion_AutoLabAI/categorias_workflow.png" alt="Categorías del Workflow" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid var(--glass-border); filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.2));">
                            </div>
                        </div>

                        <!-- ESCENARIOS DE AUTOMATIZACIÓN (ACORDEÓN) -->
                        <div class="modal-gallery-card" style="display: flex; flex-direction: column; gap: 1.5rem; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.6rem; font-family: 'Sora', sans-serif; text-align: center;">Escenarios de Automatización</h4>
                            
                            <!-- ACORDEÓN 1: INFORMACIÓN COMPLETA -->
                            <details open style="border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); overflow: hidden;">
                                <summary style="padding: 1.5rem; color: #fff; font-family: 'Sora'; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: rgba(139, 92, 246, 0.05);">
                                    <span>Escenario A: Nuevo caso con toda la información</span>
                                    <span class="acc-icon" style="transition: transform 0.3s;">▼</span>
                                </summary>
                                <div style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2.5rem;">
                                    <!-- Paso 1 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/toda_informacion_workflow.png" alt="Lógica de Caso Completo" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Detección de información completa</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                Si el Agente de IA determina que el email contiene todos los datos necesarios, activa la ruta de alta automática.
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Paso 2 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/ejemplo_Airtable_workflow.png" alt="Registro en Airtable" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Registro en Airtable</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                Se guardan los datos del caso de forma estructurada en la base de datos para garantizar una trazabilidad total.
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Paso 3 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/ejemplo_tarjeta_trello_workflow.png" alt="Tarjeta en Trello" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Gestión en Trello</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                Se crea automáticamente una tarjeta en el tablero Kanban de producción para el seguimiento visual del técnico.
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Paso 4 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/aviso_telegram_workflow.png" alt="Aviso en Telegram" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Notificación por Telegram</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                Se manda un aviso instantáneo al móvil del técnico de laboratorio avisando de la entrada del nuevo caso.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </details>

                            <!-- ACORDEÓN 2: INFORMACIÓN INCOMPLETA -->
                            <details style="border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); overflow: hidden;">
                                <summary style="padding: 1.5rem; color: #fff; font-family: 'Sora'; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: rgba(139, 92, 246, 0.05);">
                                    <span>Escenario B: Solicitud de información no recibida</span>
                                    <span class="acc-icon" style="transition: transform 0.3s;">▼</span>
                                </summary>
                                <div style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2.5rem;">
                                    <!-- Paso 1 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/solicitud_informacion_faltante_workflow.png" alt="Solicitud Información Faltante" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Flujo de revisión</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                En caso de no haber recibido toda la información necesaria para realizar el trabajo, se envía un correo automático a la clínica dental solicitando la información no recibida.
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Paso 2 -->
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                                        <div class="modal-photo-item" style="max-width: 450px;">
                                            <img src="AutoLabAI/presentacion_AutoLabAI/ejemplo-html.png" alt="Ejemplo Correo HTML" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                        </div>
                                        <div>
                                            <h5 style="color: var(--accent-violet); font-size: 1.2rem; font-family: 'Sora', sans-serif; margin-bottom: 0.8rem;">Comunicación Profesional</h5>
                                            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
                                                Este correo tiene una estructura visual definida con HTML para asegurar que la clínica recibe una comunicación clara, profesional y fácil de responder.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </details>

                            <!-- Aclaración de datos ficticios -->
                            <p style="color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; font-style: italic; margin-top: 1rem; text-align: center;">
                                * Nota Informativa: Todos los datos visibles en las imágenes (nombres, clínicas, direcciones y detalles de casos) son ficticios y han sido generados exclusivamente para fines de demostración.
                            </p>
                        </div>

                        <!-- ITEM 4: CONFIRMACIÓN O INCIDENCIA EN CENTROS DE FRESADO -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item" style="max-width: 450px;">
                                <img src="AutoLabAI/presentacion_AutoLabAI/confirmacion_o_incidencia_workflow.png" alt="Confirmación o Incidencia de Producción" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem; font-family: 'Sora', sans-serif;">Confirmación o incidencia en centros de fresado</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                                    El sistema detecta y clasifica automáticamente las comunicaciones provenientes de los centros de fresado, diferenciando entre una <strong>Confirmación de producción</strong> exitosa o un <strong>Aviso de incidencia</strong> que requiere atención inmediata.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
        `
    },
    'perezoso': {
        title: 'Perezoso Café',
        subtitle: 'Branding & Spot Publicitario IA',
        description: `
                <div class="modal-body-content">
                    <!-- HEADER -->
                    <header class="modal-header">
                        <div class="project-logo-initials" style="width: 150px; height: 150px; background: linear-gradient(135deg, #4E342E, #2A4D69); border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; font-weight: 800; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
                            <img src="proyecto_spot_publicitario/moodboard_spot_publicitario.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;">
                            <span style="position: absolute; font-size: 3rem;">PC</span>
                        </div>
                        <div>
                            <h2 class="branding" style="font-size: 3.5rem; margin-bottom: 0.5rem;">
                                <span class="branding-perezoso-cafe">Perezoso</span> <span class="branding-cafe">Café</span>
                            </h2>
                            <p style="font-size: 1.25rem; color: var(--coffee-sage);">Sinfonía Creativa Generada por IA</p>
                        </div>
                    </header>

                    <!-- SECCIÓN EXPLICATIVA -->
                    <div class="modal-section-container" style="margin-top: 1rem; margin-bottom: 4rem; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 32px; padding: 3rem; backdrop-filter: blur(20px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                        <div class="modal-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem;">
                            <div>
                                <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="color: var(--coffee-sage);">🎨</span> Concepto de Marca
                                </h3>
                                <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.05rem;">Una marca de café de especialidad que nace de la fusión entre la calma y el sabor intenso, proyectando una estética premium y artesanal:</p>
                                <ul style="list-style: none; padding-left: 0; color: rgba(255,255,255,0.8); line-height: 1.8;">
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--coffee-blue); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Continuidad Visual:</strong> Desarrollo de una paleta de colores unificada (Azul Petróleo, Beige, Salvia y Café) aplicada a todos los activos.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--coffee-blue); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Narrativa Sensorial:</strong> Uso de IA para evocar la atmósfera del café recién hecho y el relax del momento de consumo.</span>
                                    </li>
                                    <li style="margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 0.8rem;">
                                        <span style="color: var(--coffee-blue); font-size: 1.2rem; line-height: 1;">✔</span>
                                        <span><strong>Coherencia de Estilo:</strong> Sincronización perfecta entre imagen, vídeo y música para una experiencia de marca inmersiva.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 style="font-family: 'Sora', sans-serif; color: #fff; font-size: 1.8rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                                    <span style="color: var(--coffee-sage);">🛠️</span> Stack Tecnológico AI
                                </h3>
                                <div style="margin-bottom: 2.2rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">🎬 Imágenes y Vídeo:</p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;"><strong>Midjourney</strong> para creación y animación, junto a <strong>Sora</strong> y <strong>Veo3</strong> para clips cinematográficos.</p>
                                </div>
                                <div style="margin-bottom: 2.2rem; background: rgba(255,255,255,0.03); padding: 1.2rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                                    <p style="color: #fff; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.8rem;">🎵 Sonido y Edición:</p>
                                    <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.95rem;"><strong>Suno AI</strong> para la música original y <strong>Capcut</strong> para el montaje final con continuidad integral en todo el proyecto.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- GALERÍA -->
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                        <div style="width: 40px; height: 2px; background: var(--coffee-blue);"></div>
                        <h2 style="font-size: 1.3rem; color: #fff; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Activos del Proyecto</h2>
                    </div>

                    <div class="modal-gallery-vertical" style="display: flex; flex-direction: column; gap: 2.5rem;">
                        
                        <!-- ITEM 1: SPOT PUBLICITARIO -->
                        <div class="modal-gallery-card" style="display: flex; flex-direction: column; gap: 2.5rem; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.6rem; font-family: 'Sora', sans-serif; text-align: center;">Spot Publicitario Final</h4>
                            <div style="width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid var(--glass-border); aspect-ratio: 16/9; background: #000;">
                                <video controls style="width: 100%; height: 100%;">
                                    <source src="proyecto_spot_publicitario/video_Spot_publicitario.mp4" type="video/mp4">
                                    Tu navegador no soporta el vídeo.
                                </video>
                            </div>
                            <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem; text-align: center; max-width: 800px; margin: 0 auto;">
                                Un viaje visual que captura la esencia de <strong>Perezoso Café</strong>. La integración de clips generados por <strong>Sora</strong> y <strong>Veo3</strong> permite una calidad cinematográfica que antes era impensable para una fase de prototipado rápido.
                            </p>
                        </div>

                        <!-- ITEM 2: MOODBOARD -->
                        <div class="modal-gallery-card" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 24px; border: 1px solid var(--glass-border); backdrop-filter: blur(10px);">
                            <div class="modal-photo-item">
                                <img src="proyecto_spot_publicitario/moodboard_spot_publicitario.jpg" alt="Moodboard Perezoso Café" class="modal-gallery-img" style="width: 100%; border-radius: 12px; border: 1px solid var(--glass-border); filter: drop-shadow(0 0 15px rgba(42, 77, 105, 0.2));">
                            </div>
                            <div>
                                <h4 style="color: #fff; margin-bottom: 1rem; font-size: 1.4rem; font-family: 'Sora', sans-serif;">Moodboard y Paleta de Color</h4>
                                <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.05rem;">
                                    El punto de partida: un universo visual coherente generado con <strong>Midjourney</strong>. La paleta de colores no es casual; cada tono busca equilibrar la calma (Salvia/Beige) con la profesionalidad (Azul Petróleo) y la calidez del producto (Marrón Café).
                                </p>
                                <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: #2A4D69; border: 1px solid rgba(255,255,255,0.1);" title="Azul Petróleo"></div>
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: #F5EFE6; border: 1px solid rgba(255,255,255,0.1);" title="Beige Claro"></div>
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: #A8BBA4; border: 1px solid rgba(255,255,255,0.1);" title="Verde Salvia"></div>
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: #4E342E; border: 1px solid rgba(255,255,255,0.1);" title="Marrón Café"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    new Background('bg-canvas');
    let modalBackground = null;

    // Modal elements
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');

    // Open Modal
    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.id.replace('project-', '');
            const data = projectData[projectId];

            if (data) {
                modalBody.innerHTML = data.description;
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                    if (!modalBackground) {
                        modalBackground = new Background('modal-bg-canvas', 40);
                    }
                    initSliders(); // Initialize sliders after content is injected
                }, 10);
                document.body.style.overflow = 'hidden'; // Stop scrolling
            }
        });
    });

    function initSliders() {
        const sliders = document.querySelectorAll('.slider-container');
        sliders.forEach(slider => {
            const container = slider.querySelector('.slider-img-container');
            const images = container.querySelectorAll('img');
            const dots = slider.querySelectorAll('.dot');
            const prevBtn = slider.querySelector('.prev');
            const nextBtn = slider.querySelector('.next');
            let currentIndex = 0;

            const updateSlider = (index) => {
                currentIndex = index;
                if (currentIndex < 0) currentIndex = images.length - 1;
                if (currentIndex >= images.length) currentIndex = 0;

                container.style.transform = `translateX(-${currentIndex * 100} %)`;

                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            };

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlider(currentIndex - 1);
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlider(currentIndex + 1);
            });

            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateSlider(parseInt(dot.dataset.index));
                });
            });
        });
    }

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (modalBackground) {
                modalBackground.stop();
                modalBackground = null;
            }
        }, 500);
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const lbPrev = document.querySelector('.lb-prev');
    const lbNext = document.querySelector('.lb-next');

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    // Delegate click events for images inside the modal (since they are injected dynamically)
    modalBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-gallery-img') || (e.target.tagName === 'IMG' && e.target.closest('.modal-gallery-card'))) {
            const clickedImg = e.target;

            // Collect all zoomable images in the current modal to allow navigation
            currentGalleryImages = Array.from(modalBody.querySelectorAll('.modal-gallery-img, .modal-gallery-card img'));
            currentImageIndex = currentGalleryImages.indexOf(clickedImg);

            openLightbox(clickedImg.src);
        }
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateLightboxNav();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        if (!modal.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    }

    function updateLightboxNav() {
        if (currentGalleryImages.length <= 1) {
            lbPrev.style.display = 'none';
            lbNext.style.display = 'none';
        } else {
            lbPrev.style.display = 'flex';
            lbNext.style.display = 'flex';
        }
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) currentImageIndex = currentGalleryImages.length - 1;
        if (currentImageIndex >= currentGalleryImages.length) currentImageIndex = 0;

        const nextImg = currentGalleryImages[currentImageIndex];
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = nextImg.src;
            lightboxImg.style.opacity = '1';
        }, 150);
    }

    closeLightboxBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    lbPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // Keyboard support for accessibility and UX
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // --- INTERSECTION OBSERVER FOR SECTION ANIMATIONS ---
    const sections = document.querySelectorAll('.section-padding');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Inject fade-in animation styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        @media (max-width: 900px) {
            .modal-gallery-card {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
                padding: 1.5rem !important;
            }
        }
        details[open] .acc-icon {
            transform: rotate(180deg);
        }
        summary::-webkit-details-marker {
            display: none;
        }
    `;
    document.head.appendChild(styleSheet);
});
