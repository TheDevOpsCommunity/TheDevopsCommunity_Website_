# Creating Social Media Preview Image

## Method 1: Using the HTML file (Recommended)

1. Open `scripts/generate-social-image.html` in your browser
2. Take a screenshot or use a tool like:
   - **Online**: Use htmlcsstoimage.com or similar services
   - **Browser Dev Tools**: Set viewport to 1200x630 and screenshot
   - **Command Line**: Use puppeteer or playwright to convert HTML to PNG

## Method 2: Quick Setup (Temporary)

For now, I'll create a simple PNG using a canvas-based approach or you can use any image editor to create a 1200x630 image with:

- Background: Blue gradient (#1e40af to #60a5fa)
- Logo: "DC" text in a white circle
- Title: "DevOps Community" 
- Subtitle: "Master Your DevOps Career"
- Website: "thedevopscommunity.com"

## Image Specifications

- **Size**: 1200x630 pixels (Facebook/Twitter recommended)
- **Format**: PNG or JPG
- **File size**: Under 1MB
- **Save as**: `public/social-preview.png`

## After creating the image:

1. Save it as `public/social-preview.png`
2. The meta tags will automatically use this new image
3. Test on social media platforms