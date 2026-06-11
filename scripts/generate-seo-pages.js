import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found. Make sure to run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

const globalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Career Upgrade Online Dental Nursing School",
  "url": "https://careerupgradedentalnursingschool.co.uk",
  "logo": "https://careerupgradedentalnursingschool.co.uk/icon.png",
  "email": "info@careerupgradedentalnursingschool.co.uk",
  "telephone": "+447944624039",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Capital Office, 124 City Road",
    "addressLocality": "London",
    "postalCode": "EC1V 2NX",
    "addressCountry": "GB"
  }
};

const routes = [
  {
    path: '/',
    filename: 'index.html',
    title: 'Career Upgrade - Online Dental Nursing School UK | GDC Qualification',
    description: "Career Upgrade is the UK's flexible online dental nursing school. Train to become a qualified dental nurse, achieve your GDC registration, and start anytime. Government funding available.",
    keywords: 'dental nurse course UK, online dental nursing course, dental nurse training UK, become a dental nurse UK, GDC dental nurse registration, dental nursing school UK, dental nurse diploma UK, NEBDN dental nurse course',
    url: 'https://careerupgradedentalnursingschool.co.uk/',
    schemas: [
      globalOrgSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Career Upgrade Online Dental Nursing School",
        "url": "https://careerupgradedentalnursingschool.co.uk",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://careerupgradedentalnursingschool.co.uk/faq?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  },
  {
    path: '/about',
    filename: 'about.html',
    title: 'About Our Dental Nursing School | Expert Tutors & Support | Career Upgrade',
    description: 'Meet the Career Upgrade team — GDC-registered dental nursing tutors and assessors dedicated to supporting every student from enrolment to qualification.',
    keywords: 'dental nursing tutors UK, dental nurse training support, GDC registered assessors, online dental nursing school UK',
    url: 'https://careerupgradedentalnursingschool.co.uk/about',
    schemas: [
      globalOrgSchema,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://careerupgradedentalnursingschool.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://careerupgradedentalnursingschool.co.uk/about" }
        ]
      }
    ]
  },
  {
    path: '/apply',
    filename: 'apply.html',
    title: 'Apply for Dental Nurse Training UK | Start Your Application | Career Upgrade',
    description: 'Apply now for the UK online dental nursing course. Government funded and fee-paying routes available. Aged 16+, no experience needed. Our team replies within 1 hour.',
    keywords: 'apply dental nurse course UK, dental nurse application UK, enrol dental nursing school, government funded dental nurse application',
    url: 'https://careerupgradedentalnursingschool.co.uk/apply',
    schemas: [
      globalOrgSchema,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://careerupgradedentalnursingschool.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Apply", "item": "https://careerupgradedentalnursingschool.co.uk/apply" }
        ]
      }
    ]
  },
  {
    path: '/contact',
    filename: 'contact.html',
    title: 'Contact Our Dental Nursing Admissions Team | Career Upgrade UK',
    description: 'Get in touch with Career Upgrade. Call, WhatsApp or email our UK admissions team about dental nursing courses, funding and start dates. Reply within 1 hour.',
    keywords: 'contact dental nursing school UK, dental nurse course enquiry, admissions dental nursing UK',
    url: 'https://careerupgradedentalnursingschool.co.uk/contact',
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Career Upgrade Admissions",
        "description": "Get in touch with our admissions team for the dental nursing course.",
        "url": "https://careerupgradedentalnursingschool.co.uk/contact"
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Career Upgrade Online Dental Nursing School",
        "url": "https://careerupgradedentalnursingschool.co.uk",
        "email": "info@careerupgradedentalnursingschool.co.uk",
        "telephone": "+447944624039",
        "openingHours": "Mo-Fr 09:00-18:00",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Capital Office, 124 City Road",
          "addressLocality": "London",
          "postalCode": "EC1V 2NX",
          "addressCountry": "GB"
        },
        "image": "https://careerupgradedentalnursingschool.co.uk/icon.png"
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://careerupgradedentalnursingschool.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://careerupgradedentalnursingschool.co.uk/contact" }
        ]
      }
    ]
  },
  {
    path: '/courses',
    filename: 'courses.html',
    title: 'Online Dental Nursing Course UK | Government Funded | Career Upgrade',
    description: '1-year flexible online dental nursing course with government funding options, payment plans and a clear GDC registration pathway. Start anytime, aged 16+.',
    keywords: 'dental nursing course UK, online dental nurse training, government funded dental nurse course, dental nurse diploma UK, GDC qualification, NCFE Level 3 dental nursing',
    url: 'https://careerupgradedentalnursingschool.co.uk/courses',
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "NCFE CACHE Level 3 Diploma in Principles and Practice of Dental Nursing",
        "description": "A flexible 1-year online dental nursing qualification leading to GDC registration. Study at your own pace with expert tutor and assessor support. Government funding available.",
        "provider": globalOrgSchema,
        "timeRequired": "P1Y",
        "occupationalCategory": "Dental Nurse",
        "educationalLevel": "Level 3",
        "url": "https://careerupgradedentalnursingschool.co.uk/courses",
        "hasCourseInstance": [
          {
            "@type": "CourseInstance",
            "courseMode": "Online",
            "courseWorkload": "PT10H"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://careerupgradedentalnursingschool.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://careerupgradedentalnursingschool.co.uk/courses" }
        ]
      }
    ]
  },
  {
    path: '/faq',
    filename: 'faq.html',
    title: 'Dental Nursing Course FAQs | Career Upgrade UK',
    description: 'Answers to common questions about our UK online dental nursing course — funding, age requirements, course duration, GDC registration and more.',
    keywords: 'dental nurse course FAQ, dental nursing questions UK, government funded dental nurse, dental nurse age requirement, GDC registration FAQ',
    url: 'https://careerupgradedentalnursingschool.co.uk/faq',
    schemas: [
      globalOrgSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who can apply?",
            "acceptedAnswer": { "@type": "Answer", "text": "Living in the UK with passion for dental nursing. No prior experience is required." }
          },
          {
            "@type": "Question",
            "name": "Is the course fully online?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes - the theory is delivered through our modern online platform. Practical competencies are completed in a UK dental practice setting with assessor support." }
          },
          {
            "@type": "Question",
            "name": "Can I work while studying?",
            "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Most of our students train as dental nurses in a UK practice while they study. Many employers also contribute to course fees." }
          },
          {
            "@type": "Question",
            "name": "Are payment plans available?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer flexible monthly instalment plans and government-funded routes for eligible learners." }
          },
          {
            "@type": "Question",
            "name": "Is the qualification recognised?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our course leads to a dental nursing qualification and a clear pathway to GDC registration." }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://careerupgradedentalnursingschool.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://careerupgradedentalnursingschool.co.uk/faq" }
        ]
      }
    ]
  },
  {
    path: '/privacy-policy',
    filename: 'privacy-policy.html',
    title: 'Privacy Policy - Career Upgrade Online Dental Nursing School',
    description: 'Privacy Policy for Career Upgrade Online Dental Nursing School.',
    keywords: 'privacy policy dental nursing school',
    url: 'https://careerupgradedentalnursingschool.co.uk/privacy-policy',
    noindex: true,
    schemas: [
      globalOrgSchema
    ]
  },
  {
    path: '/terms',
    filename: 'terms.html',
    title: 'Terms & Conditions - Career Upgrade Online Dental Nursing School',
    description: 'Terms and Conditions for Career Upgrade Online Dental Nursing School.',
    keywords: 'terms and conditions dental nursing school',
    url: 'https://careerupgradedentalnursingschool.co.uk/terms',
    noindex: true,
    schemas: [
      globalOrgSchema
    ]
  }
];

// Generate HTML files
routes.forEach(route => {
  let html = template;
  
  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${route.title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description" content="[^"]*?"\s*\/>/gi, `<meta name="description" content="${route.description}" />`);
  
  // Replace Meta Keywords
  html = html.replace(/<meta name="keywords" content="[^"]*?"\s*\/>/gi, `<meta name="keywords" content="${route.keywords}" />`);
  
  // Replace Canonical
  html = html.replace(/<link rel="canonical" href="[^"]*?"\s*\/>/gi, `<link rel="canonical" href="${route.url}" />`);
  
  // Replace OG Title
  html = html.replace(/<meta property="og:title" content="[^"]*?"\s*\/>/gi, `<meta property="og:title" content="${route.title}" />`);
  
  // Replace OG Description
  html = html.replace(/<meta property="og:description" content="[^"]*?"\s*\/>/gi, `<meta property="og:description" content="${route.description}" />`);
  
  // Replace OG URL
  html = html.replace(/<meta property="og:url" content="[^"]*?"\s*\/>/gi, `<meta property="og:url" content="${route.url}" />`);
  
  // Replace Twitter Title
  html = html.replace(/<meta name="twitter:title" content="[^"]*?"\s*\/>/gi, `<meta name="twitter:title" content="${route.title}" />`);
  
  // Replace Twitter Description
  html = html.replace(/<meta name="twitter:description" content="[^"]*?"\s*\/>/gi, `<meta name="twitter:description" content="${route.description}" />`);

  // Handle NoIndex
  if (route.noindex) {
    html = html.replace(
      /<meta name="robots" content="[^"]*?"\s*\/>/gi,
      `<meta name="robots" content="noindex, nofollow" />`
    );
  }

  // Inject Schemas
  const schemaScripts = route.schemas.map(schema => 
    `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`
  ).join('\n');

  html = html.replace(
    '<!-- Dynamic JSON-LD will be injected here by build script -->',
    schemaScripts
  );

  fs.writeFileSync(path.join(distDir, route.filename), html, 'utf-8');
  console.log(`Generated SEO page: ${route.filename}`);
});

// Generate Sitemap
const sitemapPath = path.join(distDir, 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];

const sitemapUrls = routes
  .filter(r => !r.noindex)
  .map(route => `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/' || route.path === '/courses' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : route.path === '/courses' || route.path === '/apply' ? '0.9' : '0.8'}</priority>
  </url>`).join('');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls}
</urlset>`;

fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
console.log('Generated dynamic sitemap.xml');

// Remove the static sitemap from public if it exists so there's no confusion, though dist overrides it.
const publicSitemap = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(publicSitemap)) {
  fs.unlinkSync(publicSitemap);
  console.log('Removed static public/sitemap.xml to prefer dynamic generated one');
}

console.log("Enterprise Backend SEO generation completed successfully.");
