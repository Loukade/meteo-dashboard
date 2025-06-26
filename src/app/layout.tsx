import './globals.css'

export const metadata = {
  title: 'Dashboard Météo',
  description: 'Météo géolocalisée avec design pro',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}

