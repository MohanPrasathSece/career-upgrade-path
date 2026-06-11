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

const routes = [
  {
    path: '/about',
    filename: 'about.html',
    title: 'About Our Dental Nursing School | Expert Tutors & Support | Career Upgrade',
    description: 'Meet the Career Upgrade team — GDC-registered dental nursing tutors and assessors dedicated to supporting every student from enrolment to qualification.',
    keywords: 'dental nursing tutors UK, dental nurse training support, GDC registered assessors, online dental nursing school UK',
    url: 'https://careerupgradedentalnursingschool.co.uk/about'
  },
  {
    path: '/apply',
    filename: 'apply.html',
    title: 'Apply for Dental Nurse Training UK | Start Your Application | Career Upgrade',
    description: 'Apply now for the UK online dental nursing course. Government funded and fee-paying routes available. Aged 16+, no experience needed. Our team replies within 1 hour.',
    keywords: 'apply dental nurse course UK, dental nurse application UK, enrol dental nursing school, government funded dental nurse application',
    url: 'https://careerupgradedentalnursingschool.co.uk/apply'
  },
  {
    path: '/contact',
    filename: 'contact.html',
    title: 'Contact Our Dental Nursing Admissions Team | Career Upgrade UK',
    description: 'Get in touch with Career Upgrade. Call, WhatsApp or email our UK admissions team about dental nursing courses, funding and start dates. Reply within 1 hour.',
    keywords: 'contact dental nursing school UK, dental nurse course enquiry, admissions dental nursing UK',
    url: 'https://careerupgradedentalnursingschool.co.uk/contact'
  },
  {
    path: '/courses',
    filename: 'courses.html',
    title: 'Online Dental Nursing Course UK | Government Funded | Career Upgrade',
    description: '1-year flexible online dental nursing course with government funding options, payment plans and a clear GDC registration pathway. Start anytime, aged 16+.',
    keywords: 'dental nursing course UK, online dental nurse training, government funded dental nurse course, dental nurse diploma UK, GDC qualification, NCFE Level 3 dental nursing',
    url: 'https://careerupgradedentalnursingschool.co.uk/courses'
  },
  {
    path: '/faq',
    filename: 'faq.html',
    title: 'Dental Nursing Course FAQs | Career Upgrade UK',
    description: 'Answers to common questions about our UK online dental nursing course — funding, age requirements, course duration, GDC registration and more.',
    keywords: 'dental nurse course FAQ, dental nursing questions UK, government funded dental nurse, dental nurse age requirement, GDC registration FAQ',
    url: 'https://careerupgradedentalnursingschool.co.uk/faq'
  },
  {
    path: '/privacy-policy',
    filename: 'privacy-policy.html',
    title: 'Privacy Policy - Career Upgrade Online Dental Nursing School',
    description: 'Privacy Policy for Career Upgrade Online Dental Nursing School.',
    keywords: 'privacy policy dental nursing school',
    url: 'https://careerupgradedentalnursingschool.co.uk/privacy-policy'
  },
  {
    path: '/terms',
    filename: 'terms.html',
    title: 'Terms & Conditions - Career Upgrade Online Dental Nursing School',
    description: 'Terms and Conditions for Career Upgrade Online Dental Nursing School.',
    keywords: 'terms and conditions dental nursing school',
    url: 'https://careerupgradedentalnursingschool.co.uk/terms'
  }
];

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

  fs.writeFileSync(path.join(distDir, route.filename), html, 'utf-8');
  console.log(`Generated SEO page: ${route.filename}`);
});

console.log("Backend SEO generation completed successfully.");
