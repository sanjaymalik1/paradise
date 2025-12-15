# 🖼️ Images Guide for OYO Clone

## 📁 Image Directory Structure

```
public/
└── images/
    └── promo/
        ├── qr-code.png          (QR code for app download)
        ├── woman-luggage.jpg    (Main hero image - woman with luggage)
        ├── app-store.png        (App Store download badge)
        ├── google-play.png      (Google Play download badge)
        └── plant-decoration.png (Optional decorative plant)
```

## 🎯 Required Images

### 1. **QR Code** (`qr-code.png`)
- **Size**: 200x200px (minimum)
- **Format**: PNG with transparent background
- **Content**: QR code linking to OYO mobile app
- **Source**: Generate from OYO app store links

### 2. **Hero Image** (`woman-luggage.jpg`)
- **Size**: 800x600px (minimum)
- **Format**: JPG or PNG
- **Content**: Happy woman with luggage, travel theme
- **Style**: Professional, bright, welcoming
- **Source**: Stock photography (Unsplash, Pexels, etc.)

### 3. **App Store Badge** (`app-store.png`)
- **Size**: 240x80px
- **Format**: PNG with transparent background
- **Source**: Official Apple App Store badge

### 4. **Google Play Badge** (`google-play.png`)
- **Size**: 240x80px
- **Format**: PNG with transparent background
- **Source**: Official Google Play Store badge

### 5. **Plant Decoration** (`plant-decoration.png`) - Optional
- **Size**: 128x160px
- **Format**: PNG with transparent background
- **Content**: Simple plant/leaf decoration
- **Style**: Minimalist, green accent

## 🔧 How to Add Images

1. **Download/Create Images**: Get images matching the specifications above
2. **Save Location**: Place them in `public/images/promo/` folder
3. **Naming**: Use exact filenames as listed above
4. **Optimization**: Compress images for web (use tools like TinyPNG)

## 📋 Image Sources

### Free Stock Photos:
- **Unsplash**: https://unsplash.com/s/photos/woman-travel-luggage
- **Pexels**: https://pexels.com/search/travel%20woman/
- **Pixabay**: https://pixabay.com/photos/search/woman%20luggage/

### App Store Badges:
- **Apple**: https://developer.apple.com/app-store/marketing/guidelines/
- **Google**: https://play.google.com/intl/en_us/badges/

### QR Code Generators:
- **QR Code Generator**: https://qr-code-generator.com/
- **Google QR Generator**: https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=YOUR_APP_URL

## 🎨 Fallback Behavior

The component includes fallback displays if images aren't found:
- QR Code → Gray placeholder with "QR Code" text
- Hero Image → Orange gradient with emoji placeholder
- App badges → Hidden if not found
- Plant decoration → Hidden if not found

This means your site will work even without images, but will look much better with them!