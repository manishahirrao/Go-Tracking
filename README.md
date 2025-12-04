# GO Courier - Professional Courier & Delivery Services

A modern, responsive courier and delivery service website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Real-time Package Tracking**: Track your shipments with our advanced tracking system
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Fast Performance**: Built with Vite for lightning-fast load times
- **SEO Optimized**: Structured for search engine visibility
- **Accessible**: WCAG compliant for all users

## 📦 Services

- **Domestic Shipping**: Fast delivery within the country (1-3 business days)
- **International Shipping**: Worldwide delivery to 200+ countries (5-10 business days)
- **Express Delivery**: Same-day and overnight options available
- **Freight Services**: Heavy and oversized cargo shipping

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Animations**: CSS animations with WOW.js patterns

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd courier

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
courier/
├── public/              # Static assets
│   ├── icons/          # Icon images
│   ├── logo-*.png      # Logo variations
│   └── *.jpg           # Banner and background images
├── src/
│   ├── components/     # React components
│   │   ├── common/     # Shared components
│   │   ├── home/       # Home page components
│   │   ├── about/      # About page components
│   │   ├── contact/    # Contact page components
│   │   └── tracking/   # Tracking components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   └── App.jsx         # Main app component
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Colors

Edit `src/styles/variables.css` to customize the color scheme:

```css
:root {
  --color-primary: #f5ab35;        /* Main brand color */
  --color-primary-dark: #df9826;   /* Hover states */
  /* ... other colors */
}
```

### Content

Update business information in:
- `src/utils/constants.js` - Services, testimonials, pricing
- `src/components/common/Header/TopBar.jsx` - Contact phone number
- `src/components/common/Footer/FooterMain.jsx` - Footer links and info
- `src/pages/Contact.jsx` - Contact details

## 📱 Responsive Breakpoints

- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: > 991px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact Information

- **Phone**: +1 (800) 555-0123
- **Email**: support@gocourier.com
- **Address**: 1250 Broadway Avenue, New York, NY 10001, USA
- **Hours**: 24/7 Customer Support

## 📄 License

This project is proprietary and confidential.

## 🤝 Support

For support, email support@gocourier.com or call +1 (800) 555-0123.

---

Built with ❤️ by GO Courier Team
