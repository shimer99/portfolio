import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { categories, certificateCategories, contactLinks } from "./data";
import "./index.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay },
  }),
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#categories", label: "Categories" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <a href="#" className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text">
          My Portfolio
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-slate-300">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link hover:text-cyan-300">
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden px-4 py-2 rounded-xl border border-white/10 text-slate-200"
        >
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden px-4 sm:px-6 pb-4"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-3 text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-white/5 transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const words = [
    "Full Stack Developer",
    "UI/UX Designer",
    "AI Enthusiast",
    "Photographer",
    "Accounting & Finance Student"
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1200);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(words[index].substring(0, subIndex));
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <section className="hero-glow max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 min-h-[calc(100vh-80px)] flex items-center">
      <div className="hero-content grid lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.1}>
          <p className="uppercase tracking-[0.28em] sm:tracking-[0.35em] text-cyan-300 text-xs sm:text-sm mb-4 sm:mb-5">
            Welcome
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
            Hi, I’m <span className="gradient-text">Shimer</span>
          </h2>

          <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-slate-300 leading-7 sm:leading-9 max-w-2xl">
            I am a multidisciplinary creator building user-centered digital solutions
            through software development, design, AI exploration, photography, and
            business thinking, with a focus on creativity and problem solving.
          </p>
          <div className="mt-8 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#categories"
              className="glow-button px-5 sm:px-7 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition font-semibold"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="px-5 sm:px-7 py-3 rounded-2xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <div className="neon-card w-full max-w-[420px] sm:max-w-[460px]">
            <div className="neon-card-inner w-full min-h-[440px] sm:min-h-[500px] flex items-center justify-center p-6 sm:p-10 text-center">
              <div className="w-full">
                <div className="profile-ring !w-[160px] !h-[160px] sm:!w-[190px] sm:!h-[190px] mb-6">
                  <img src="/profile.jpg" alt="Shimer profile" />
                </div>

                <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-cyan-300 mb-4">
                  IT • Design • Business • Creativity
                </p>

                {/* ✅ TYPING EFFECT HERE */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.2] text-white">
                  I am <span className="gradient-text">{text}</span>
                  <span className="animate-pulse">|</span>
                </h3>

                <p className="mt-3 text-base sm:text-lg md:text-[1.15rem] font-medium text-slate-300 leading-7">
                  passionate about software, design, creativity, and business thinking
                </p>

                <p className="text-slate-400 mt-6 text-sm sm:text-base leading-7 max-w-md mx-auto">
                    Building a personal brand as a multidisciplinary creator in software development,
                    UI/UX design, artificial intelligence, photography, and business thinking,
                    focused on designing impactful and modern digital experiences.
                </p>

                <div className="mt-8 flex justify-center gap-3 flex-wrap sm:flex-nowrap">
                  <span className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-blue-500/10 text-blue-300 border border-blue-400/20">
                    IT
                  </span>
                  {/* <span className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-violet-500/10 text-violet-300 border border-violet-400/20">
                    UI/UX
                  </span> */}
                  <span className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
                    Accounting
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                    Photography
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

}

function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.1}
        className="glass rounded-3xl p-6 sm:p-8 md:p-12"
      >
        <h3 className="section-title gradient-text">About Me</h3>
        <p className="text-slate-300 leading-7 sm:leading-8 text-base sm:text-lg">
          I am an IT undergraduate and multidisciplinary creator with interests in software
          development, UI/UX design, artificial intelligence, photography, and business
          learning. I focus on building meaningful digital solutions, designing clean and
          intuitive user experiences, and presenting work in a creative and professional way.
        </p>

        <p className="text-slate-300 leading-7 sm:leading-8 text-base sm:text-lg mt-4">
          This portfolio represents my learning journey and growth across both technical and
          creative fields. It includes development projects, design work, visual content,
          selected certificates, and achievements that reflect my passion for continuous
          learning, versatility, and problem-solving.
        </p>
      </motion.div>
    </section>
  );
}

function ImageViewer({ image, title, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.2, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.2, 1));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-6xl h-full flex flex-col">
        <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
          <h4 className="text-white text-lg sm:text-xl font-semibold">{title}</h4>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
              className="px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
            >
              Zoom Out
            </button>

            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
            >
              Zoom In
            </button>

            <button
              onClick={() => setZoom(1)}
              className="px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
            >
              Reset
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white border border-white/10 hover:border-cyan-300 transition"
            >
              Close
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl p-4 sm:p-6 flex-1 overflow-auto">
          <div className="w-full h-full flex items-center justify-center overflow-auto">
            <img
              src={image}
              alt={title}
              className="rounded-2xl border border-white/10 transition-transform duration-300 max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !selectedImage) onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, selectedImage]);

  if (!project) return null;

  const primaryLink =
    project.github || project.figma || project.live || project.link || "#";

  const primaryLabel = project.figma
    ? "View Figma"
    : project.github
      ? "GitHub"
      : project.live
        ? "Live Demo"
        : project.link
          ? "View More"
          : null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-6">
        <div className="glass w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={project.coverImage || project.image}
              alt={project.title}
              className="w-full h-52 sm:h-64 md:h-80 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-950/70 text-white px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-300 transition"
            >
              Close
            </button>
          </div>

          <div className="p-5 sm:p-8">
            <p className="text-cyan-300 text-sm mb-2">{project.type}</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {project.title}
            </h3>

            <p className="text-slate-300 leading-7 sm:leading-8 mb-6">
              {project.fullDescription || project.description}
            </p>

            {project.technologies?.length > 0 && (
              <>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full text-sm bg-blue-500/10 text-blue-300 border border-blue-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}

            {project.gallery?.length > 0 && (
              <>
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-semibold text-white">
                    Gallery
                  </h4>
                  <p className="text-sm text-slate-400">
                    Click any image to view larger
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {project.gallery.map((photo, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(photo)}
                      className="block text-left rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-300 transition"
                    >
                      <img
                        src={photo}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-52 sm:h-60 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-4">
              {primaryLabel && (
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition font-semibold"
                >
                  {primaryLabel}
                </a>
              )}

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageViewer
        image={selectedImage}
        title={project.title}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

function CertificateModal({ certificateCategory, onClose }) {
  const [selectedCertificateImage, setSelectedCertificateImage] = useState(null);

  useEffect(() => {
    if (!certificateCategory) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !selectedCertificateImage) onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificateCategory, onClose, selectedCertificateImage]);

  if (!certificateCategory) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-6">
        <div className="glass w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={certificateCategory.coverImage}
              alt={certificateCategory.title}
              className="w-full h-52 sm:h-64 md:h-80 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-950/70 text-white px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-300 transition"
            >
              Close
            </button>
          </div>

          <div className="p-5 sm:p-8">
            <p className="text-cyan-300 text-sm mb-2">{certificateCategory.type}</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {certificateCategory.title}
            </h3>

            <p className="text-slate-300 leading-7 sm:leading-8 mb-8">
              {certificateCategory.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificateCategory.items?.map((cert, index) => (
                <div
                  key={index}
                  className="glass rounded-3xl overflow-hidden border border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCertificateImage(cert.image)}
                    className="block w-full text-left"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-52 object-cover hover:opacity-90 transition"
                    />
                  </button>

                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-4">
                      {cert.title}
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedCertificateImage(cert.image)}
                        className="px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
                      >
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/15 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImageViewer
        image={selectedCertificateImage}
        title={certificateCategory.title}
        onClose={() => setSelectedCertificateImage(null)}
      />
    </>
  );
}

function CategorySection({ category, index }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id={category.id} className="mb-16 sm:mb-20 scroll-mt-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.12 + index * 0.05}
      >
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
              {category.title}
            </h3>
            <p className="text-slate-300 mt-3 max-w-2xl leading-7 text-sm sm:text-base">
              {category.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {category.items?.map((item, itemIndex) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.08, duration: 0.45 }}
              className="glass rounded-3xl overflow-hidden card-hover h-full flex flex-col"
            >
              <img
                src={item.coverImage || item.image}
                alt={item.title}
                className="w-full h-52 sm:h-56 md:h-60 object-cover"
              />

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-300/20 mb-4 w-fit">
                  {item.type}
                </span>

                <h4 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                  {item.title}
                </h4>

                <p className="text-slate-300 leading-7 mb-4 text-sm sm:text-base flex-1">
                  {item.description}
                </p>

                {item.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {item.gallery?.length > 0 && (
                  <p className="text-xs text-slate-400 mb-4">
                    {item.gallery.length} image{item.gallery.length > 1 ? "s" : ""} available
                  </p>
                )}

                <div className="mt-auto flex gap-3 flex-wrap">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </motion.div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.15}
      >
        <h3 className="section-title gradient-text">My Categories</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 sm:mb-14">
          {categories?.map((category, index) => (
            <motion.a
              key={category.id}
              href={`#${category.id}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-3xl p-6 sm:p-8 block"
            >
              <h4 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                {category.title}
              </h4>
              <p className="text-slate-300 leading-7 text-sm sm:text-base">
                {category.description}
              </p>
            </motion.a>
          ))}
        </div>

        {categories?.map((category, index) => (
          <CategorySection key={category.id} category={category} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

function Certificates() {
  const [selectedCertificateCategory, setSelectedCertificateCategory] = useState(null);

  return (
    <section id="certificates" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.2}
      >
        <h3 className="section-title gradient-text">Certificates</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {certificateCategories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass rounded-3xl overflow-hidden card-hover"
            >
              <img
                src={category.coverImage}
                alt={category.title}
                className="w-full h-52 sm:h-56 object-cover"
              />

              <div className="p-6">
                <p className="text-sm text-cyan-300 mb-2">{category.type}</p>
                <h4 className="text-lg sm:text-xl font-bold mb-3 text-white">
                  {category.title}
                </h4>
                <p className="text-slate-300 leading-7 text-sm sm:text-base mb-5">
                  {category.description}
                </p>
                <p className="text-xs text-slate-400 mb-5">
                  {category.items?.length || 0} certificate
                  {(category.items?.length || 0) > 1 ? "s" : ""}
                </p>

                <button
                  onClick={() => setSelectedCertificateCategory(category)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
                >
                  View Certificates
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <CertificateModal
          certificateCategory={selectedCertificateCategory}
          onClose={() => setSelectedCertificateCategory(null)}
        />
      </motion.div>
    </section>
  );
}

function Contact() {
  const contactItems = [
    {
      title: "LinkedIn",
      description: "Connect with me professionally and view my profile.",
      link: contactLinks.linkedin,
      buttonText: "Open LinkedIn",
      icon: "💼",
      buttonStyle:
        "px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition",
    },
    {
      title: "GitHub",
      description: "Explore my repositories, coding work, and technical projects.",
      link: contactLinks.github,
      buttonText: "Open GitHub",
      icon: "💻",
      buttonStyle:
        "px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition",
    },
    {
      title: "Email",
      description: "Send me an email for collaborations, opportunities, or inquiries.",
      link: contactLinks.email,
      buttonText: "Send Email",
      icon: "📧",
      buttonStyle:
        "px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition",
    },
    {
      title: "WhatsApp",
      description: "Message me directly on WhatsApp for quick communication.",
      link: contactLinks.whatsapp,
      buttonText: "Open WhatsApp",
      icon: "📱",
      buttonStyle:
        "px-4 py-2 rounded-xl border border-white/15 text-slate-200 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 transition",
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0.25}
        className="glass rounded-3xl p-6 sm:p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4">
            Contact Me
          </h3>

          <p className="text-slate-300 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base">
            Reach out for collaborations, development work, design opportunities,
            photography-related projects, or professional connections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {contactItems.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target={item.title === "Email" ? "_self" : "_blank"}
              rel={item.title === "Email" ? undefined : "noreferrer"}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-3xl p-6 sm:p-7 card-hover flex flex-col items-center text-center border border-white/10"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-cyan-500/10 border border-cyan-400/20 mb-5">
                {item.icon}
              </div>

              <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>

              <p className="text-slate-300 leading-7 text-sm sm:text-base mb-6 flex-1">
                {item.description}
              </p>

              <span className={item.buttonStyle}>{item.buttonText}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-mesh min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Certificates />
      <Contact />

      <footer className="text-center text-slate-400 py-8 border-t border-white/10 px-4">
        © 2026 Shimer. All rights reserved.
      </footer>
    </div>
  );
}