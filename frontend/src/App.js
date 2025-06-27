import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import { path } from './path';


function Seccion({ id, titulo, icono, extraInicio }) {
  const [contenido, setContenido] = useState('Cargando...');
  const [title, setTitle] = useState('Cargando...');
  const [img, setImg] = useState(null);


  useEffect(() => {
    console.log('/api/secciones/' + id);
    
    fetch('/api/secciones/' + id)
      .then(res => res.json())
      .then(data => {
        console.log("acaaaaaa: ", data);
        if (data.contenido) {
          setContenido(data.contenido)
          setTitle(data.nombre)
        }
        else {
          setContenido('No se encontró contenido.')
        }
        if (data.img) setImg(data.img);
      })
      .catch((e) => setContenido('Error al cargar el contenido.' + e));
  }, [id]);

  return (
    <section className="section">
      {/* Icono de maletín corporativo */}
      <div className='extraTitle'>
        <h2>
        {title}
        </h2>
      </div>
      {img && (
        <div className="img-container">
          <img src={path.src + img} alt={titulo} className="seccion-img" />
        </div>
      )}
      <div className='extraTitle'>
        <p className='extraParrafo'>{contenido}</p>
      </div>
      
      {extraInicio}
    </section>
  );
}

function ExtraInicio() {
  return (
    <div className="extra-inicio">
      
      <div className="card-block">
        <h2>👥 ¿Quiénes somos?</h2>
        <p style={{color: '#2b3a4a', fontWeight: 500}}>Somos un equipo multidisciplinario apasionado por la tecnología, el diseño y la innovación digital. Nuestra misión es potenciar tu presencia online con soluciones creativas y efectivas.</p>
      </div>
      <div className="card-block">
        <h2>✨ ¿Por qué elegirnos?</h2>
        <ul>
          <li>✔️ Experiencia y profesionalismo</li>
          <li>✔️ Atención personalizada</li>
          <li>✔️ Diseño moderno y adaptable</li>
          <li>✔️ Soporte técnico dedicado</li>
        </ul>
      </div>
    </div>
  );
}

function GaleriaImagenes() {
  return (
    <div className="galeria-imagenes" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2.5rem'}}>
      <div style={{textAlign: 'center'}}>
        <img src={path.src + 'img4.jpg'} alt="Proyecto 1" style={{maxWidth: '220px', borderRadius: '12px', boxShadow: '0 2px 12px #232F3E33'}} />
        <p>Landing page para startup</p>
      </div>
      <div style={{textAlign: 'center'}}>
        <img src={path.src + 'img5.jpg'} alt="Proyecto 2" style={{maxWidth: '220px', borderRadius: '12px', boxShadow: '0 2px 12px #232F3E33'}} />
        <p>Rediseño de identidad visual</p>
      </div>
      <div style={{textAlign: 'center'}}>
        <img src={path.src + 'img6.jpg'} alt="Proyecto 3" style={{maxWidth: '220px', borderRadius: '12px', boxShadow: '0 2px 12px #232F3E33'}} />
        <p>Campaña de marketing digital</p>
      </div>
      <div style={{textAlign: 'center'}}>
        <img src={path.src + 'img7.jpg'} alt="Proyecto 4" style={{maxWidth: '220px', borderRadius: '12px', boxShadow: '0 2px 12px #232F3E33'}} />
        <p>Desarrollo de e-commerce</p>
      </div>
    </div>
  );
}



function Contacto() {
  return (
    <>
        <div className='extraTitleContact'>
          <h1>📞 Contáctanos</h1>
          <p style={{fontSize: '1.12rem', color: '#2b3a4a', marginBottom: '2rem'}}>¿Listo para impulsar tu negocio? Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
        </div>
        <form className="contact-form" style={{background: '#f7fafd', borderRadius: '16px', boxShadow: '0 2px 12px #232F3E22', padding: '2.2rem 2rem', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
        <input type="text" placeholder="Nombre completo" required  />
        <input type="text" placeholder="Empresa (opcional)"  />
        <input type="email" placeholder="Correo electrónico" required  />
        <input type="tel" placeholder="Teléfono"  />
        <textarea placeholder="¿En qué podemos ayudarte?" className='contact-form-input' ></textarea>
        <button type="submit" style={{background: 'linear-gradient(90deg, #232F3E 0%, #61dafb 100%)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '7px', fontSize: '1.08rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px #61dafb33', letterSpacing: '1px', transition: 'background 0.2s, color 0.2s'}}>Enviar mensaje</button>
        </form>
        <div style={{marginTop: '2.5rem', textAlign: 'center'}}>
          <a className="whatsapp-btn" href="https://wa.me/549XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{fontSize: '1.12rem', padding: '1rem 2.2rem', borderRadius: '9px', background: 'linear-gradient(90deg, #25d366 0%, #128c7e 100%)', color: '#fff', fontWeight: 'bold', boxShadow: '0 2px 8px #25d36644', display: 'inline-block', marginBottom: '0.7rem'}}>Contactar por WhatsApp</a>
        <div style={{marginTop: '1.2rem', color: '#232F3E', fontSize: '1.05rem'}}>
          <p><b>Correo:</b> contacto@tusitio.com</p>
          <p><b>Teléfono:</b> +54 9 11 1234-5678</p>
        </div>
      </div>
     
      </>
  );
}

function WhatsAppBubble() {
  return (
    <a
      href="https://wa.me/549XXXXXXXXXX"
      className="whatsapp-bubble"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
    <img src={path.src + 'wp.png'} alt="WhatsApp" style={{ width: '150%', height: '150%'}} />
  </a>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Contacto</h3>
          <p>📧 contacto@tusitio.com</p>
          <p>☎️ +54 9 11 1234-5678</p>
        </div>
        <div>
          <h3>Dirección</h3>
          <p>Av. Siempre Viva 1234</p>
          <p>Ciudad Autónoma de Buenos Aires, Argentina</p>
        </div>
        <div>
          <h3>Redes</h3>
          <a href="#" className="footer-link">Instagram</a> | <a href="#" className="footer-link">Facebook</a> | <a href="#" className="footer-link">LinkedIn</a>
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} TuSitio. Todos los derechos reservados.</div>
    </footer>
  );
}

function NosotrosPerfiles() {
  return (
    <div className="nosotros-perfiles" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2.5rem'}}>
      <div style={{textAlign: 'center', maxWidth: '200px'}}>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Juan Pérez" style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', boxShadow: '0 2px 12px #232F3E33'}} />
        <h4>Juan Pérez</h4>
        <p>Desarrollador Full Stack</p>
      </div>
      <div style={{textAlign: 'center', maxWidth: '200px'}}>
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="María Gómez" style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', boxShadow: '0 2px 12px #232F3E33'}} />
        <h4>María Gómez</h4>
        <p>Diseñadora UX/UI</p>
      </div>
      <div style={{textAlign: 'center', maxWidth: '200px'}}>
        <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Carlos Ruiz" style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', boxShadow: '0 2px 12px #232F3E33'}} />
        <h4>Carlos Ruiz</h4>
        <p>Especialista en Marketing</p>
      </div>
      <div style={{textAlign: 'center', maxWidth: '200px'}}>
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Lucía Fernández" style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', boxShadow: '0 2px 12px #232F3E33'}} />
        <h4>Lucía Fernández</h4>
        <p>Project Manager</p>
      </div>
    </div>
  );
}

function ServiciosBoxes() {
  return (
    <div className="servicios-boxes" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '2.5rem'}}>
      <div style={{background: '#E3E6E6', borderRadius: '16px', boxShadow: '0 2px 12px #232F3E33', padding: '2rem 1.5rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
        <h3>Desarrollo Web</h3>
        <p>Aplicaciones y sitios web modernos, rápidos y seguros.</p>
      </div>
      <div style={{background: '#E3E6E6', borderRadius: '16px', boxShadow: '0 2px 12px #232F3E33', padding: '2rem 1.5rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
        <h3>Diseño Gráfico</h3>
        <p>Identidad visual, branding y piezas gráficas creativas.</p>
      </div>
      <div style={{background: '#E3E6E6', borderRadius: '16px', boxShadow: '0 2px 12px #232F3E33', padding: '2rem 1.5rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
        <h3>Marketing Digital</h3>
        <p>Campañas, SEO y gestión de redes sociales para crecer online.</p>
      </div>
      <div style={{background: '#E3E6E6', borderRadius: '16px', boxShadow: '0 2px 12px #232F3E33', padding: '2rem 1.5rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
        <h3>Soporte Técnico</h3>
        <p>Mantenimiento, actualizaciones y asistencia personalizada.</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  // Declarar los refs siempre en el mismo orden
  const homeRef = useRef(null);
  const nosotrosRef = useRef(null);
  const serviciosRef = useRef(null);
  const galeriaRef = useRef(null);
  const contactoRef = useRef(null);
  const nodeRefs = {
    '/': homeRef,
    '/nosotros': nosotrosRef,
    '/servicios': serviciosRef,
    '/galeria': galeriaRef,
    '/contacto': contactoRef
  };
  const currentKey = location.pathname;
  const nodeRef = nodeRefs[currentKey] || homeRef;
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={currentKey} classNames="fade-section" timeout={700} nodeRef={nodeRef}>
        <div ref={nodeRef} style={{width: '100%'}}>
          <Routes location={location}>
            <Route path="/" element={<Seccion id={1} extraInicio={<ExtraInicio />} />} />
            <Route path="/nosotros" element={<Seccion id={2} titulo="Nosotros" icono="🧑‍💼" extraInicio={<NosotrosPerfiles />} />} />
            <Route path="/servicios" element={<Seccion id={3} titulo="Servicios / Productos" icono="🧾" extraInicio={<ServiciosBoxes />} />} />
            <Route path="/galeria" element={<Seccion id={4} titulo="Galeria" icono="🧾" extraInicio={<GaleriaImagenes />}/>} />
            <Route path="/contacto" element={<Seccion id={5} titulo="Contacto" icono="🧾" extraInicio={<Contacto/>} />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleMenuClose = () => setMenuOpen(false);
  return (
    <Router>
      {/* Fondo difuminado, cubre toda la pantalla */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'url(../img/background.jpg) center top no-repeat',
        backgroundSize: 'cover',
        filter: 'blur(10px)',
        opacity: 0.45,
        pointerEvents: 'none',
      }} />
      {/* Header a todo el ancho */}
      <nav className="main-nav responsive-nav">
        <img src={path.src + 'logo.png'} alt="Logo" className="logo-header" onClick={handleMenuClose} />
        <button className="hamburger" onClick={handleMenuToggle} aria-label="Abrir menú">
          <span className={menuOpen ? 'hamburger-bar open' : 'hamburger-bar'}></span>
          <span className={menuOpen ? 'hamburger-bar open' : 'hamburger-bar'}></span>
          <span className={menuOpen ? 'hamburger-bar open' : 'hamburger-bar'}></span>
        </button>
        <div className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <Link to="/" onClick={handleMenuClose}>Inicio</Link>
          <Link to="/nosotros" onClick={handleMenuClose}>Nosotros</Link>
          <Link to="/servicios" onClick={handleMenuClose}>Servicios</Link>
          <Link to="/galeria" onClick={handleMenuClose}>Galería</Link>
          <Link to="/contacto" onClick={handleMenuClose}>Contacto</Link>
        </div>
      </nav>
      {/* Contenedor principal centrado */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: 'calc(100vh - 180px)', // deja espacio para header y footer
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        width: '100%',
      }}>
        <AnimatedRoutes />
        <WhatsAppBubble />
      </div>
      {/* Footer a todo el ancho */}
      <Footer />
    </Router>
  );
}

export default App;
