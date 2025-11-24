# FE Credit-Inspired Page

This is a standalone landing page inspired by FE Credit's design for "Vay Mua Điện Thoại Điện Máy" (Electronics & Appliance Loans).

## Overview

This page demonstrates a modern, responsive loan application landing page with:
- Clean, semantic HTML5 structure
- Professional design matching FE Credit's color scheme
- Full mobile responsiveness
- Interactive features without external dependencies

## Files

- **fecredit-inspired.html** - Main HTML page
- **assets/css/fecredit-style.css** - Styling (24KB)
- **assets/js/fecredit-interactive.js** - Interactive features (15KB)

## Features

### Design
- **Color Scheme**: Blue (#0052A5, #003D82) and Orange (#FF6B00, #E65100)
- **Responsive**: Mobile-first design, works on all screen sizes
- **Modern**: Gradient backgrounds, smooth transitions, card layouts

### Sections

1. **Header/Navigation**
   - Sticky header that appears on scroll
   - Mobile hamburger menu
   - Smooth scroll to sections

2. **Hero Banner**
   - Large heading with gradient background
   - Key features highlighted
   - Dual CTA buttons

3. **Benefits Section**
   - 6 benefit cards in responsive grid
   - Icons with gradient backgrounds
   - Hover effects

4. **Process Section**
   - 4-step visual process
   - Numbered steps with descriptions

5. **Loan Registration Form**
   - Input validation
   - Required field indicators
   - Error notifications

6. **FAQ Section**
   - Accordion expand/collapse
   - Single-item expansion
   - Smooth animations

7. **Partners Slider**
   - Auto-scrolling carousel
   - Pause on hover
   - Horizontal scroll

8. **Contact CTA**
   - Prominent call-to-action
   - Phone and email links

9. **Footer**
   - 4-column layout
   - Social media links
   - Contact information

### Interactive Features

All features are implemented in pure JavaScript without external libraries:

- ✅ **Sticky Header** - Fixed navigation on scroll
- ✅ **Mobile Menu** - Toggle navigation on mobile
- ✅ **FAQ Accordion** - Expand/collapse questions
- ✅ **Form Validation** - Client-side validation with notifications
- ✅ **Smooth Scroll** - Animated scrolling to anchors
- ✅ **Auto-Scroll Slider** - Partners carousel
- ✅ **Back to Top Button** - Appears after scrolling
- ✅ **Scroll Animations** - Fade-in effects on scroll

## Usage

### Local Development

1. Open the HTML file directly in a browser:
   ```bash
   open fecredit-inspired.html
   ```

2. Or serve via HTTP server:
   ```bash
   python3 -m http.server 8080
   # Then visit: http://localhost:8080/fecredit-inspired.html
   ```

### Integration

To integrate this page into your existing site:

1. Copy the three files to your project
2. Update navigation links in the header
3. Update the logo image path
4. Customize form submission to your backend
5. Update partner images and links

## Customization

### Colors

Edit CSS variables in `assets/css/fecredit-style.css`:

```css
:root {
    --primary-blue: #0052A5;
    --primary-orange: #FF6B00;
    /* ... other variables */
}
```

### Content

All content is in the HTML file with semantic class names:
- `.hero-title` - Main heading
- `.benefit-card` - Benefit items
- `.faq-item` - FAQ questions
- etc.

### Form Submission

Update the form handler in `assets/js/fecredit-interactive.js`:

```javascript
// Find this section in the file:
if (isValid) {
    // Add your API call here
    // Example: await fetch('/api/loan-application', { method: 'POST', body: formData })
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome)

## Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: < 480px

## Performance

- No external dependencies
- Minimal CSS and JS (< 40KB total)
- Optimized for fast loading
- CSS animations using GPU acceleration

## Accessibility

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Contrast-compliant colors

## License

This page design is inspired by FE Credit but implemented independently for Shinhan Finance Vietnam.

## Support

For questions or issues, contact the development team.
