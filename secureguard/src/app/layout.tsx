import Navbar from "@/components/Navbar";
import "./globals.css";
import "../CSS/App.css"
import { AuthProvider } from "@/components/AuthProvider";

export default function Layout({ children } : { children:React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="App">
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}