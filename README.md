# HerRights - Women's Rights Platform

A comprehensive platform empowering women with legal knowledge, AI-powered guidance, and community support.

## 🚀 Features

- **AI-Powered Legal Guidance**: Get instant answers to legal questions
- **Comprehensive Resources**: Access to legal information and rights
- **Community Support**: Connect with others and share experiences
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Database (development)
- **CORS Headers** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd herrights
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd herrights-backend
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Start the development servers**

   **Terminal 1 - Frontend:**
   ```bash
   cd ..  # Go back to root directory
   npm run dev
   ```

   **Terminal 2 - Backend:**
   ```bash
   cd herrights-backend
   python manage.py runserver
   ```

6. **Open your browser**
   - Frontend: http://localhost:5174/
   - Backend: http://localhost:8000/
   - Admin Panel: http://localhost:8000/admin/

## 📦 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables** (in Vercel dashboard)
   - Add your Django backend URL as `VITE_API_URL`

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=dist`

### Manual Deployment

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Serve the built files**
   ```bash
   # Using Python
   cd dist && python -m http.server 3000

   # Using Node.js
   npx serve dist -s
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=HerRights
```

### Django Settings

The backend is configured with:
- CORS enabled for frontend origins
- Django REST Framework
- SQLite database (for development)

## 📁 Project Structure

```
herrights/
├── public/                 # Static assets
├── src/                    # React source code
│   ├── Components/         # React components
│   ├── Assets/            # Images and media
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── herrights-backend/      # Django backend
│   ├── core/              # Main app
│   ├── herrights/         # Project settings
│   └── manage.py          # Django management script
├── dist/                  # Build output
└── node_modules/          # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 API Documentation

### Endpoints

- `POST /api/ask-ai/` - Submit questions to AI
- `GET /admin/` - Django admin panel

### Request Format

```json
{
  "question": "Your legal question here"
}
```

### Response Format

```json
{
  "answer": "AI-generated response"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Django CORS settings are correct
   - Check if frontend URL is in `CORS_ALLOWED_ORIGINS`

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear cache: `npm cache clean --force`

3. **Database Issues**
   - Run migrations: `python manage.py migrate`
   - Create superuser: `python manage.py createsuperuser`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Django
- Icons by Lucide React
- Styling with Tailwind CSS
- AI integration for legal guidance

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Made with ❤️ for women's empowerment**
